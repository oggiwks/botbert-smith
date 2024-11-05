import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  VoiceBasedChannel,
} from "discord.js";
import { logger } from "../../utils/logger";
import { getQueueEmbed } from "../../utils/music/embeds";

export type AddToQueueProps = {
  input: string;
  interaction: ChatInputCommandInteraction;
  position?: number;
  voiceChannel: VoiceBasedChannel;
};

export const handleAddToQueue = async ({
  input,
  interaction,
  position,
  voiceChannel,
}: AddToQueueProps): Promise<void> => {
  try {
    const song = await youtube.searchSong(input, {});

    if (!song) {
      await interaction.reply(`Could not find song '${input}'`);
      return;
    }

    const queue = distube.getQueue(interaction);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#f00c63")
          .setTitle("Botbert's Jukebox")
          .setDescription(`Added ${song.name} to the queue`),
      ],
    });

    queue
      ? queue.addToQueue(song, position)
      : await distube.play(voiceChannel, song);

    await interaction.followUp({
      embeds: [getQueueEmbed(queue ?? distube.getQueue(interaction))],
    });
  } catch (error) {
    logger.error("Error while playing queue", {
      message: (error as Error)?.message,
      error,
    });
  }
};
