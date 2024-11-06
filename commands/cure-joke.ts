import { BotCommand } from "../types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { handleOpenAIInteraction } from "../handlers/openai";

export const cureJokeCommandBuilder = (): BotCommand => ({
  data: new SlashCommandBuilder()
    .setName("cure-joke")
    .setDescription("Return a random joke about The Cure"),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const response = await handleOpenAIInteraction(
      "Tell a joke about the band The Cure.",
    );
    await interaction.reply(response);
  },
});
