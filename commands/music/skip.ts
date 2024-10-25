import DisTube from "distube";
import { BotCommand } from "../../types";
import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import { logger } from "../../utils/logger";
import { handleSkip } from "../../handlers/music/skip";

export const skipCommmand = (distube: DisTube): BotCommand => ({
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song in the queue"),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) {
      logger.error("Must be in voice channel to play a song!");
      await interaction.reply("You must be in a voice channel to play a song!");
      return;
    }

    await handleSkip({
      distube,
      interaction,
    });
  },
});
