import type { AppDispatch } from "../store";
import { addNote, removeNote } from "../store/pianoSlice";
import type { Instrument } from "../types";
import { playNote, stopNote } from "./soundManager";

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
    dispatch(addNote(note));
    playNote(note, instrument.name);
  },

  onMouseEnter: () => {
    if (isMouseDownRef.current) {
      dispatch(addNote(note));
      playNote(note, instrument.name);
    }
  },

  onMouseUp: () => {
    dispatch(removeNote(note));
    stopNote(note, instrument.name);
  },

  onMouseLeave: () => {
    if (isMouseDownRef.current) {
      dispatch(removeNote(note));
      stopNote(note, instrument.name);
    }
  }
});
