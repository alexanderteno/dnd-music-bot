import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';

const playerStop: RequestHandler = (_: Request, response: Response): void => {
  console.log('playerStop');
  interfaceManager.streamService.stopAll();
  response.json({});
};

const playerStatus: RequestHandler = (_: Request, response: Response): void => {
  console.log('playerStatus');
  response.json(interfaceManager.streamService.getStreams())
}

export {
  playerStop,
  playerStatus
};
