import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Instrument } from "../types";

interface PianoState {
  activeNotes: string[];
  currentInstrument: Instrument;
}

const initialState: PianoState = {
  activeNotes: [],
  currentInstrument: {name:"Grand Piano", src:"grand_piano"},
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
  },
});

export const { addNote, removeNote, clearNotes, setInstrument } = pianoSlice.actions;
export default pianoSlice.reducer;
