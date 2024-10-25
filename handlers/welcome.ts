import { Client, EmbedBuilder, GuildMember } from "discord.js";
import { logger } from "../utils/logger";
import { getChannel, getRole, getServer } from "../utils/get";

type WelcomeProps = {
  client: Client;
  member: GuildMember;
  welcomeChannelName?: string;
  welcomeDescription?: string;
  welcomeMessage?: string;
  welcomeRoleName?: string;
};

export const handleWelcome = async ({
  client,
  member,
  welcomeChannelName = "welcome",
  welcomeDescription = "",
  welcomeRoleName = "cool cure person",
}: WelcomeProps): Promise<void> => {
  const serverId = member.guild.id;
  const server = getServer(client, serverId);

  if (!server) {
    logger.error(`Server does not exist: ${serverId}`);
    return;
  }

  const channel =
    (await getChannel(client, serverId, welcomeChannelName)) ??
    (await getChannel(client, serverId, "general"));

  if (channel?.isSendable()) {
    const welcomeRole = getRole(client, serverId, welcomeRoleName);
    if (welcomeRole) {
      await member.roles.add(welcomeRole);
    }

    const embed = new EmbedBuilder();
    embed.setColor("#f00c63");
    embed.setTitle(`Welcome ${member.user.displayName} to ${server.name}!`);

    if (welcomeDescription) {
      embed.setDescription(welcomeDescription);
    }

    channel.send({ embeds: [embed] });
  }
};
