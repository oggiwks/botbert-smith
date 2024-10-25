import DisTube, { Queue } from "distube";
import { BotCommand } from "../../types";
import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import { handleViewQueue } from "../../handlers/music/view-queue";

export const viewQueueCommand = (distube: DisTube): BotCommand => ({
  data: new SlashCommandBuilder()
    .setName("view-queue")
    .setDescription("View the current queue"),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) {
      await interaction.reply("You must be in a voice channel to play a song!");
      return;
    }

    await handleViewQueue({
      distube,
      interaction,
    });
  },
});
