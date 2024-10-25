import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";

export const getQueueEmbed = (queue?: Queue): EmbedBuilder => {
  const [current] = queue?.songs ?? [];

  const embed = new EmbedBuilder();
  embed.setColor("#f00c63");
  embed.setTitle("Botberts Jukebox");
  embed.setDescription(
    [
      `**Current:** \`${current.name || current.url}\` - \`${queue?.formattedCurrentTime ?? `00:00`}\`/\`${
        current.stream.playFromSource
          ? current.formattedDuration
          : current.stream.song?.formattedDuration
      }\`\n`,
      `**Up next**\n${
        queue?.songs
          .slice(1, 10)
          .map((song, i) => `**${i + 1}.** \`${song.name || song.url}\``)
          .join("\n") || "None"
      }`,
    ].join("\n"),
  );
  return embed;
};
