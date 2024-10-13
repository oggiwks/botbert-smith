import { ChatInputCommandInteraction } from "discord.js";
import { BotCommand } from "../types";
import { logger } from "../utils/logger";

export const handleChatInput = async (
  interaction: ChatInputCommandInteraction,
  commands: BotCommand[],
): Promise<void> => {
  logger.info("handling interaction...", { interaction });

  const { commandName } = interaction;
  const matchedCommand = commands.find((c) => c.data.name === commandName);

  if (!matchedCommand) {
    logger.warn("unknown command name", { commandName });
    return;
  }

  try {
    await matchedCommand.execute(interaction);
    logger.info("successfully handled interaction", {
      commandName,
      guild: interaction.guild?.name,
      user: interaction.user.tag,
    });
  } catch (error) {
    logger.error("unhandled interaction", {
      error,
      guild: interaction.guild?.name,
      user: interaction.user.tag,
    });
  }
};
