export interface QueuedSong {
  user: string;
  url: string;
  title: string;
}

let playlist: QueuedSong[] = [];

export const getPlaylist = () => playlist;
export const updatePlaylist = (newPlaylist: QueuedSong[]) =>
  (playlist = newPlaylist);
