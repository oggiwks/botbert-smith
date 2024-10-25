import DisTube, { Queue } from "distube";
import { BotCommand } from "../../types";
import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import { handleAddToQueue } from "../../handlers/music/add-to-queue";

export const addToQueueCommand = (distube: DisTube): BotCommand => {
  return {
    data: new SlashCommandBuilder()
      .setName("add-to-queue")
      .setDescription("Adds a song to the current song queue")
      .addStringOption((option) =>
        option
          .setName("input")
          .setDescription("A supported URL or a search query")
          .setRequired(true),
      )
      .addNumberOption((option) =>
        option
          .setName("position")
          .setDescription("Position will be added to the queue")
          .setRequired(false),
      ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const input = interaction.options.getString("input", true);
      const position =
        interaction.options.getInteger("position", false) ?? undefined;

      const voiceChannel = (interaction.member as GuildMember).voice.channel;

      if (!voiceChannel) {
        await interaction.reply(
          "You must be in a voice channel to play a song!",
        );
        return;
      }

      await handleAddToQueue({
        distube,
        input,
        interaction,
        position,
        voiceChannel,
      });
    },
  };
};
