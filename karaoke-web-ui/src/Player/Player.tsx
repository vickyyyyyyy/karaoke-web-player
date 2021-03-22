import React from 'react';
import ReactPlayer from 'react-player';

export const DEFAULT_VIDEO = 'https://www.youtube.com/watch?v=5zupeoaVsXY';

interface Props {
  url?: string;
}
export const Player = (props: Props) => {
  const { url } = props;

  return (
    <ReactPlayer url={url || DEFAULT_VIDEO} playing={true} controls={true} />
  );
};
