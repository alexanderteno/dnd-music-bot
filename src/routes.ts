import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Express } from 'express';
import { songPlay, songsGet, songsPost } from './controllers/SongsController';
import { playerStop, playerStatus } from './controllers/PlayerController';
import { channelsGet, channelJoin } from './controllers/ChannelsController';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const registerRoutes = (express: Express) => {

  express.route('/songs')
    .get(songsGet)
    .post(upload.single('song'), songsPost);

  express.route('/songs/:songId/play')
    .post(songPlay);

  express.route('/player/stop')
    .post(playerStop);

  express.route('/player/status')
    .get(playerStatus);

  express.route('/channels')
    .get(channelsGet);

  express.route('/channels/:id/join')
    .post(channelJoin);

  express.route('/')
    .get((_, response) => {
      response.sendFile(path.join(__dirname, '..', 'index.html'));
    })

  express.route('/*')
    .get((request, response) => {
      const myPath = path.join(__dirname, '..', request.path)
      const exists = fs.existsSync(myPath)
      console.log({ myPath, exists });
      response.sendFile(myPath);
    })

};

export {
  registerRoutes,
};
