import { v4 as uuid } from "uuid";
import type { AppDispatch } from "../store";
import { addVisualNote, stopVisualNote } from "../store/noteRollSlice";
import { addNote, removeNote } from "../store/pianoSlice";
import type { Instrument } from "../types";
import { playNote, stopAllNotes, stopNote } from "./soundManager";

const noteIdMap = new Map<string, string>();

/**
 * Возвращает готовые обработчики событий мыши для клавиши пианино.
 * Поддерживает drag-перетаскивание и остановку воспроизведения при отпускании мыши.
 *
 * @param note - Нота, к которой относятся обработчики
 * @param instrument - Текущий инструмент
 * @param isMouseDownRef - ref, указывающий зажата ли кнопка мыши
 * @param dispatch - Redux dispatch
 */
export const createMouseHandlers = (
  note: string,
  instrument: Instrument,
  isMouseDownRef: React.MutableRefObject<boolean>,
  dispatch: AppDispatch
) => ({
  onMouseDown: () => {
    isMouseDownRef.current = true;
    const noteId = uuid();
    noteIdMap.set(note, noteId);

    dispatch(addNote(note));
    dispatch(
      addVisualNote({
        id: noteId,
        note,
        startTime: performance.now(),
      })
    );
    playNote(note, instrument.name);
  },

  onMouseEnter: () => {
    if (isMouseDownRef.current && !noteIdMap.has(note)) {
      const noteId = uuid();
      noteIdMap.set(note, noteId);

      dispatch(addNote(note));
      dispatch(
        addVisualNote({
          id: noteId,
          note,
          startTime: performance.now(),
        })
      );
      playNote(note, instrument.name);
    }
  },

  onMouseUp: () => {
    dispatch(removeNote(note));
    stopAllNotes(instrument.name);

    const noteId = noteIdMap.get(note);
    if (noteId) {
      dispatch(stopVisualNote({ id: noteId, endTime: performance.now() }));
      noteIdMap.delete(note);
    }
  },

  onMouseLeave: () => {
    if (isMouseDownRef.current) {
      dispatch(removeNote(note));
      stopNote(note, instrument.name);

      const noteId = noteIdMap.get(note);
      if (noteId) {
        dispatch(stopVisualNote({ id: noteId, endTime: performance.now() }));
        noteIdMap.delete(note);
      }
    }
  },
});
