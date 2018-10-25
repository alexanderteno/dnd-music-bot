import { GuildMember } from 'discord.js';

const hasRole = (member: GuildMember, roleName: string): boolean => {
  return member.roles.some((role) => role.name === roleName)
}

export {
  hasRole
};
