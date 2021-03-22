import React from 'react';
import ReactPlayer from 'react-player';
import { SocketContext } from '../SocketContext/SocketContext';

export const DEFAULT_VIDEO = 'https://www.youtube.com/watch?v=5zupeoaVsXY';

interface Props {
  url?: string;
}
export const Player = (props: Props) => {
  const { url } = props;
  const [playing, setPlaying] = React.useState(false);
  const [initialVideoState, setVideoState] = React.useState<any>({});

  const videoPlayer = React.useRef(null) as any;

  const socket = React.useContext(SocketContext);

  const onReady = () => {
    if (initialVideoState?.time > 0) {
      videoPlayer.current.seekTo(initialVideoState?.time);
    }

    if (initialVideoState?.playing) {
      videoPlayer?.current?.getInternalPlayer()?.playVideo();
    } else {
      videoPlayer?.current?.getInternalPlayer()?.pauseVideo();
    }
  };

  socket.on('syncVideo', (video) => {
    setVideoState(video);
  });

  socket.on('broadcasting user pressed play', (time) => {
    videoPlayer.current.seekTo(time);

    console.log('other user has pressed play', time, playing);
  });

  const onPlay = () => {
    socket.emit('user pressed play', videoPlayer.current.getCurrentTime());

    videoPlayer?.current?.getInternalPlayer()?.playVideo();

    console.log(
      'i have pressed play',
      videoPlayer.current.getCurrentTime(),
      playing
    );
  };

  // const onPause = () => {
  //   setPlaying(!playing);
  //   console.log('pause', !playing);
  // };

  return (
    <>
      <ReactPlayer
        ref={videoPlayer}
        onReady={onReady}
        onPlay={onPlay}
        // onPause={onPause}
        url={url || DEFAULT_VIDEO}
        controls={true}
      />
      <button
        onClick={() => videoPlayer?.current?.getInternalPlayer()?.playVideo()}
      >
        play
      </button>
    </>
  );
};
