import type { RootState } from "../../../store";

export const selectVisualNotes = (state: RootState) => state.noteRoll.notes;
export const selectIsRolling = (state: RootState) => state.noteRoll.isRolling;