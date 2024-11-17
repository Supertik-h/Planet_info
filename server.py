from http.server import SimpleHTTPRequestHandler, HTTPServer

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    server_address = ('0.0.0.0', 5000)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print('Server running on port 5000...')
    httpd.serve_forever()
