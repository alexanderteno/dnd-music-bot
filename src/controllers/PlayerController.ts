import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';

export default class PlayerController {

  static postStop: RequestHandler = (_: Request, response: Response): void => {
    interfaceManager.streamService.stopStream();
    response.json({ message: `stopped` });
  };

  static getVolume: RequestHandler = (_: Request, response: Response): void => {
    const streamDispatcher = interfaceManager.streamService.streamDispatcher;
    const volume = streamDispatcher ? streamDispatcher.volume : undefined;
    response.json(volume);
  }

  static postVolume: RequestHandler = (request: Request, response: Response): void => {
    const streamDispatcher = interfaceManager.streamService.streamDispatcher;
    if (streamDispatcher) {
      streamDispatcher.setVolume(request.body.volume !== undefined ? request.body.volume : 1);
      response.json(streamDispatcher.volume);
    } else {
      response.json(undefined);
    }
  }

  static getStatus: RequestHandler = (_: Request, response: Response): void => {
    response.json(interfaceManager.streamService)
  }

}