from __future__ import annotations

import logging
import sys
from pathlib import Path

from code_analyzer import ComponentInfo, ModuleInfo
from repo_reader import FileEntry, ProjectMeta

logger = logging.getLogger(__name__)


class DocGenerationError(RuntimeError):
    """Ошибка генерации документации."""


class DocGenerator:
    """
    Генерирует документацию через LLM.
    Использует существующий LLMAgent из llm_agent/ без изменений.
    """

    MAX_FILE_CHARS = 8000
    MAX_FILES_PER_BATCH = 10
    COMPONENTS_PER_BATCH = 5

    def __init__(
        self,
        provider: str | None = None,
        model: str | None = None,
        repo_url: str = "",
        project_tree: str = "",
        env_vars: list[str] | None = None,
    ) -> None:
        self._provider = provider
        self._model = model
        self._repo_url = repo_url
        self._project_tree = project_tree
        self._env_vars = env_vars or []
        self._build_client, self._current_provider = self._load_llm_factory()
        self._SimpleAgent = self._load_simple_agent()
        self._provider = provider or self._current_provider()
        self._client = self._build_client(self._provider, model=self._model)

    @property
    def provider(self) -> str:
        return self._provider

    def generate_readme(
        self,
        meta: ProjectMeta,
        components: list[ComponentInfo],
        modules: list[ModuleInfo],
    ) -> str:
        component_lines = "\n".join(
            f"- {component.component_name} -> {component.file_path}"
            for component in components[:40]
        ) or "- Компоненты не обнаружены"
        scripts = "\n".join(f"- {name}: {command}" for name, command in meta.scripts.items())
        stack = self._format_stack(meta)
        module_summary = "\n".join(
            f"- {module.file_path}: {', '.join(module.exported_functions[:5]) or 'нет экспортируемых функций'}"
            for module in modules[:20]
        ) or "- Модули не обнаружены"
        env_vars_text = ", ".join(self._env_vars) if self._env_vars else "Не обнаружены"

        prompt = f"""
Ты — технический писатель. Сгенерируй README.md для проекта.

Проект: {meta.name}
Версия: {meta.version}
Репозиторий: {self._repo_url}
Стек: {stack}
Скрипты:
{scripts or "- Скрипты не обнаружены"}

Компоненты ({len(components)}):
{component_lines}

Модули ({len(modules)}):
{module_summary}

Структура проекта:
{self._project_tree or "Структура недоступна"}

Переменные окружения:
{env_vars_text}

Требования к README:
1. Описание проекта (2-3 предложения)
2. Технологический стек (таблица или список)
3. Структура проекта (дерево + краткое описание папок)
4. Установка и запуск (npm install / npm run dev)
5. Компоненты (таблица: имя, файл, назначение)
6. Переменные окружения (из .env если есть)

Формат: чистый Markdown, без лишних преамбул.
""".strip()
        return self._ask_with_retry(prompt, fallback_hint="Верни только готовый README.md в Markdown.")

    def generate_architecture(
        self,
        components: list[ComponentInfo],
        dep_graph: dict[str, list[str]],
        meta: ProjectMeta,
    ) -> str:
        hooks = sorted({hook for component in components for hook in component.hooks})
        graph_lines = []
        for file_path, deps in list(dep_graph.items())[:120]:
            graph_lines.append(f"- {file_path} -> {deps or []}")
        component_lines = "\n".join(
            f"- {component.component_name} ({component.file_path}) | hooks: {', '.join(component.hooks) or 'none'} | children: {', '.join(component.child_components[:8]) or 'none'}"
            for component in components[: self.MAX_FILES_PER_BATCH]
        )
        state_tools = self._detect_state_management(meta)

        prompt = f"""
Ты — архитектор фронтенд-приложений. Опиши архитектуру проекта.

Проект: {meta.name}
Компоненты и их зависимости:
{chr(10).join(graph_lines) or "- Граф зависимостей пуст"}

Ключевые компоненты:
{component_lines or "- Компоненты не обнаружены"}

Хуки используемые в проекте:
{", ".join(hooks) if hooks else "Не обнаружены"}

Управление состоянием по зависимостям:
{state_tools}

Задача: сгенерируй docs/architecture.md:
1. Обзор архитектуры (2-3 абзаца)
2. Граф компонентов (в виде текстового дерева или ASCII)
3. Слои приложения (presentational / container / pages / hooks / services)
4. Управление состоянием (что используется: useState/Context/Zustand/Redux)
5. Паттерны (если прослеживаются)

Формат: чистый Markdown.
""".strip()
        return self._ask_with_retry(prompt, fallback_hint="Верни только architecture.md в Markdown.")

    def generate_components_doc(
        self,
        components: list[ComponentInfo],
        files: list[FileEntry],
    ) -> str:
        sections = ["# Components"]

        for component in components:
            sections.append(f"## {component.component_name}")
            sections.append(f"**Файл:** `{component.file_path}`")
            sections.append(
                f"**Назначение:** React-компонент, обнаруженный в `{component.file_path}`."
            )
            sections.append("")
            sections.append("**Пропсы:**")
            sections.append("")
            sections.append("| Prop | Type | Description |")
            sections.append("| --- | --- | --- |")
            if component.props:
                for prop in component.props:
                    sections.append(
                        f"| {prop.name} | `{prop.type}` | Поле интерфейса `{component.props_name or 'props'}`. |"
                    )
            else:
                sections.append("| - | - | Явные пропсы не обнаружены |")
            sections.append("")
            sections.append(
                f"**Состояние:** {', '.join(component.state_variables) if component.state_variables else 'Локальное состояние через useState не обнаружено.'}"
            )
            sections.append("")
            sections.append(
                f"**Эффекты:** {'; '.join(component.effect_snippets) if component.effect_snippets else 'useEffect не обнаружен.'}"
            )
            sections.append("")
            sections.append(
                f"**Использует компоненты:** {', '.join(component.child_components) if component.child_components else 'Дочерние JSX-компоненты не обнаружены.'}"
            )
            sections.append("")
            sections.append(
                f"**Хуки:** {', '.join(component.hooks) if component.hooks else 'React hooks из базового набора не обнаружены.'}"
            )
            sections.append("")

        return "\n".join(sections).rstrip()

    def generate_api_integration(
        self,
        files: list[FileEntry],
        meta: ProjectMeta,
    ) -> str:
        api_files = [
            entry for entry in files
            if entry.extension in {".ts", ".tsx"}
            and (
                "axios" in entry.content
                or "fetch(" in entry.content
                or "service" in entry.relative_path.lower()
                or "/api/" in entry.relative_path.lower()
                or entry.relative_path.lower().endswith("api.ts")
            )
        ]

        if not api_files:
            return (
                "# API Integration\n\n"
                "В проанализированных файлах не обнаружены явные HTTP-запросы или сервисные API-модули."
            )

        blocks = []
        for entry in api_files[: self.MAX_FILES_PER_BATCH]:
            blocks.append(
                "\n".join(
                    [
                        f"--- {entry.relative_path} ---",
                        self._truncate_content(entry.content),
                    ]
                )
            )

        prompt = f"""
Ты документируешь API-интеграции фронтенд-приложения.

Проект: {meta.name}
Найденные файлы с HTTP-запросами:
{chr(10).join(blocks)}

Сгенерируй docs/api-integration.md:
1. Общий обзор сетевого слоя
2. Используемый HTTP-клиент и базовая конфигурация
3. Основные сервисы и эндпоинты
4. Аутентификация, токены, refresh flow
5. Форматы данных и обработка ошибок

Формат: чистый Markdown.
""".strip()
        return self._ask_with_retry(
            prompt,
            fallback_hint="Верни только api-integration.md в Markdown.",
        )

    def _ask_with_retry(self, prompt: str, fallback_hint: str) -> str:
        response = self._ask(prompt)
        if response.strip():
            return response

        retry_prompt = f"{prompt}\n\n{fallback_hint}"
        response = self._ask(retry_prompt)
        if response.strip():
            return response

        raise DocGenerationError("LLM вернул пустой ответ дважды подряд.")

    def _ask(self, prompt: str) -> str:
        try:
            agent = self._SimpleAgent(self._client)
            return agent.ask(prompt).strip()
        except Exception as exc:
            raise DocGenerationError(f"Ошибка генерации через LLM: {exc}") from exc

    def _truncate_content(self, content: str) -> str:
        if len(content) <= self.MAX_FILE_CHARS:
            return content
        truncated = content[: self.MAX_FILE_CHARS].rstrip()
        return f"{truncated}\n[TRUNCATED]"

    def _prepare_component_code(self, content: str) -> str:
        lines = content.splitlines()[:200]
        excerpt = "\n".join(lines)
        return self._truncate_content(excerpt)

    def _format_stack(self, meta: ProjectMeta) -> str:
        libraries = meta.dependencies + meta.dev_dependencies
        if not libraries:
            return "Не определён"
        return ", ".join(libraries[:30])

    def _detect_state_management(self, meta: ProjectMeta) -> str:
        libs = set(meta.dependencies + meta.dev_dependencies)
        detected = []
        if "react-redux" in libs or "@reduxjs/toolkit" in libs:
            detected.append("Redux Toolkit / react-redux")
        if "zustand" in libs:
            detected.append("Zustand")
        if "react" in libs:
            detected.append("React local state/hooks")
        return ", ".join(detected) or "Не удалось определить"

    def _load_llm_factory(self):
        self._ensure_llm_agent_path()
        from llm_agent.infrastructure.llm_factory import build_client, current_provider_from_env

        return build_client, current_provider_from_env

    def _load_simple_agent(self):
        self._ensure_llm_agent_path()
        from llm_agent.application.agent import SimpleAgent

        return SimpleAgent

    def _ensure_llm_agent_path(self) -> None:
        tools_path = Path(__file__).resolve()
        repo_root = tools_path.parent.parent
        candidates = [
            Path.cwd(),
            repo_root.parent / "ai-challenge",
            repo_root,
            Path.cwd() / "llm_agent",
            repo_root / "llm_agent",
        ]

        for candidate in candidates:
            candidate_path = candidate
            if candidate.is_dir() and candidate.name == "llm_agent":
                candidate_path = candidate.parent
            if candidate_path.is_dir() and (candidate_path / "llm_agent").is_dir():
                resolved_path = str(candidate_path)
                if resolved_path not in sys.path:
                    sys.path.insert(0, resolved_path)
                return

        raise DocGenerationError(
            "Не найден llm_agent/. Ожидался локальный пакет или соседний ../ai-challenge/llm_agent."
        )
