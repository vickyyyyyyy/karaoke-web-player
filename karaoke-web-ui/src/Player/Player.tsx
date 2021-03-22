import React from 'react';
import ReactPlayer from 'react-player';
import { SocketContext } from '../SocketContext/SocketContext';

export const DEFAULT_VIDEO = 'https://www.youtube.com/watch?v=5zupeoaVsXY';

interface Props {
  url?: string;
}
export const Player = (props: Props) => {
  const { url } = props;

  const socket = React.useContext(SocketContext);

  const onPlay = () => {
    socket.emit('user pressed play');

    socket.on('broadcasting user pressed play', () => {
      console.log('another user has pressed play');
    });
  };
  const onPause = () => console.log('pause', socket.io.engine.id);

  return (
    <ReactPlayer
      onPlay={onPlay}
      onPause={onPause}
      url={url || DEFAULT_VIDEO}
      playing={true}
      controls={true}
    />
  );
};
