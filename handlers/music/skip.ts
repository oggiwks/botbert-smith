import DisTube from "distube";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  VoiceChannel,
} from "discord.js";
import { getQueueEmbed } from "../../utils/embeds";

export type SkipProps = {
  distube: DisTube;
  interaction: ChatInputCommandInteraction;
};

export const handleSkip = async ({
  distube,
  interaction,
}: SkipProps): Promise<void> => {
  const queue = distube.getQueue(interaction);

  if (!queue || queue.songs.length < 1) {
    await interaction.reply("No more songs left to skip!");
    return;
  }

  await distube.skip(interaction);

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor("#f00c63")
        .setTitle("Botbert's Jukebox")
        .setDescription(`Skipped current song...`),
    ],
  });

  await interaction.followUp({
    embeds: [getQueueEmbed(queue)],
  });
};
