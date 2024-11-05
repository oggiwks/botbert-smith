import { ChatInputCommandInteraction } from "discord.js";
import { getQueueEmbed } from "../../utils/music/embeds";

export type ViewQueueProps = {
  interaction: ChatInputCommandInteraction;
};

export const handleViewQueue = async ({
  interaction,
}: ViewQueueProps): Promise<void> => {
  const queue = interaction.client;

  if (!queue || queue.songs.length < 1) {
    await interaction.reply(
      "No more songs left in the queue! Add more songs with `/add-to-queue` command",
    );
    return;
  }

  await interaction.reply({ embeds: [getQueueEmbed(queue)] });
};
