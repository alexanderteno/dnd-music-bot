import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';

const playerStop: RequestHandler = (_: Request, response: Response): void => {
  interfaceManager.streamService.stopAll();
  response.json({ message: `stopped` });
};

const playerStatus: RequestHandler = (_: Request, response: Response): void => {
  response.json(interfaceManager.streamService.getStreams())
}

export {
  playerStop,
  playerStatus
};
