// takes store state
// and returns the current elapsed time
export function getElapsedTime(
  baseTime: number,
  startedAt: number | undefined,
  stoppedAt = new Date().getTime()
) {
  if (!startedAt) {
    return 0;
  } else {
    return stoppedAt - startedAt + baseTime;
  }
}

// Convert time in seconds to string format: MM:SS
export function convertTime(time: number) {
  let minutes = Math.floor(~~((time % 3600) / 60));
  let seconds = Math.floor(time % 60);

  // Add leading zero
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
