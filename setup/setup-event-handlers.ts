import { Client, Events, GuildMember, Interaction, Message } from "discord.js";
import { logger } from "../utils/logger";
import { handleChatInput } from "../handlers/chat-input";
import { getCommands } from "./get-commands";
import { handleOpenAIInteraction } from "../handlers/openai";
import { handleWelcome } from "../handlers/welcome";
import DisTube from "distube";

export const setupEventHandlers = (client: Client, distube: DisTube): void => {
  client.on(Events.ClientReady, () => {
    logger.info("bot is now ready!!!");
  });

  client.on(Events.Error, (error: Error) => {
    logger.error("error handling event", { error, user: client.user?.tag });
  });

  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    logger.info("a new member has joined!", {
      member: member.user.id,
      name: member.user.displayName,
    });
    await handleWelcome({
      client,
      member,
    });
  });

  client.on(Events.InteractionCreate, (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      return handleChatInput(interaction, getCommands(distube));
    }
  });

  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) return;

    if (client.user?.id && message.mentions.has(client.user.id)) {
      const response = await handleOpenAIInteraction(message.content);
      await message.reply(response);
    }

    logger.info("received message", { message });
  });
};
