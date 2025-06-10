import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import type { RootState } from "../store";
import { addVisualNote, stopVisualNote } from "../store/noteRollSlice";
import { addNote, clearNotes, removeNote } from "../store/pianoSlice";
import { keyMapping } from "../utils/keyMappings";
import { playNote, stopNote } from "../utils/soundManager";

/**
 * Кастомный хук для управления логикой взаимодействия с клавишами пианино
 * через клавиатуру и мышь. Включает:
 * - добавление/удаление активных нот
 * - проигрывание звуков
 * - глобальные слушатели событий
 */
export const usePianoControls = () => {
  //Добавь useRef<Map<string, string>>() — чтобы сопоставлять ноты и их уникальные ID
  const noteIdMapRef = useRef<Map<string, string>>(new Map());

  // Получаем массив активных нот из Redux-хранилища
  const { activeNotes, currentInstrument } = useSelector(
    (state: RootState) => state.piano
  );

  // Получаем функцию для отправки действий в Redux
  const dispatch = useDispatch();

  // Реф для хранения актуального списка активных нот,
  // чтобы использовать его внутри событий, не подписываясь на изменения каждый рендер
  const activeNotesRef = useRef<string[]>([]);

  // Реф-флаг, показывающий, зажата ли кнопка мыши (нужен для Drag-over по клавишам)
  const isMouseDownRef = useRef(false);

  /**
   * Эффект: обновляет `activeNotesRef` каждый раз, когда обновляется Redux-состояние
   * Это позволяет получать "свежие" данные в слушателях событий
   */
  useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

  /**
   * Эффект: добавляет глобальные обработчики клавиатуры (keydown / keyup)
   * для взаимодействия с пианино через физическую клавиатуру
   */
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const code = event.code;

      // Ищем ноту (обычную или диезную) по коду клавиши
      const match = keyMapping.find(
        (k) => k.code === code || k.sharp?.code === code
      );

      // Определяем, какую ноту нужно проиграть: обычную или диезную
      const noteToPlay = match?.code === code ? match.note : match?.sharp?.note;

      if (noteToPlay && !activeNotesRef.current.includes(noteToPlay)) {
        const noteId = uuid();
        noteIdMapRef.current.set(noteToPlay, noteId);

        dispatch(addNote(noteToPlay));
        dispatch(
          addVisualNote({
            id: noteId,
            note: noteToPlay,
            startTime: performance.now(),
          })
        );

        await playNote(noteToPlay, currentInstrument.name);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const code = event.code;

      // Ищем ноту по коду клавиши
      const match = keyMapping.find(
        (k) => k.code === code || k.sharp?.code === code
      );

      const noteToRemove =
        match?.code === code ? match.note : match?.sharp?.note;

      if (noteToRemove) {
        dispatch(removeNote(noteToRemove));
        stopNote(noteToRemove, currentInstrument.name);

        const noteId = noteIdMapRef.current.get(noteToRemove);
        if (noteId) {
          dispatch(stopVisualNote({ id: noteId, endTime: performance.now() }));
          noteIdMapRef.current.delete(noteToRemove);
        }
      }
    };

    const down = (event: KeyboardEvent) => {
      // запускаем асинхронно
      handleKeyDown(event);
    };

    // Подписка на глобальные события клавиатуры
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", handleKeyUp);

    // Очистка слушателей при размонтировании
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentInstrument.name]);

  /**
   * Эффект: глобальный обработчик отпускания кнопки мыши (mouseup)
   * Используется, чтобы сбросить активные ноты, если пользователь
   * отпустил кнопку мыши вне клавиши
   */
  useEffect(() => {
    const handleMouseUp = () => {
      isMouseDownRef.current = false; // Снимаем флаг зажатия мыши
      dispatch(clearNotes()); // Убираем все активные ноты
    };

    window.addEventListener("mouseup", handleMouseUp);

    // Очистка слушателя
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Возвращаем наружу нужные значения и рефы для использования в компоненте Piano
  return {
    activeNotes, // Текущее состояние активных нот (для подсветки клавиш)
    isMouseDownRef, // Реф, отслеживающий зажатие кнопки мыши (для drag-игры)
    dispatch, // Redux dispatch, используемый в событиях мыши
  };
};
