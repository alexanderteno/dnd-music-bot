import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Express } from 'express';
import SongsController from './controllers/SongsController';
import PlayerController from './controllers/PlayerController';
import { channelsGet, channelJoin, channelsGetActive } from './controllers/ChannelsController';
import TagsController from './controllers/TagsController';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const whitelist = ['node_modules', 'dist'];
const indexFilePath = path.join(__dirname, '..', 'index.html');

const registerRoutes = (express: Express) => {

  /* Songs Actions */
  express.route('/api/songs')
    .get(SongsController.songsGet)
    .post(upload.single('song'), SongsController.songsPost);
  express.route('/api/songs/:songId')
    .put(SongsController.putSong);
  express.route('/api/songs/:songId/play')
    .post(SongsController.songPlay);

  express.route('/api/songs/:songId/tags')
    .get(TagsController.getTags);

  /* Player Actions */
  express.route('/api/player/stop')
    .post(PlayerController.postStop);
  express.route('/api/player/volume')
    .get(PlayerController.getVolume)
    .post(PlayerController.postVolume);
  express.route('/api/player/status')
    .get(PlayerController.getStatus);

  /* Channels Actions */
  express.route('/api/channels')
    .get(channelsGet);
  express.route('/api/channels/active')
    .get(channelsGetActive);
  express.route('/api/channels/:id/join')
    .post(channelJoin);


  /* Serving Actions */
  express.route('/favicon.ico')
    .get((_, response) => {
      response.sendFile(path.join(__dirname, '..', 'favicon.ico'));
    });
  express.route('/')
    .get((_, response) => {
      response.sendFile(indexFilePath);
    })
  express.route('/*')
    .get((request, response) => {
      const rootDir = request.path.replace(/^\/?([A-Za-z_]+).*$/g, '$1')
      if (whitelist.includes(rootDir)) {
        const myPath = path.join(__dirname, '..', request.path)
        const fileExists = fs.existsSync(myPath)
        if (fileExists) {
          response.sendFile(myPath);
          return;
        }
      }
      const isFileRequest = request.path.lastIndexOf('.') !== -1;
      if (isFileRequest) {
        response.status(404);
        return;
      }
      response.sendFile(indexFilePath);
    });

};

export {
  registerRoutes,
};
