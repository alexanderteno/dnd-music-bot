import { StreamDispatcher } from 'discord.js'

class StreamService {

  streamDispatchers: StreamDispatcher[] = [];

  removeStream = (streamDispatcher: StreamDispatcher) => {
    const streamIndex = this.streamDispatchers.indexOf(streamDispatcher);
    this.streamDispatchers.splice(streamIndex, 1);
  }

  addStream = (streamDispatcher: StreamDispatcher) => {
    streamDispatcher.on('end', () => {
      this.removeStream(streamDispatcher);
    })
    this.streamDispatchers.push(streamDispatcher);
  }

  stopAll = () => {
    this.streamDispatchers.forEach((streamDispatcher: StreamDispatcher) => {
      streamDispatcher.end('Forced');
    })
  }

  getStreams = () => {
    return this.streamDispatchers.map((streamDispatcher: StreamDispatcher) => ({ time: streamDispatcher.time }))
  }

}

const streamService = new StreamService();

export default streamService;
