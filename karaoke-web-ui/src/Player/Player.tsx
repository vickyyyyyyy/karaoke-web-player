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

  const onPlay = () => console.log('play', socket.io.engine.id);
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
