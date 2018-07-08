import json
import http.server
import os
import socketserver
import urllib.parse

with open('config.json') as json_data_file:
    data = json.load(json_data_file)

PORT = data['web']['port']
INDEX_FILE = 'index.html'


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_params = urllib.parse.urlparse(self.path)
        if os.access('.' + os.sep + parsed_params.path, os.R_OK):
            http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            with open(INDEX_FILE, 'rb') as fin:
                self.copyfile(fin, self.wfile)


Handler = MyHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

print("Serving...")

httpd.serve_forever()
