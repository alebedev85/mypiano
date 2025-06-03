import { configureStore } from "@reduxjs/toolkit";
import pianoReducer from "./pianoSlice";

export const store = configureStore({
  reducer: {
    piano: pianoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;