import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { VisualNote } from "./types";

interface NoteRollState {
  notes: VisualNote[];
  isRolling: boolean;
}

const initialState: NoteRollState = {
  notes: [],
  isRolling: false,
};

const maxVisualTime = 5; // максимальное время в секундах, после которого удалять старые ноты

const noteRollSlice = createSlice({
  name: "noteRoll",
  initialState,
  reducers: {
    addVisualNote: (state, action: PayloadAction<VisualNote>) => {
      state.notes.push(action.payload);
      state.isRolling = true;
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
    stopRoll: (state) => {
      state.isRolling = false;
      state.notes = []; // если нужно сбросить все ноты
    },
    removeOldNotes: (state, action: PayloadAction<number>) => {
      const currentTime = action.payload;
      const cutoffTime = currentTime - maxVisualTime * 1000;

      state.notes = state.notes.filter((note) => {
        const end = note.endTime ?? currentTime;
        return end >= cutoffTime;
      });
    },
  },
});

export const {
  addVisualNote,
  stopVisualNote,
  clearNoteRoll,
  stopRoll,
  removeOldNotes,
} = noteRollSlice.actions;

export default noteRollSlice.reducer;
