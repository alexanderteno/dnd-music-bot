import json
from functools import reduce
from server.simple_server import SimpleServer
from server.web_socket_server import WebSocketServer

with open('config.json') as json_data_file:
    data = json.load(json_data_file)

HTTP_PORT = data['web']['port']
WEB_SOCKET_PORT = 3005
INDEX_FILE = 'index.html'


def threads_alive(threads):
    return reduce((lambda acc, current_thread: acc and current_thread.is_alive()), threads)


simpleServer = SimpleServer(HTTP_PORT, INDEX_FILE)
webSocketServer = WebSocketServer(WEB_SOCKET_PORT)

thread_pool = [simpleServer, webSocketServer]

for thread in thread_pool:
    thread.start()

while threads_alive(thread_pool):
    pass

for thread in thread_pool:
    if not thread.stopped():
        thread.stop()

print('Exiting...')
