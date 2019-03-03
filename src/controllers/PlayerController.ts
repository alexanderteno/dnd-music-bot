import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';

export default class PlayerController {

  static postStop: RequestHandler = (_: Request, response: Response): void => {
    interfaceManager.streamService.stopStream();
    response.json({ message: `stopped` });
  };

  static getVolume: RequestHandler = (_: Request, response: Response): void => {
    const streamDispatcher = interfaceManager.streamService.streamDispatcher;
    if (streamDispatcher) {
      response.json({ volume: streamDispatcher.volume });
    } else {
      response.json({ volume: undefined });
    }
  }

  static postVolume: RequestHandler = (request: Request, response: Response): void => {
    const streamDispatcher = interfaceManager.streamService.streamDispatcher;
    if (streamDispatcher) {
      streamDispatcher.setVolume(request.body.volume !== undefined ? request.body.volume : 1);
      response.json({ volume: streamDispatcher.volume });
    } else {
      response.json({ volume: undefined });
    }
  }

  static getStatus: RequestHandler = (_: Request, response: Response): void => {
    response.json(interfaceManager.streamService)
  }

}