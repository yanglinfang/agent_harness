from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/health":
            self.send_response(404)
            self.end_headers()
            return

        payload = {
            "ok": True,
            "service": "agent-harness-runtime",
            "policy": os.environ.get("AGENT_HARNESS_POLICY", "strict"),
        }
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(os.environ.get("AGENT_HARNESS_RUNTIME_PORT", "8787"))
    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"agent-harness-runtime listening on http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
