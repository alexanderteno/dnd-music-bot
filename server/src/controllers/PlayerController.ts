import { RequestHandler, Request, Response } from 'express';
import streamService from '../services/StreamService';

const playerStop: RequestHandler = (_: Request, response: Response): void => {
  console.log('playerStop');
  streamService.stopAll();
  response.json({});
};

const playerStatus: RequestHandler = (_: Request, response: Response): void => {
  console.log('playerStatus');
  response.json(streamService.getStreams())
}

export {
  playerStop,
  playerStatus
};
