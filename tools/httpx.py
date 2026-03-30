from __future__ import annotations

import json
import socket
import urllib.error
import urllib.request
from dataclasses import dataclass
from urllib.parse import urljoin


class RequestError(Exception):
    def __init__(self, message: str, request: "Request | None" = None) -> None:
        super().__init__(message)
        self.request = request


class TimeoutException(RequestError):
    pass


class HTTPStatusError(RequestError):
    def __init__(
        self,
        message: str,
        request: "Request | None" = None,
        response: "Response | None" = None,
    ) -> None:
        super().__init__(message, request=request)
        self.response = response


@dataclass(slots=True)
class Request:
    method: str
    url: str


class Response:
    def __init__(self, status_code: int, body: bytes, request: Request) -> None:
        self.status_code = status_code
        self._body = body
        self.request = request

    @property
    def text(self) -> str:
        return self._body.decode("utf-8", errors="replace")

    def json(self) -> dict:
        return json.loads(self.text)

    def raise_for_status(self) -> None:
        if 200 <= self.status_code < 300:
            return
        raise HTTPStatusError(
            f"HTTP {self.status_code}: {self.text}",
            request=self.request,
            response=self,
        )


class Client:
    def __init__(
        self,
        base_url: str = "",
        headers: dict[str, str] | None = None,
        timeout: float = 30.0,
    ) -> None:
        self._base_url = base_url
        self._headers = headers or {}
        self._timeout = timeout

    def post(self, path: str, json: dict | None = None) -> Response:
        url = urljoin(self._base_url, path)
        payload = b""
        headers = dict(self._headers)
        if json is not None:
            payload = __import__("json").dumps(json).encode("utf-8")
            headers.setdefault("Content-Type", "application/json")

        request_meta = Request(method="POST", url=url)
        request = urllib.request.Request(
            url,
            data=payload,
            headers=headers,
            method="POST",
        )

        try:
            with urllib.request.urlopen(request, timeout=self._timeout) as response:
                return Response(
                    status_code=response.getcode(),
                    body=response.read(),
                    request=request_meta,
                )
        except urllib.error.HTTPError as exc:
            return Response(
                status_code=exc.code,
                body=exc.read(),
                request=request_meta,
            )
        except socket.timeout as exc:
            raise TimeoutException(str(exc), request=request_meta) from exc
        except urllib.error.URLError as exc:
            raise RequestError(str(exc.reason), request=request_meta) from exc

    def close(self) -> None:
        return None
