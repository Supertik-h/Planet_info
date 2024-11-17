from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class StaticServer(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

if __name__ == "__main__":
    server_address = ('0.0.0.0', 5000)
    httpd = HTTPServer(server_address, StaticServer)
    print(f"Server running on port {server_address[1]}...")
    httpd.serve_forever()
