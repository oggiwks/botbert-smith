import { Client, EmbedBuilder, GuildMember } from "discord.js";
import { logger } from "../utils/logger";
import { getChannel, getRole, getServer } from "../utils/get";

const WELCOME_MESSAGE = "";

type WelcomeProps = {
  client: Client;
  member: GuildMember;
  welcomeChannelName?: string;
  welcomeMessage?: string;
  welcomeRoleName?: string;
};

export const handleWelcome = async ({
  client,
  member,
  welcomeChannelName = "welcome",
  welcomeRoleName = "cool cure person",
}: WelcomeProps): Promise<void> => {
  const serverId = member.guild.id;
  const server = getServer(client, serverId);

  if (!server) {
    logger.error(`Server does not exist: ${serverId}`);
    return;
  }

  const channel = await getChannel(client, serverId, welcomeChannelName);

  if (!channel) {
    logger.error("channel does not exist", { welcomeChannelName });
    return;
  }

  if (channel.isSendable()) {
    const welcomeRole = getRole(client, serverId, welcomeRoleName);
    if (!welcomeRole) {
      logger.error("welcome role does not exist", { welcomeRoleName });
      return;
    }
    await member.roles.add(welcomeRole);

    const embed = new EmbedBuilder();
    embed.setColor("#f00c63");
    embed.setTitle(
      "Welcome {member} to Is It Always Like This?".replace(
        "{member}",
        member.user.tag,
      ),
    );
    embed.setDescription(
      "Join us as we attempt to do a deep dive on the discography of The Cure!",
    );
    channel.send({ embeds: [embed] });
  }
};
