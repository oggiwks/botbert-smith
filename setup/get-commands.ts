import { BotCommand } from "../types";
import { aiChatCommandBuilder } from "../commands/ai-chat";
import { cureImageCommandBuilder } from "../commands/cure-image";
import { cureJokeCommandBuilder } from "../commands/cure-joke";

export const getCommands = (): BotCommand[] => [
  aiChatCommandBuilder(),
  cureImageCommandBuilder(),
  cureJokeCommandBuilder(),
];
