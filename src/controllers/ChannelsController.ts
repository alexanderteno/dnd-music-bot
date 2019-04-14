import { RequestHandler, Request, Response } from 'express';
import { interfaceManager } from '../services/interfaceManager';
import Discord from 'discord.js';

const channelsGet: RequestHandler = (_: Request, response: Response): void => {
  const channels = interfaceManager.client.channels.map((channel: Discord.Channel & { name: string }) => ({
    type: channel.type,
    id: channel.id,
    name: channel.name,
  }));
  response.json(channels);
}

const channelsGetActive: RequestHandler = (_: Request, response: Response): void => {
  const voiceConnection = interfaceManager.client.voiceConnections.first();
  if (voiceConnection) {
    const currentChannel = voiceConnection.channel;
    response.json({ id: currentChannel.id, status: 'established' });
  } else {
    response.json({ id: undefined, status: 'no-connection' });
  }
}

const channelJoin: RequestHandler = (request: Request, response: Response): void => {
  const channel = interfaceManager.client.channels.get(request.params.id) as Discord.VoiceChannel;
  channel.join()
    .then(() => {
      response.json({ id: request.params.id, status: 'joined' });
    })
    .catch((err) => {
      response.status(500).json(err)
    })
}
export {
  channelsGet,
  channelsGetActive,
  channelJoin,
}
