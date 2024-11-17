from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Set the port
PORT = 8000

class StaticServer(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, StaticServer)
    print(f'Server running on port {PORT}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
