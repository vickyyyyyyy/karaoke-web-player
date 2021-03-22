import React from 'react';
import * as api from '../api';
import { DEFAULT_VIDEO } from '../Player/Player';

export interface QueuedSong {
  user: string;
  url: string;
  title: string;
}

interface Props {
  playlist: QueuedSong[];
  setPlaylist: (queuedSong: QueuedSong[]) => void;
}

export const Playlist = (props: Props) => {
  const { playlist, setPlaylist } = props;

  const [newSong, setNewSong] = React.useState<string>('');

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

  const skipSong = () => {
    const newPlaylist = [...playlist];
    newPlaylist.shift();

    setPlaylist(newPlaylist);
  };

  return (
    <>
      <h2>Playlist</h2>
      <button onClick={() => skipSong()}>Skip to next</button>
      {playlist.map((queuedSong) => (
        <div>
          <span>{queuedSong.title}</span>
          <br />
          <span>by {queuedSong.user}</span>
          <br />
        </div>
      ))}
      {playlist.length === 0 ? (
        <div>
          <span>No queued songs, playing default</span>
        </div>
      ) : null}
      <div>
        <input
          placeholder='Link'
          value={newSong}
          onChange={(ev) => setNewSong(ev.currentTarget.value)}
        />
        <button onClick={() => queueNewSong(newSong)}>Add song</button>
      </div>
    </>
  );
};
