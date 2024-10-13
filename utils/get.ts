import { Channel, Client, Guild, Role } from "discord.js";

export const getChannel = async (
  client: Client,
  serverId: string,
  identifier: string,
): Promise<Channel | null> => {
  const server = getServer(client, serverId);
  const guildChannel = server?.channels.cache.find(
    (channel) => channel.id === identifier || channel.name === identifier,
  );
  return guildChannel ? client.channels.fetch(guildChannel.id) : null;
};

export const getRole = (
  client: Client,
  serverId: string,
  roleName: string,
): Role | undefined => {
  const server = getServer(client, serverId);
  return server?.roles.cache.find((role) => role.name === roleName);
};

export const getServer = (
  client: Client,
  serverId: string,
): Guild | undefined =>
  client.guilds.cache.find((guild) => guild.id === serverId);
