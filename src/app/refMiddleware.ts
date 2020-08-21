import { storeAudioRef } from "features/transcribe/transcribeSlice";

interface T {
  audioRef: HTMLAudioElement | null;
}

export const myRefStore: T = { audioRef: null };

export function refHandler({ getState }) {
  return (next) => (action) => {
    switch (action.type) {
      case storeAudioRef.toString():
        myRefStore.audioRef = action.payload;
        break;
    }
    const returnValue = next(action);
    return returnValue;
  };
}
