import http.server

from http.server import SimpleHTTPRequestHandler
from server.lib.router import Router

API_PATH = '/api'


class RequestHandler(SimpleHTTPRequestHandler):

    def __init__(self, request, client_address, server):
        routes = [
            {'regexp': r'/^songs/', 'controller': 'SongController', 'action': 'songs'},
            {'regexp': r'^/', 'controller': 'HomeController', 'action': 'index'}
        ]

        self.__router = Router(self)

        for route in routes:
            self.__router.addRoute(route['regexp'], route['controller'], route['action'])

        http.server.SimpleHTTPRequestHandler.__init__(self, request, client_address, server)

    def do_GET(self):
        self.__router.route(self.path)
