import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { VisualNote } from "../types/index";

interface NoteRollState {
  notes: VisualNote[];
}

const initialState: NoteRollState = {
  notes: [],
};

const noteRollSlice = createSlice({
  name: "noteRoll",
  initialState,
  reducers: {
    addVisualNote: (state, action: PayloadAction<VisualNote>) => {
      state.notes.push(action.payload);
    },
    stopVisualNote: (
      state,
      action: PayloadAction<{ id: string; endTime: number }>
    ) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note && !note.endTime) {
        note.endTime = action.payload.endTime;
      }
    },
    clearNoteRoll: (state) => {
      state.notes = [];
    },
  },
});

export const { addVisualNote, stopVisualNote, clearNoteRoll } =
  noteRollSlice.actions;

export default noteRollSlice.reducer;
