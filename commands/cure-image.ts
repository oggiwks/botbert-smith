import { BotCommand } from "../types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { search } from "../handlers/search";
import { getPseudoRandomFromRange } from "../utils/random";

export const cureImageCommandBuilder = (): BotCommand => {
  return {
    data: new SlashCommandBuilder()
      .setName("cure-image")
      .setDescription("Return a random image of The Cure"),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const results = await search("The Cure band", {
        imageSearch: true,
        page: getPseudoRandomFromRange(1, 101),
      });
      const [result] = results.items;
      await interaction.reply(result.link);
    },
  };
};
