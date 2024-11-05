import { spotify } from "play-dl";

export type Song = {
  url: string;
  title: string;
  artist: string;
  duration: number;
};

export const getSpotifySong = async (url: string): Promise<Song | Song[]> => {
  const data = await spotify(url);
};
