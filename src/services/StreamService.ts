import { StreamDispatcher } from 'discord.js'

class StreamService {

  streamDispatcher: StreamDispatcher | undefined;

  addStream = (streamDispatcher: StreamDispatcher) => {
    if (this.streamDispatcher) {
      this.streamDispatcher.end();
    }
    this.streamDispatcher = streamDispatcher;
  }

  stopStream = () => {
    if (this.streamDispatcher) {
      this.streamDispatcher.end();
    }
  }

}

const streamService = new StreamService();

export default streamService;
