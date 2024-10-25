import DisTube from "distube";
import { ChatInputCommandInteraction, VoiceChannel } from "discord.js";
import { getQueueEmbed } from "../../utils/embeds";

export type ViewQueueProps = {
  distube: DisTube;
  interaction: ChatInputCommandInteraction;
};

export const handleViewQueue = async ({
  distube,
  interaction,
}: ViewQueueProps): Promise<void> => {
  const queue = distube.getQueue(interaction);

  if (!queue || queue.songs.length < 1) {
    await interaction.reply(
      "No more songs left in the queue! Add more songs with `/add-to-queue` command",
    );
    return;
  }

  await interaction.reply({ embeds: [getQueueEmbed(queue)] });
};
