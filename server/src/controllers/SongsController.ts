import { RequestHandler, Request, Response } from 'express';
import client from '../services/discordClient';
import Discord from 'discord.js';
import streamService from '../services/StreamService';

const songsGet: RequestHandler = (_: Request, response: Response): void => {
  response.json([]);
}

const songPlay: RequestHandler = (request: Request, response: Response): void => {
  console.log(`playSong ${request.params.songId}`);
  response.json({ songId: request.params.songId });
  client.voiceConnections.forEach((voiceConnection: Discord.VoiceConnection) => {
    console.log('Found a VoiceConnection');
    const content = `E:\\Projects\\dnd-music-bot\\server\\src\\music\\sample-0${request.params.songId}.mp3`;
    const streamDispatcher = voiceConnection.playFile(content);
    streamService.addStream(streamDispatcher);
  });
}

export {
  songsGet,
  songPlay
};
