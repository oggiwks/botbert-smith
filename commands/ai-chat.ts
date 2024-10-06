import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { BotCommand } from "../types";
import { handleOpenAIInteraction } from "../handlers/openai";

export const aiChatCommandBuilder = (): BotCommand => {
  return {
    data: new SlashCommandBuilder()
      .setName("ai-chat")
      .setDescription("Uses OpenAI to respond to a chat message")
      .addStringOption((option) =>
        option
          .setName("request")
          .setDescription("The input to generate an AI response"),
      ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const request = interaction.options.getString("request", true);
      const response = await handleOpenAIInteraction(request);
      await interaction.reply(response);
    },
  };
};
