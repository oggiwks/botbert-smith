import { BotCommand } from "../types";
import { aiChatCommandBuilder } from "../commands/ai-chat";
import { cureImageCommandBuilder } from "../commands/cure-image";

export const getCommands = (): BotCommand[] => {
  return [aiChatCommandBuilder(), cureImageCommandBuilder()];
};
