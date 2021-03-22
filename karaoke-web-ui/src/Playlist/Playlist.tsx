import React from 'react';
import * as api from '../api';
import { DEFAULT_VIDEO } from '../Player/Player';

interface QueuedSong {
  user: string;
  url: string;
  title: string;
}

export const Playlist = () => {
  const [newSong, setNewSong] = React.useState<string>('');
  const [playlist, setPlaylist] = React.useState<QueuedSong[]>([]);

  const setDefaultPlaylist = async () => {
    const details = await api.getVideoDetails(DEFAULT_VIDEO);

    setPlaylist([
      {
        user: 'Default',
        url: DEFAULT_VIDEO,
        title: details.title,
      },
    ]);
  };

  React.useEffect(() => {
    setDefaultPlaylist();
  }, []);

  const queueNewSong = async (url: string) => {
    const details = await api.getVideoDetails(url);

    setPlaylist([
      ...playlist,
      {
        user: 'Default',
        url,
        title: details.title,
      },
    ]);
  };

  return (
    <>
      <h2>Playlist</h2>
      {playlist.map((queuedSong) => (
        <div>
          <span>{queuedSong.title}</span>
          <br />
          <span>by {queuedSong.user}</span>
          <br />
        </div>
      ))}
      <input
        placeholder='Link'
        value={newSong}
        onChange={(ev) => setNewSong(ev.currentTarget.value)}
      />
      <button onClick={() => queueNewSong(newSong)}>Add song</button>
    </>
  );
};
