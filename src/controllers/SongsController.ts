/// <reference path="../types/buffer-to-stream.d.ts"/>
import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';
import { getSongMetadata, insertSong, getSongs, getSong } from '../services/SqlService';
import crypto from 'crypto';
import SongModel from '../web/models/SongModel';
import toStream from 'buffer-to-stream';

const songsGet: RequestHandler = (_: Request, response: Response): void => {
  getSongs()
    .then((songs: SongModel[]) => {
      response.json(songs);
    })
    .catch((error) => {
      response.status(500).json(error);
    })
}

const songsPost: RequestHandler = (request: Request, response: Response): void => {
  const hash = crypto.createHash('sha1').update(request.file.buffer).digest('base64');
  getSongMetadata(hash)
    .then((results: SongModel[]) => {
      if (results.length) {
        response.status(400).json({ message: 'resource already exists' });
      } else {
        insertSong(hash, request.file)
          .then((results?: any) => {
            response.json(results);
          })
          .catch((error) => {
            response.status(500).json(error);
          })
      }
    })
    .catch((error) => {
      response.status(500).json(error)
    });
}

const songPlay: RequestHandler = (request: Request, response: Response): void => {
  const songId = parseInt(request.params.songId);
  if (isNaN(songId)) {
    response.json({ error: `Invalid songId: ${request.params.songId}` });
    response.status(400);
    return;
  }
  const voiceConnection = interfaceManager.client.voiceConnections.first();

  if (voiceConnection) {
    getSong(songId)
      .then((song: SongModel) => {
        const readable = toStream(song.songData);
        const streamDispatcher = voiceConnection.playStream(readable);
        interfaceManager.streamService.addStream(streamDispatcher);
        response.json({ message: `Playback of songId: ${songId} has begun` })
      })
      .catch((err) => {
        console.log({ err });
        response.status(500);
        response.json(err);
      });
  } else {
    response.status(500)
    response.json({ error: `Unable to play requested songId: ${songId}` });
  }

}

export {
  songsGet,
  songPlay,
  songsPost
};
