import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearNotes } from "../store/pianoSlice";
import { keyMapping } from "../constants/keyMappings";
import { startNote, stopNoteLogic } from "../utils/noteHandlers";

/**
 * Кастомный хук для управления логикой пианино:
 * - работа с клавиатурой (keydown / keyup)
 * - отслеживание зажатия мыши
 * - взаимодействие с Redux
 */
export const usePianoControls = () => {
  // Достаём Redux-состояние
  const { activeNotes, currentInstrument } = useSelector(
    (state: RootState) => state.piano
  );
  const dispatch = useDispatch();

  // Реф для актуального списка активных нот (нужно внутри слушателей)
  const activeNotesRef = useRef<string[]>(activeNotes);

  // Реф для отслеживания зажатия мыши (drag over)
  const isMouseDownRef = useRef(false);

  // Синхронизируем активные ноты в реф при каждом обновлении
  useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

  // Слушатель клавиатуры (keydown / keyup)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.code;

      const match = keyMapping.find(
        (k) => k.code === code || k.sharp?.code === code
      );

      const noteToPlay = match?.code === code ? match.note : match?.sharp?.note;

      if (noteToPlay && !activeNotesRef.current.includes(noteToPlay)) {
        startNote(noteToPlay, currentInstrument, dispatch);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const code = event.code;

      const match = keyMapping.find(
        (k) => k.code === code || k.sharp?.code === code
      );

      const noteToRemove =
        match?.code === code ? match.note : match?.sharp?.note;

      if (noteToRemove) {
        stopNoteLogic(noteToRemove, currentInstrument, dispatch);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentInstrument, dispatch]);

  // Глобальный слушатель отпускания мыши
  useEffect(() => {
    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      dispatch(clearNotes());
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [dispatch]);

  return {
    activeNotes,
    isMouseDownRef,
    dispatch,
  };
};
