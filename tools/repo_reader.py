from __future__ import annotations

import json
import logging
import subprocess
from dataclasses import dataclass, field
from pathlib import Path

logger = logging.getLogger(__name__)

IGNORED_DIR_NAMES = {"node_modules", ".git", "dist", "build", "__pycache__"}
IGNORED_SUFFIXES = {".lock"}
IGNORED_FILENAMES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "bun.lockb",
}


class RepoReaderError(RuntimeError):
    """Ошибка чтения репозитория."""


@dataclass(slots=True)
class FileEntry:
    path: str
    relative_path: str
    extension: str
    size_bytes: int
    content: str


@dataclass(slots=True)
class ProjectMeta:
    name: str = "unknown"
    version: str = "0.0.0"
    dependencies: list[str] = field(default_factory=list)
    dev_dependencies: list[str] = field(default_factory=list)
    scripts: dict[str, str] = field(default_factory=dict)


class RepoReader:
    """
    Читает репозиторий: клонирует во временную директорию,
    обходит файлы по расширениям, возвращает список FileEntry.
    """

    def clone(self, repo_url: str, target_dir: str) -> str:
        """Клонировать репозиторий в target_dir и вернуть путь к нему."""
        target_path = Path(target_dir)
        if target_path.exists() and any(target_path.iterdir()):
            raise RepoReaderError(
                f"Целевая директория для clone не пуста: {target_path}"
            )

        command = ["git", "clone", "--depth", "1", repo_url, str(target_path)]
        try:
            subprocess.run(
                command,
                check=True,
                capture_output=True,
                text=True,
            )
        except FileNotFoundError as exc:
            raise RepoReaderError(
                "Не найден git. Установите git и повторите запуск."
            ) from exc
        except subprocess.CalledProcessError as exc:
            stderr = (exc.stderr or "").strip()
            message = stderr.splitlines()[-1] if stderr else "неизвестная ошибка git clone"
            raise RepoReaderError(
                f"Не удалось клонировать репозиторий {repo_url}: {message}"
            ) from exc

        return str(target_path)

    def collect_files(self, repo_dir: str, include_patterns: list[str]) -> list[FileEntry]:
        """
        Обойти файлы по glob-паттернам.
        Пропускает node_modules, .git, dist, build, lock-файлы и JSON кроме package.json.
        """
        repo_path = Path(repo_dir)
        unique_paths: set[Path] = set()

        for pattern in include_patterns:
            cleaned = pattern.strip()
            if not cleaned:
                continue
            unique_paths.update(
                path
                for path in repo_path.glob(cleaned)
                if path.is_file()
            )

        result: list[FileEntry] = []
        for path in sorted(unique_paths):
            if self._should_skip(path, repo_path):
                continue

            try:
                content = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                logger.warning("Пропускаю нечитаемый UTF-8 файл: %s", path)
                continue
            except OSError as exc:
                logger.warning("Не удалось прочитать файл %s: %s", path, exc)
                continue

            stat = path.stat()
            result.append(
                FileEntry(
                    path=str(path),
                    relative_path=path.relative_to(repo_path).as_posix(),
                    extension=path.suffix.lower(),
                    size_bytes=stat.st_size,
                    content=content,
                )
            )

        return result

    def get_project_meta(self, repo_dir: str) -> ProjectMeta:
        """Извлечь name, version, dependencies, devDependencies и scripts из package.json."""
        package_path = Path(repo_dir) / "package.json"
        if not package_path.exists():
            return ProjectMeta()

        try:
            data = json.loads(package_path.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise RepoReaderError(f"Не удалось прочитать package.json: {exc}") from exc

        dependencies = sorted((data.get("dependencies") or {}).keys())
        dev_dependencies = sorted((data.get("devDependencies") or {}).keys())
        scripts = dict(sorted((data.get("scripts") or {}).items()))

        return ProjectMeta(
            name=str(data.get("name") or "unknown"),
            version=str(data.get("version") or "0.0.0"),
            dependencies=dependencies,
            dev_dependencies=dev_dependencies,
            scripts=scripts,
        )

    def get_project_tree(self, repo_dir: str, max_depth: int = 2, max_entries: int = 120) -> str:
        """Построить дерево проекта до max_depth уровней для промпта README."""
        repo_path = Path(repo_dir)
        lines: list[str] = [repo_path.name + "/"]
        entries_added = 0

        def walk(directory: Path, depth: int) -> None:
            nonlocal entries_added
            if depth > max_depth or entries_added >= max_entries:
                return

            children = sorted(
                child for child in directory.iterdir() if not self._should_skip(child, repo_path)
            )
            for child in children:
                if entries_added >= max_entries:
                    return
                indent = "  " * depth
                suffix = "/" if child.is_dir() else ""
                lines.append(f"{indent}- {child.name}{suffix}")
                entries_added += 1
                if child.is_dir():
                    walk(child, depth + 1)

        walk(repo_path, depth=1)
        if entries_added >= max_entries:
            lines.append("  - ...")
        return "\n".join(lines)

    def get_env_vars(self, repo_dir: str) -> list[str]:
        """Извлечь имена переменных из .env-файлов репозитория."""
        repo_path = Path(repo_dir)
        env_files = sorted(repo_path.glob(".env*"))
        variables: set[str] = set()

        for env_file in env_files:
            if env_file.is_dir():
                continue
            try:
                for raw_line in env_file.read_text(encoding="utf-8").splitlines():
                    line = raw_line.strip()
                    if not line or line.startswith("#") or "=" not in line:
                        continue
                    key = line.split("=", 1)[0].strip()
                    if key:
                        variables.add(key)
            except (OSError, UnicodeDecodeError) as exc:
                logger.warning("Не удалось прочитать env-файл %s: %s", env_file, exc)

        return sorted(variables)

    def _should_skip(self, path: Path, repo_path: Path) -> bool:
        relative_parts = path.relative_to(repo_path).parts
        if any(part in IGNORED_DIR_NAMES for part in relative_parts):
            return True

        if path.name in IGNORED_FILENAMES:
            return True

        if path.suffix.lower() in IGNORED_SUFFIXES:
            return True

        if path.suffix.lower() == ".json" and path.name != "package.json":
            return True

        return False
