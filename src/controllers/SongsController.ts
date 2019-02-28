import { RequestHandler, Request, Response } from 'express';
import Discord from 'discord.js';
import { interfaceManager } from '../services/interfaceManager';
import { getSongMetadata, insertSong, getSongs, getSong } from '../services/SqlService';
import crypto from 'crypto';
import SongModel from '../web/models/SongModel';
import * as Sorcery from 'streamifier';

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
  console.log({ songId });
  if (isNaN(songId)) {
    response.json({ error: `Invalid songId: ${request.params.songId}` });
    response.status(400);
    return;
  }
  interfaceManager.client.voiceConnections.forEach((voiceConnection: Discord.VoiceConnection) => {
    console.log({ voiceConnection });
    getSong(songId)
      .then((result: SongModel) => {
        voiceConnection.playStream()
      });
    // const content = `E:\\Projects\\dnd-music-bot\\server\\src\\music\\sample-0${request.params.songId}.mp3`;
    // const streamDispatcher = voiceConnection.playFile(content);
    // interfaceManager.streamService.addStream(streamDispatcher);
  });
  response.status(500)
  response.json({ error: `Unable to play requested songId: ${songId}` });
}

export {
  songsGet,
  songPlay,
  songsPost
};
