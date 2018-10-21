import { Express } from 'express';
import { songPlay, songsGet } from './controllers/SongsController';
import { playerStop, playerStatus } from './controllers/PlayerController';

const registerRoutes = (express: Express) => {

  express.route('/songs')
    .get(songsGet);

  express.route('/songs/:songId/play')
    .post(songPlay);

  express.route('/player/stop')
    .post(playerStop)

  express.route('/player/status')
    .get(playerStatus)

};

export {
  registerRoutes,
};
