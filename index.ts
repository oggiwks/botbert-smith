import "dotenv/config";
import { Client, Events, GatewayIntentBits, REST } from "discord.js";
import { logger } from "./utils/logger";
import { login } from "./setup/login";
import { setupEventHandlers } from "./setup/setup-event-handlers";
import { registerSlashCommands } from "./setup/register-slash-commands";
import { getCommands } from "./setup/get-commands";

const { DISCORD_CLIENT_ID = "NOT_SET", DISCORD_TOKEN = "NOT_SET" } =
  process.env;

const main = async (): Promise<void> => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
    ],
    shards: "auto",
  });

  client.once(Events.ClientReady, (readyClient) => {
    logger.info("successfully logged into Discord. ready for commands...", {
      user: readyClient.user.tag,
    });
  });

  await login(client, DISCORD_TOKEN);

  setupEventHandlers(client);

  const restClient = new REST().setToken(DISCORD_TOKEN);

  await registerSlashCommands(getCommands(), restClient, DISCORD_CLIENT_ID);
};

main();
