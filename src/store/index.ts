import { configureStore } from "@reduxjs/toolkit";
import pianoReducer from "./pianoSlice";
// import noteRollReducer from './noteRollSlice';
import noteRollReducer from "../widgets/note-roll/model/noteRollSlice";

export const store = configureStore({
  reducer: {
    piano: pianoReducer,
    noteRoll: noteRollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
