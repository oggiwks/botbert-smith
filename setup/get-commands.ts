import { BotCommand } from "../types";
import { aiChatCommandBuilder } from "../commands/ai-chat";
import { cureImageCommandBuilder } from "../commands/cure-image";
import { addToQueueCommand } from "../commands/music/add-to-queue";
import DisTube from "distube";
import { skipCommmand } from "../commands/music/skip";
import { viewQueueCommand } from "../commands/music/view-queue";

export const getCommands = (distube: DisTube): BotCommand[] => [
  aiChatCommandBuilder(),
  addToQueueCommand(distube),
  cureImageCommandBuilder(),
  skipCommmand(distube),
  viewQueueCommand(distube),
];
