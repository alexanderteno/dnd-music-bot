import os
import urllib.parse
import http.server


class RequestHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        parsed_params = urllib.parse.urlparse(self.path)
        if os.access('.' + os.sep + parsed_params.path, os.R_OK):
            http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            with open('index.html', 'rb') as fin:
                self.copyfile(fin, self.wfile)
