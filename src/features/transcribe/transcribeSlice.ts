import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";

interface TranscribeState {
  audioDuration: number;
  audioIsPlaying: boolean;
  audioVolume: number;
  audioCurrentTime: number;
  audioPlaybackRate: 0.5 | 0.75 | 1 | 1.5 | 2;
}

const initialState: TranscribeState = {
  audioDuration: 0,
  audioIsPlaying: false,
  audioVolume: 1,
  audioPlaybackRate: 1,
  audioCurrentTime: 0,
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const transcribeSlice = createSlice({
  name: "transcribe",
  initialState,
  reducers: {
    startAudioPlaying: (state) => {
      state.audioIsPlaying = true;
    },
    pauseAudioPlaying: (state) => {
      state.audioIsPlaying = false;
    },
    setAudioVolume(state, action: PayloadAction<number>) {
      state.audioVolume = action.payload;
    },
    setAudioPlaybackRate(state, action: PayloadAction<0.5 | 0.75 | 1 | 1.5 | 2>) {
      state.audioPlaybackRate = action.payload;
    },
    setAudioDuration(state, action: PayloadAction<number>) {
      state.audioDuration = action.payload;
    },
    skipAudioForward10(state, action: PayloadAction<number>) {
      state.audioCurrentTime = action.payload;
    },
    skipAudioBackward10(state, action: PayloadAction<number>) {
      state.audioCurrentTime = action.payload;
    },
    setAudioCurrentTime(state, action: PayloadAction<number>) {
      if (action.payload === state.audioDuration) {
        state.audioIsPlaying = false;
      }
      state.audioCurrentTime = action.payload;
    },
    storeAudioRef(state, action: PayloadAction<any>) {},
  },
});

export const {
  startAudioPlaying,
  pauseAudioPlaying,
  setAudioDuration,
  skipAudioForward10,
  skipAudioBackward10,
  setAudioVolume,
  setAudioPlaybackRate,
  setAudioCurrentTime,
  storeAudioRef,
} = transcribeSlice.actions;

export const selectAudioPlaybackRate = (state: RootState) => state.transcribe.audioPlaybackRate;
export const selectAudioDuration = (state: RootState) => state.transcribe.audioDuration;
export const selectAudioPlaying = (state: RootState) => state.transcribe.audioIsPlaying;
export const selectAudioVolume = (state: RootState) => state.transcribe.audioVolume;
export const selectAudioCurrentTime = (state: RootState) => state.transcribe.audioCurrentTime;

export default transcribeSlice.reducer;
