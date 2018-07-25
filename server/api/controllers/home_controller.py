import os
import urllib.parse

from http.server import SimpleHTTPRequestHandler

from server.lib.controller import Controller


class HomeController(Controller):

    def __init__(self, server):
        Controller.__init__(self, server)

    def index(self):
        parsed_params = urllib.parse.urlparse(self.server.path)

        if parsed_params.path == '/':

            self.server.send_response(200)
            self.server.send_header('Content-Type', 'text/html')
            self.server.end_headers()
            with open('index.html', 'rb') as fin:
                self.server.copyfile(fin, self.server.wfile)

        else:
            os_path = os.getcwd() + parsed_params.path
            if os.path.isfile(os_path):
                SimpleHTTPRequestHandler.do_GET(self.server)
            else:
                self.server.send_response(404)
