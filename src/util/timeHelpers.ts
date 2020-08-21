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

// Convert time in string seconds "2.400s" to string format: MM:SS
export function convertTranscriptTime(timeString: string) {
  const [time] = timeString.split("s");
  return convertTime(Number(time));
}

interface Word {
  startTime: string;
  endTime: string;
  word: string;
}

// returns a boolean if any of the phrase words are in range
export function isPhraseInTimeRange(phrase: Word[], currentTime: number) {
  const firstWord = phrase[0];
  const lastWord = phrase[phrase.length - 1];
  const [rangeStart] = firstWord.startTime.split("s");
  const [rangeEnd] = lastWord.endTime.split("s");

  return (
    Number(rangeStart) <= Number(currentTime.toFixed(2)) &&
    Number(rangeEnd) >= Number(currentTime.toFixed(2))
  );
}

// returns a boolean if any of the phrase words are in range
export function isPhraseTextInTimeRange(word: Word, currentTime: number) {
  const [rangeStart] = word.startTime.split("s");
  const [rangeEnd] = word.endTime.split("s");

  return (
    Number(rangeStart) <= Number(currentTime.toFixed(2)) &&
    Number(rangeEnd) >= Number(currentTime.toFixed(2))
  );
}
