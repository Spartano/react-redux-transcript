import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import transcribeReducer from "../features/transcribe/transcribeSlice";
import { refHandler } from "./refMiddleware";

export const store = configureStore({
  reducer: {
    transcribe: transcribeReducer,
  },
  middleware: [refHandler],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
