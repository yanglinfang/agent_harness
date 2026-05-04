from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import json
import os

FIXTURE_PATH = Path(__file__).resolve().parent / "fixtures" / "runs.json"

SUMMARY_FIELDS = ("run_id", "title", "intent", "status", "mode", "updated_at")


def load_runs():
    with FIXTURE_PATH.open("r", encoding="utf-8") as fp:
        data = json.load(fp)
    return data.get("runs", [])


def run_summary(run):
    return {field: run.get(field) for field in SUMMARY_FIELDS}


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]

        if path == "/health":
            self._send_json(
                200,
                {
                    "ok": True,
                    "service": "agent-harness-runtime",
                    "policy": os.environ.get("AGENT_HARNESS_POLICY", "strict"),
                },
            )
            return

        if path == "/runs":
            try:
                runs = load_runs()
            except (OSError, json.JSONDecodeError) as exc:
                self._send_json(500, {"error": "fixture_load_failed", "detail": str(exc)})
                return
            self._send_json(200, {"runs": [run_summary(r) for r in runs]})
            return

        if path.startswith("/runs/"):
            run_id = path[len("/runs/"):]
            if not run_id or "/" in run_id:
                self._send_json(404, {"error": "run_not_found", "run_id": run_id})
                return
            try:
                runs = load_runs()
            except (OSError, json.JSONDecodeError) as exc:
                self._send_json(500, {"error": "fixture_load_failed", "detail": str(exc)})
                return
            for run in runs:
                if run.get("run_id") == run_id:
                    self._send_json(200, run)
                    return
            self._send_json(404, {"error": "run_not_found", "run_id": run_id})
            return

        self._send_json(404, {"error": "not_found", "path": path})


def main():
    port = int(os.environ.get("AGENT_HARNESS_RUNTIME_PORT", "8787"))
    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"agent-harness-runtime listening on http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
