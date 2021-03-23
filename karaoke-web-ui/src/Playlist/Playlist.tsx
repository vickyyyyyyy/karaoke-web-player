import { Socket } from 'dgram';
import React from 'react';
import * as api from '../api';
import { DEFAULT_VIDEO } from '../Player/Player';
import { SocketContext } from '../SocketContext/SocketContext';

export interface QueuedSong {
  user: string;
  url: string;
  title: string;
}

interface Props {
  playlist: QueuedSong[];
  setPlaylist: (queuedSong: QueuedSong[]) => void;
  username: string;
}

export const Playlist = (props: Props) => {
  const { playlist, setPlaylist, username } = props;
  const socket = React.useContext(SocketContext);
  const [newSong, setNewSong] = React.useState<string>('');

  const setDefaultPlaylist = async () => {
    const details = await api.getVideoDetails(DEFAULT_VIDEO);

    const defaultPlaylist = [
      {
        user: 'System',
        url: DEFAULT_VIDEO,
        title: details.title,
      },
    ];

    setPlaylist(defaultPlaylist);

    socket.emit('defaultPlaylist', defaultPlaylist);
  };

  React.useEffect(() => {
    setDefaultPlaylist();
  }, []);

  socket.on('updatedPlaylist', (playlist: QueuedSong[]) => {
    setPlaylist(playlist);
  });

  const queueNewSong = async (url: string) => {
    const details = await api.getVideoDetails(url);
    const newPlaylist = [
      ...playlist,
      {
        user: username,
        url,
        title: details.title,
      },
    ];

    setNewSong('');

    setPlaylist(newPlaylist);

    socket.emit('updatePlaylist', newPlaylist);
  };

  const skipSong = () => {
    const newPlaylist = [...playlist];
    newPlaylist.shift();

    setPlaylist(newPlaylist);

    socket.emit('updatePlaylist', newPlaylist);
  };

  return (
    <div className='playlist'>
      <h2>Playlist</h2>
      <button onClick={() => skipSong()}>Skip to next</button>
      {playlist.map((queuedSong, index) => (
        <div key={`${index}-${queuedSong.title}`}>
          <br />
          <span>{queuedSong.title}</span>
          <br />
          <span>by {queuedSong.user}</span>
          <br />
        </div>
      ))}
      {playlist.length === 0 ? (
        <div>
          <br />
          <span>No queued songs, playing default</span>
        </div>
      ) : null}
      <br />
      <div className='playlist-add-song-container'>
        <input
          placeholder='Link'
          value={newSong}
          onChange={(ev) => setNewSong(ev.currentTarget.value)}
        />
        <button onClick={() => queueNewSong(newSong)}>Add song</button>
      </div>
    </div>
  );
};
