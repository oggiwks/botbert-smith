import { BotCommand } from "../types";
import { REST, Routes } from "discord.js";
import { logger } from "../utils/logger";

export const registerSlashCommands = async (
  commands: BotCommand[],
  restClient: REST,
  clientId: string,
): Promise<void> => {
  logger.info("registering slash commands...", commands);

  try {
    const response = await restClient.put(
      Routes.applicationCommands(clientId),
      {
        body: commands.map((item) => item.data.toJSON()),
      },
    );

    if (response) {
      logger.info("successfully registered slash commands!", { response });
    }
  } catch (error) {
    logger.error("failed to register slash commands", { error });
  }
};
