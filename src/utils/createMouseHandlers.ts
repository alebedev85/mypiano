import type { AppDispatch } from "../store";
import { addNote, removeNote } from "../store/pianoSlice";
import type { Instrument } from "../types";
import { playNote } from "./soundManager";

/**
 * Возвращает готовые обработчики событий мыши для клавиши пианино
 * @param note - Нота, к которой относятся обработчики
 * @param instrument - Нота, к которой относятся обработчики
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
    playNote(note, instrument.src);
  },
  onMouseEnter: () => {
    if (isMouseDownRef.current) {
      dispatch(addNote(note));
      playNote(note, instrument.src);
    }
  },
  onMouseUp: () => {
    dispatch(removeNote(note));
  }
});
