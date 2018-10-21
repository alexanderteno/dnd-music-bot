import Discord from 'discord.js';
import config from '../config.json';
import { hasRole } from '../helpers/roleHelper';
import streamService from './StreamService';

type MessageHandler = (message?: Discord.Message) => void;

const client = new Discord.Client();

const joinChannel = (member: Discord.GuildMember): Promise<void | Discord.VoiceConnection> => {
  if (member.voiceChannel && member.voiceChannel.joinable) {
    return member.voiceChannel.join().catch(console.error);
  } else {
    return Promise.reject('Unable to join a Voice Channel');
  }
}

const commands: Record<string, MessageHandler> = {
  summon: (message: Discord.Message) => {
    joinChannel(message.member).then(() => {
      console.info(`Joined Voice Channel: ${message.member.voiceChannel.name}`);
    });
  },
  play: (message: Discord.Message) => {
    streamService.stopAll();
    const [, , temp] = message.content.split(' ');
    const content = `E:\\Projects\\dnd-music-bot\\server\\src\\music\\sample-${temp}.mp3`;
    joinChannel(message.member)
      .then((voiceConnection: Discord.VoiceConnection) => {
        const streamDispatcher = voiceConnection.playFile(content);
        streamService.addStream(streamDispatcher);
      });
  },
  stop: () => {
    streamService.stopAll();
  }
};

const prefixedCommands: Record<string, MessageHandler> = Object.keys(commands)
  .reduce((acc: Record<string, MessageHandler>, commandName) => {
    acc[`${config.prefix}${commandName}`] = commands[commandName];
    return acc;
  }, {})

client.on('ready', () => {
  console.log('Discord Bot Ready!');
});

client.on('message', (message: Discord.Message) => {
  if (!message.author.bot && hasRole(message.member, config.adminRole)) {
    Object.keys(prefixedCommands).forEach((command: string) => {
      if (message.content.startsWith(command)) {
        console.log(`${command}: will be invoked`);
        prefixedCommands[command](message);
      }
    });
  }
});

export default client;
