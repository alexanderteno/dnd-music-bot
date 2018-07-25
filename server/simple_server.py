import threading

from socketserver import TCPServer

from server.api.request_handler import RequestHandler


class SimpleServer(threading.Thread):

    def __init__(self, port, index_file):
        super(SimpleServer, self).__init__(name="Simple Server")
        self._stop_event = threading.Event()
        self.port = port
        self.index_file = index_file

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()

    def run(self):
        httpd = TCPServer(("", self.port), RequestHandler)
        print("Simple server initialized...")
        httpd.serve_forever()
