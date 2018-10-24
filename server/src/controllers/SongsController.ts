import { RequestHandler, Request, Response } from 'express';
import Discord from 'discord.js';
import { interfaceManager } from '../services/interfaceManager';
import crypto from 'crypto';
import { getSongMetadata, insertSong, getSongs } from '../services/SqlService';
import { Songs } from '../types/Songs';

const songsGet: RequestHandler = (_: Request, response: Response): void => {
  getSongs()
    .then((songs: Songs.SongMetadata[]) => {
      response.json(songs);
    })
    .catch((error) => {
      response.status(500).json(error);
    })
}

const songsPost: RequestHandler = (request: Request, response: Response): void => {
  const hash = crypto.createHash('sha1').update(request.file.buffer).digest('base64');
  getSongMetadata(hash)
    .then((results: Songs.SongMetadata[]) => {
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
  console.log(`playSong ${request.params.songId}`);
  response.json({ songId: request.params.songId });
  interfaceManager.client.voiceConnections.forEach((voiceConnection: Discord.VoiceConnection) => {
    console.log('Found a VoiceConnection');
    const content = `E:\\Projects\\dnd-music-bot\\server\\src\\music\\sample-0${request.params.songId}.mp3`;
    const streamDispatcher = voiceConnection.playFile(content);
    interfaceManager.streamService.addStream(streamDispatcher);
  });
}

export {
  songsGet,
  songPlay,
  songsPost
};
