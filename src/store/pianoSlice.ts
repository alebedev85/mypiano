import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Instrument } from "../types";

interface PianoState {
  activeNotes: string[];
  currentInstrument: Instrument;
  volume: number; // от 0 до 1
  echo: number; // от 0 до 1
}

const initialState: PianoState = {
  activeNotes: [],
  currentInstrument: { name: "Grand Piano", src: "grand_piano" },
  volume: 1.5,
  echo: 0,
};

const pianoSlice = createSlice({
  name: "piano",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<string>) {
      if (!state.activeNotes.includes(action.payload)) {
        state.activeNotes.push(action.payload);
      }
    },
    removeNote(state, action: PayloadAction<string>) {
      state.activeNotes = state.activeNotes.filter((n) => n !== action.payload);
    },
    clearNotes(state) {
      state.activeNotes = [];
    },
    setInstrument(state, action: PayloadAction<Instrument>) {
      state.currentInstrument = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setEcho(state, action: PayloadAction<number>) {
      state.echo = action.payload;
    },
  },
});

export const {
  addNote,
  removeNote,
  clearNotes,
  setInstrument,
  setVolume,
  setEcho,
} = pianoSlice.actions;
export default pianoSlice.reducer;
