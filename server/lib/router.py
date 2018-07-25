import re


def convert(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class Router(object):

    def __init__(self, server):
        self.__routes = []
        self.__server = server

    def addRoute(self, regexp, controller, action):
        self.__routes.append({'regexp': regexp, 'controller': controller, 'action': action})

    def route(self, path):
        for route in self.__routes:
            if re.search(route['regexp'], path):
                controller_name = route['controller']
                module = __import__('server.api.controllers.' + convert(controller_name), fromlist=[controller_name])
                klass = getattr(module, controller_name)
                func = klass.__dict__[route['action']]
                obj = klass(self.__server)
                func(obj, )
                return

                # Not found
        self.__server.send_response(404)
        self.__server.end_headers()
