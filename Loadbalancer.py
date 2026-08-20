# Loadbalancer.py

from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import threading
import os

# Three BuySide app containers
BACKENDS = [
    ("buyside-1", 3000),
    ("buyside-2", 3000),
    ("buyside-3", 3000)
]

STRATEGY = os.getenv("STRATEGY", "RR").upper()

rr_index = 0

active_connections = {
    "buyside-1": 0,
    "buyside-2": 0,
    "buyside-3": 0
}

request_counts = {
    "buyside-1": 0,
    "buyside-2": 0,
    "buyside-3": 0
}

lock = threading.Lock()


def choose_backend():
    global rr_index

    with lock:

        if STRATEGY == "RR":
            backend = BACKENDS[rr_index]
            rr_index = (rr_index + 1) % len(BACKENDS)
            return backend

        elif STRATEGY == "LC":
            backend = min(
                BACKENDS,
                key=lambda x: active_connections[x[0]]
            )
            return backend
        else:
            raise ValueError("STRATEGY must be RR or LC")


class LoadBalancerHandler(BaseHTTPRequestHandler):

    def forward_request(self):

        backend_name, backend_port = choose_backend()

        with lock:
            active_connections[backend_name] += 1

        try:

            backend_url = (
                f"http://{backend_name}:{backend_port}"
                f"{self.path}"
            )

            body = None

            if self.command in ["POST", "PUT", "PATCH"]:
                content_length = int(
                    self.headers.get("Content-Length", 0)
                )
                body = self.rfile.read(content_length)

            request = Request(
                backend_url,
                data=body,
                method=self.command
            )

            if "Content-Type" in self.headers:
                request.add_header(
                    "Content-Type",
                    self.headers["Content-Type"]
                )

            response = urlopen(request, timeout=30)
            response_body = response.read()

            self.send_response(response.status)
            self.send_header("X-Backend-Server", backend_name)
            self.send_header(
                "Content-Type",
                response.headers.get("Content-Type", "application/json")
            )
            self.send_header("Content-Length", str(len(response_body)))
            self.end_headers()
            self.wfile.write(response_body)

            print(
                f"{self.command} {self.path} "
                f"-> {backend_name} "
                f"[{STRATEGY}]"
            )

        except HTTPError as error:
            error_body = error.read()
            self.send_response(error.code)
            self.send_header("X-Backend-Server", backend_name)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(error_body)

        except (URLError, Exception) as error:
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            message = (
                '{"error": "Backend unavailable", '
                f'"details": "{str(error)}"}}'
            )
            self.wfile.write(message.encode())

        finally:
            with lock:
                active_connections[backend_name] -= 1

    def do_GET(self):
        self.forward_request()

    def do_POST(self):
        self.forward_request()

    def do_PUT(self):
        self.forward_request()

    def do_DELETE(self):
        self.forward_request()


if __name__ == "__main__":

    PORT = 8000

    print("==============================================")
    print("          BUYSIDE APP LOAD BALANCER")
    print("==============================================")
    print(f"Strategy: {STRATEGY}")
    print(f"Listening on port: {PORT}")
    print("Backends:")

    for name, port in BACKENDS:
        print(f"  - {name}:{port}")

    print("==============================================")

    server = ThreadingHTTPServer(("0.0.0.0", PORT), LoadBalancerHandler)
    server.serve_forever()