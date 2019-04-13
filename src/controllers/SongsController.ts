/// <reference path="../types/buffer-to-stream.d.ts"/>
import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';
import crypto from 'crypto';
import SongModel from '../web/models/SongModel';
import toStream from 'buffer-to-stream';
import SongsRepository from '../services/Repositories/SongsRepository';

export default class SongsController {

  static songsGet: RequestHandler = (_: Request, response: Response): void => {
    SongsRepository.getSongs()
      .then((songs: SongModel[]) => {
        response.json(songs);
      })
      .catch((error) => {
        response.status(500).json(error);
      })
  }

  static putSong: RequestHandler = (request: Request, response: Response): void => {
    SongsRepository.updateSong(request.body.song)
      .then((song) => {
        response.json(song);
      })
      .catch((err) => {
        response.status(500).json(err);
      });
  }

  static songsPost: RequestHandler = (request: Request, response: Response): void => {
    const hash = crypto.createHash('sha1').update(request.file.buffer).digest('base64');
    SongsRepository.getSongMetadata(hash)
      .then((results: SongModel[]) => {
        if (results.length) {
          response.status(400).json({ message: 'resource already exists' });
        } else {
          SongsRepository.insertSong(hash, request.file)
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

  static songPlay: RequestHandler = (request: Request, response: Response): void => {
    const songId = parseInt(request.params.songId);
    if (isNaN(songId)) {
      response.json({ error: `Invalid songId: ${request.params.songId}` });
      response.status(400);
      return;
    }
    const voiceConnection = interfaceManager.client.voiceConnections.first();

    if (voiceConnection) {
      SongsRepository.getSong(songId)
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

}
