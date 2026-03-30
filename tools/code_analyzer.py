from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import PurePosixPath

from repo_reader import FileEntry

LOCAL_IMPORT_RE = re.compile(r"""from\s+['"](\.{1,2}[^'"]+)['"]""")
EXPORTED_TYPE_RE = re.compile(r"\bexport\s+(?:type|interface)\s+([A-Za-z_]\w*)")
USE_STATE_RE = re.compile(r"const\s*\[\s*([A-Za-z_]\w*)\s*,\s*([A-Za-z_]\w*)\s*]\s*=\s*useState\b")
USE_EFFECT_RE = re.compile(
    r"useEffect\s*\(\s*(?:async\s+)?\(\s*\)\s*=>\s*\{(?P<body>.*?)\}\s*,\s*\[(?P<deps>.*?)\]",
    re.DOTALL,
)


@dataclass(slots=True)
class PropInfo:
    name: str
    type: str


@dataclass(slots=True)
class ComponentInfo:
    file_path: str
    component_name: str
    props_name: str | None = None
    props: list[PropInfo] = field(default_factory=list)
    hooks: list[str] = field(default_factory=list)
    imports: list[str] = field(default_factory=list)
    exported_types: list[str] = field(default_factory=list)
    state_variables: list[str] = field(default_factory=list)
    effect_snippets: list[str] = field(default_factory=list)
    child_components: list[str] = field(default_factory=list)


@dataclass(slots=True)
class ModuleInfo:
    file_path: str
    exported_functions: list[str] = field(default_factory=list)
    exported_types: list[str] = field(default_factory=list)
    imports: list[str] = field(default_factory=list)


class CodeAnalyzer:
    """
    Статический анализ TypeScript/React кода без внешних парсеров.
    Используем regex для извлечения структурных элементов.
    """

    def analyze_tsx(self, content: str, file_path: str) -> ComponentInfo:
        component_name = self._extract_component_name(content, file_path)
        props_name, props = self._extract_props(content)
        hooks = self._extract_hooks(content)
        imports = self._extract_local_imports(content)
        exported_types = sorted(set(EXPORTED_TYPE_RE.findall(content)))
        state_variables = [match.group(1) for match in USE_STATE_RE.finditer(content)]
        effect_snippets = self._extract_effect_snippets(content)
        child_components = self._extract_child_components(content)

        return ComponentInfo(
            file_path=file_path,
            component_name=component_name,
            props_name=props_name,
            props=props,
            hooks=hooks,
            imports=imports,
            exported_types=exported_types,
            state_variables=state_variables,
            effect_snippets=effect_snippets,
            child_components=child_components,
        )

    def analyze_ts(self, content: str, file_path: str) -> ModuleInfo:
        function_names = set(
            re.findall(r"\bexport\s+function\s+([A-Za-z_]\w*)\s*\(", content)
        )
        function_names.update(
            re.findall(
                r"\bexport\s+const\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_]\w*)\s*=>",
                content,
            )
        )

        return ModuleInfo(
            file_path=file_path,
            exported_functions=sorted(function_names),
            exported_types=sorted(set(EXPORTED_TYPE_RE.findall(content))),
            imports=self._extract_local_imports(content),
        )

    def build_dependency_graph(self, files: list[FileEntry]) -> dict[str, list[str]]:
        file_index = {entry.relative_path: entry for entry in files}
        graph: dict[str, list[str]] = {}

        for entry in files:
            if entry.extension not in {".ts", ".tsx"}:
                continue
            imports = self._extract_local_imports(entry.content)
            resolved = []
            for import_path in imports:
                target = self._resolve_local_import(entry.relative_path, import_path, file_index)
                if target:
                    resolved.append(target)
            graph[entry.relative_path] = sorted(set(resolved))

        return graph

    def _extract_component_name(self, content: str, file_path: str) -> str:
        patterns = [
            r"\bexport\s+default\s+function\s+([A-Za-z_]\w*)\s*\(",
            r"\bexport\s+const\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_]\w*)\s*=>",
            r"\bconst\s+([A-Za-z_]\w*)\s*:\s*FC(?:<[^>]+>)?\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_]\w*)\s*=>",
            r"\bconst\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_]\w*)\s*=>",
            r"\bfunction\s+([A-Za-z_]\w*)\s*\(",
            r"\bexport\s+default\s+([A-Za-z_]\w*)\s*;",
        ]
        for pattern in patterns:
            match = re.search(pattern, content)
            if match:
                return match.group(1)
        return PurePosixPath(file_path).stem

    def _extract_props(self, content: str) -> tuple[str | None, list[PropInfo]]:
        interface_match = re.search(
            r"\binterface\s+([A-Za-z_]\w*Props)\s*\{(?P<body>.*?)\}",
            content,
            re.DOTALL,
        )
        if interface_match:
            return interface_match.group(1), self._parse_props_block(interface_match.group("body"))

        type_match = re.search(
            r"\btype\s+([A-Za-z_]\w*Props)\s*=\s*\{(?P<body>.*?)\}",
            content,
            re.DOTALL,
        )
        if type_match:
            return type_match.group(1), self._parse_props_block(type_match.group("body"))

        return None, []

    def _parse_props_block(self, block: str) -> list[PropInfo]:
        props: list[PropInfo] = []
        for raw_line in block.splitlines():
            line = raw_line.strip().rstrip(",;")
            if not line or line.startswith("//"):
                continue
            line = re.sub(r"^readonly\s+", "", line)
            match = re.match(r"([A-Za-z_]\w*)(\??)\s*:\s*(.+)", line)
            if not match:
                continue
            name, optional, value_type = match.groups()
            normalized_type = value_type.strip()
            if optional:
                normalized_type = f"{normalized_type} | undefined"
            props.append(PropInfo(name=name, type=normalized_type))
        return props

    def _extract_hooks(self, content: str) -> list[str]:
        hooks = []
        for hook_name in ("useState", "useEffect", "useCallback"):
            if re.search(rf"\b{hook_name}\b", content):
                hooks.append(hook_name)
        return hooks

    def _extract_local_imports(self, content: str) -> list[str]:
        return sorted(set(LOCAL_IMPORT_RE.findall(content)))

    def _extract_effect_snippets(self, content: str) -> list[str]:
        snippets: list[str] = []
        for match in USE_EFFECT_RE.finditer(content):
            body = " ".join(match.group("body").split())
            deps = " ".join(match.group("deps").split())
            snippet = body[:160].strip()
            if deps:
                snippet = f"{snippet} [deps: {deps}]"
            snippets.append(snippet or "effect without readable body")
        return snippets

    def _extract_child_components(self, content: str) -> list[str]:
        tags = re.findall(r"<([A-Z][A-Za-z0-9_]*)\b", content)
        return sorted(set(tags))

    def _resolve_local_import(
        self,
        source_path: str,
        import_path: str,
        file_index: dict[str, FileEntry],
    ) -> str | None:
        source = PurePosixPath(source_path)
        base = (source.parent / import_path).as_posix()
        candidates = [
            base,
            f"{base}.ts",
            f"{base}.tsx",
            f"{base}.d.ts",
            f"{base}/index.ts",
            f"{base}/index.tsx",
            f"{base}/index.d.ts",
        ]

        for candidate in candidates:
            normalized = PurePosixPath(candidate).as_posix()
            if normalized in file_index:
                return normalized
        return None
