// Convert number to string format for audio speed: 1.0 | 1.5
export const convertSpeed = (playbackRate: number) =>
  playbackRate === 0.75 ? `${playbackRate.toFixed(2)}x` : `${playbackRate.toFixed(1)}x`;
