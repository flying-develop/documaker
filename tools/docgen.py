from __future__ import annotations

import argparse
import logging
import os
import sys
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from time import perf_counter

from code_analyzer import CodeAnalyzer, ComponentInfo, ModuleInfo
from doc_generator import DocGenerationError, DocGenerator
from doc_writer import DocWriter
from repo_reader import FileEntry, RepoReader, RepoReaderError

DEFAULT_INCLUDE_PATTERNS = [
    "src/**/*.tsx",
    "src/**/*.ts",
    "vite.config.ts",
    "package.json",
    "README.md",
    ".env",
    ".env.*",
]
SUPPORTED_PROVIDERS = ("qwen", "openai", "claude", "ollama")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="docgen",
        description="Генерация Markdown-документации проекта через LLM.",
    )
    parser.add_argument(
        "--repo",
        required=True,
        help="URL или локальный путь git-репозитория для анализа.",
    )
    parser.add_argument(
        "--out",
        required=True,
        help="Каталог, куда будут записаны README.md, architecture.md и прочие файлы.",
    )
    parser.add_argument(
        "--provider",
        choices=SUPPORTED_PROVIDERS,
        help="LLM-провайдер. Если не указан, определяется из окружения.",
    )
    parser.add_argument(
        "--model",
        help="Явное имя модели для выбранного провайдера.",
    )
    parser.add_argument(
        "--include",
        help="CSV-список glob-паттернов, например 'src/**/*.tsx,src/**/*.ts,package.json'.",
    )
    parser.add_argument(
        "--log-level",
        default="INFO",
        choices=("DEBUG", "INFO", "WARNING", "ERROR"),
        help="Уровень логирования.",
    )
    return parser


def configure_logging(log_level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, log_level.upper(), logging.INFO),
        format="[docgen] %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )


def sanitize_llm_env() -> None:
    keys = [
        "QWEN_API_KEY",
        "QWEN_BASE_URL",
        "QWEN_MODEL",
        "OPENAI_API_KEY",
        "OPENAI_BASE_URL",
        "OPENAI_MODEL",
        "ANTHROPIC_API_KEY",
        "ANTHROPIC_MODEL",
        "CLAUDE_SESSION_INGRESS_TOKEN_FILE",
        "LLM_PROVIDER",
    ]
    for key in keys:
        value = os.environ.get(key)
        if value is not None:
            os.environ[key] = value.strip()


def parse_include_patterns(raw_patterns: str | None) -> list[str]:
    if not raw_patterns:
        return list(DEFAULT_INCLUDE_PATTERNS)
    patterns = [item.strip() for item in raw_patterns.split(",") if item.strip()]
    return patterns or list(DEFAULT_INCLUDE_PATTERNS)


def analyze_files(
    analyzer: CodeAnalyzer,
    files: list[FileEntry],
) -> tuple[list[ComponentInfo], list[ModuleInfo], dict[str, list[str]]]:
    components: list[ComponentInfo] = []
    modules: list[ModuleInfo] = []

    for entry in files:
        if entry.relative_path.endswith(".d.ts"):
            continue
        if entry.extension == ".tsx":
            components.append(analyzer.analyze_tsx(entry.content, entry.relative_path))
        elif entry.extension == ".ts":
            modules.append(analyzer.analyze_ts(entry.content, entry.relative_path))

    dep_graph = analyzer.build_dependency_graph(files)
    return components, modules, dep_graph


def log_file_stats(files: list[FileEntry]) -> None:
    counts = Counter(entry.extension or "noext" for entry in files)
    tsx_count = counts.get(".tsx", 0)
    ts_count = counts.get(".ts", 0)
    other_count = len(files) - tsx_count - ts_count
    logging.info(
        "Найдено файлов: %s (tsx: %s, ts: %s, прочие: %s)",
        len(files),
        tsx_count,
        ts_count,
        other_count,
    )


def timed_generation(label: str, generator) -> str:
    logging.info("Генерация %s...", label)
    started = perf_counter()
    document = generator()
    elapsed = perf_counter() - started
    logging.info("Генерация %s...  ✓ (%.1fs)", label, elapsed)
    return document


def resolve_readme_target(out_dir: str) -> Path:
    output_dir = Path(out_dir)
    if output_dir.name == "docs":
        return output_dir.parent / "README.md"
    return output_dir / "README.md"


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    configure_logging(args.log_level)
    sanitize_llm_env()

    reader = RepoReader()
    analyzer = CodeAnalyzer()
    writer = DocWriter()
    include_patterns = parse_include_patterns(args.include)

    try:
        with tempfile.TemporaryDirectory(prefix="docgen-") as temp_dir:
            clone_dir = Path(temp_dir) / "repo"
            logging.info("Клонирование %s...", args.repo)
            repo_dir = reader.clone(args.repo, str(clone_dir))

            files = reader.collect_files(repo_dir, include_patterns)
            meta = reader.get_project_meta(repo_dir)
            project_tree = reader.get_project_tree(repo_dir)
            env_vars = reader.get_env_vars(repo_dir)

            log_file_stats(files)

            components, modules, dep_graph = analyze_files(analyzer, files)
            logging.info("Компонентов обнаружено: %s", len(components))

            doc_generator = DocGenerator(
                provider=args.provider,
                model=args.model,
                repo_url=args.repo,
                project_tree=project_tree,
                env_vars=env_vars,
            )

            readme = timed_generation(
                "README.md",
                lambda: doc_generator.generate_readme(meta, components, modules),
            )
            architecture = timed_generation(
                "architecture.md",
                lambda: doc_generator.generate_architecture(components, dep_graph, meta),
            )
            components_doc = timed_generation(
                "components.md",
                lambda: doc_generator.generate_components_doc(components, files),
            )
            api_doc = timed_generation(
                "api-integration.md",
                lambda: doc_generator.generate_api_integration(files, meta),
            )

            readme_target = resolve_readme_target(args.out)
            writer.write_readme(str(readme_target), readme)

            documents = {
                "architecture.md": architecture,
                "components.md": components_doc,
                "api-integration.md": api_doc,
            }
            writer.write_documents(args.out, documents)

            meta_payload = {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "repo": args.repo,
                "provider": doc_generator.provider,
                "files_analyzed": len(files),
                "components_found": len(components),
                "docs_generated": ["README.md", *list(documents.keys())],
            }
            writer.write_meta(args.out, meta_payload)

        logging.info(
            "Документация сохранена: %s (%s файла)",
            args.out,
            len(documents) + 1,
        )
        return 0
    except (RepoReaderError, DocGenerationError, ValueError) as exc:
        logging.error("%s", exc)
        return 1
    except KeyboardInterrupt:
        logging.error("Операция прервана пользователем.")
        return 130
    except Exception as exc:
        logging.error("Непредвиденная ошибка: %s", exc)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
