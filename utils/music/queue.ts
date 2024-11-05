import { Song } from "./song";

export class Queue {
  private songs: Song[];

  constructor(songs: Song[]) {
    this.songs = songs;
  }
}
