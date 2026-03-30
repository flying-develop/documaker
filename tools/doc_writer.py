from __future__ import annotations

import json
from pathlib import Path


class DocWriter:
    """Запись сгенерированных markdown-файлов и служебной метаинформации."""

    def write_documents(self, out_dir: str, documents: dict[str, str]) -> None:
        output_dir = Path(out_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        for name, content in documents.items():
            target = output_dir / name
            normalized = content.rstrip() + "\n"
            target.write_text(normalized, encoding="utf-8")

    def write_readme(self, target_path: str, content: str) -> None:
        target = Path(target_path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content.rstrip() + "\n", encoding="utf-8")

    def write_meta(self, out_dir: str, payload: dict) -> None:
        output_dir = Path(out_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        target = output_dir / "_meta.json"
        target.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
