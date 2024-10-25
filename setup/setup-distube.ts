import { Client } from "discord.js";
import DisTube from "distube";
import SpotifyPlugin from "@distube/spotify";
import SoundCloudPlugin from "@distube/soundcloud";
import DeezerPlugin from "@distube/deezer";
import { YouTubePlugin } from "@distube/youtube";

export const setupDistube = (client: Client): DisTube =>
  new DisTube(client, {
    plugins: [
      new SpotifyPlugin(),
      new SoundCloudPlugin(),
      new DeezerPlugin(),
      new YouTubePlugin(),
    ],
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
  });
