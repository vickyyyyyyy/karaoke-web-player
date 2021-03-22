interface Video {
  playing: boolean;
  time: number;
}

let state = {
  playing: true,
  time: 0,
};

export const getVideoState = () => state;
export const setVideoState = (newState: Partial<Video>) =>
  (state = { ...state, ...newState });
