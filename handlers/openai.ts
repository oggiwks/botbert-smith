import OpenAI from "openai";
import { logger } from "../utils/logger";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleOpenAIInteraction = async (
  request: string,
): Promise<string> => {
  logger.info("sending request...", { request });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: request }],
    model: "gpt-4o-mini",
  };

  try {
    const response = await client.chat.completions.create(params);
    return response.choices?.[0]?.message.content?.trim() ?? "";
  } catch (error) {
    logger.error("error when getting AI response", { error, request });
    throw error;
  }
};
