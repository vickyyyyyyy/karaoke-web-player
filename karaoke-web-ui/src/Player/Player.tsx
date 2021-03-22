import React from 'react';
import ReactPlayer from 'react-player';
import { SocketContext } from '../SocketContext/SocketContext';

export const DEFAULT_VIDEO = 'https://www.youtube.com/watch?v=5zupeoaVsXY';

interface Props {
  url?: string;
}
export const Player = (props: Props) => {
  const { url } = props;

  const videoPlayer = React.useRef(null) as any;

  const socket = React.useContext(SocketContext);

  socket.on('broadcasting user pressed play', (time) => {
    videoPlayer.current.seekTo(time);
  });

  const onPlay = () => {
    socket.emit('user pressed play', videoPlayer.current.getCurrentTime());
  };
  const onPause = () => console.log('pause', socket.io.engine.id);

  return (
    <ReactPlayer
      ref={videoPlayer}
      onPlay={onPlay}
      onPause={onPause}
      url={url || DEFAULT_VIDEO}
      playing={true}
      controls={true}
    />
  );
};
