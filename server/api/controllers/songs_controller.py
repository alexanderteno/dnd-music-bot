from server.lib.controller import Controller


class SongsController(Controller):

    def __init__(self, server):
        Controller.__init__(self, server)

    def songs(self):
        self.server.send_response(200)
        self.server.send_header('Content-type', 'application/json')
        self.server.end_headers()
        self.wfile.write(json.dumps({'text': 'testText'}))
