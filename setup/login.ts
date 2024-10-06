import { Client } from "discord.js";
import { logger } from "../utils/logger";

export const login = async (client: Client, token: string): Promise<void> => {
  await client.login(token).catch((error) => {
    logger.error("failed to login", { error });
  });
};
