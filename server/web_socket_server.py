import asyncio
import hashlib
import json
import random
import threading

import websockets

CSS_BUNDLE_PATH = 'web/dist/bundle.css'
JS_BUNDLE_PATH = 'web/dist/bundle.js'


class WebSocketServer(threading.Thread):

    @staticmethod
    def hash_file(file):
        hash_md5 = hashlib.md5()
        with open(file, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def __init__(self, port):
        super(WebSocketServer, self).__init__(name="WebSocket Server")
        self._stop_event = threading.Event()
        self.port = port
        self.event_loop = asyncio.get_event_loop()
        self.css_bundle_hash = self.hash_file(CSS_BUNDLE_PATH)
        self.js_bundle_hash = self.hash_file(JS_BUNDLE_PATH)

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()

    async def handle_changes(self, web_socket, _path):
        while True:
            changes = []

            next_css_hash = self.hash_file(CSS_BUNDLE_PATH)
            css_bundle_changed = next_css_hash != self.css_bundle_hash

            next_js_hash = self.hash_file(JS_BUNDLE_PATH)
            js_bundle_changed = next_js_hash != self.js_bundle_hash

            if css_bundle_changed:
                self.css_bundle_hash = next_css_hash
                print('Broadcasting CSS Update')
                changes.append('css_changed')

            if js_bundle_changed:
                self.js_bundle_hash = next_js_hash
                print('Broadcasting JS Update')
                changes.append('js_changed')

            if len(changes) != 0:
                await web_socket.send(json.dumps(changes))

            await asyncio.sleep(1)

    def run(self):
        print("WebSocket server initialized...")
        start_server = websockets.serve(self.handle_changes, 'localhost', self.port)
        self.event_loop.run_until_complete(start_server)
        self.event_loop.run_forever()
