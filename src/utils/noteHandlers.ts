// src/utils/noteHandlers.ts

import { v4 as uuid } from "uuid";
import type { AppDispatch } from "../store";
import { addNote, removeNote } from "../store/pianoSlice";
import { addVisualNote, stopVisualNote } from "../store/noteRollSlice";
import { playNote, stopNote, stopAllNotes } from "./soundManager";
import type { Instrument } from "../types";

/**
 * Карта для сопоставления ноты и её уникального идентификатора визуализации.
 * Это позволяет отслеживать каждую отдельную ноту во время её проигрывания.
 */
export const noteIdMap = new Map<string, string>();

/**
 * Запускает воспроизведение указанной ноты:
 * - генерирует уникальный ID для визуализации
 * - сохраняет ID в noteIdMap
 * - обновляет Redux (добавляет ноту и визуальную ноту)
 * - запускает воспроизведение звука
 *
 * @param note - Нота (например: "C4", "D#5")
 * @param instrument - Текущий инструмент
 * @param dispatch - Redux dispatch
 */
export const startNote = (
  note: string,
  instrument: Instrument,
  dispatch: AppDispatch
) => {
  // Проверяем, не запущена ли уже эта нота
  if (noteIdMap.has(note)) return;

  // Генерируем уникальный ID для визуализации
  const noteId = uuid();
  noteIdMap.set(note, noteId);

  // Добавляем ноту в Redux (для подсветки клавиш)
  dispatch(addNote(note));

  // Добавляем визуальную ноту в NoteRoll
  dispatch(
    addVisualNote({
      id: noteId,
      note,
      startTime: performance.now(),
    })
  );

  // Запускаем воспроизведение звука
  playNote(note, instrument.name);
};

/**
 * Останавливает указанную ноту:
 * - удаляет ноту из Redux
 * - останавливает звук
 * - завершает визуализацию
 * 
 * Используется для событий типа mouseLeave, keyup и др.
 *
 * @param note - Нота
 * @param instrument - Текущий инструмент
 * @param dispatch - Redux dispatch
 */
export const stopNoteLogic = (
  note: string,
  instrument: Instrument,
  dispatch: AppDispatch
) => {
  // Удаляем ноту из Redux
  dispatch(removeNote(note));

  // Останавливаем воспроизведение конкретной ноты
  stopNote(note, instrument.name);

  // Завершаем визуализацию
  const noteId = noteIdMap.get(note);
  if (noteId) {
    dispatch(stopVisualNote({ id: noteId, endTime: performance.now() }));
    noteIdMap.delete(note);
  }
};

/**
 * Останавливает все активные ноты (сценарий отпускания мыши при mouseUp)
 * Отличие от stopNoteLogic — здесь вызывается полная остановка всех звуков.
 *
 * @param note - Нота (для визуализации)
 * @param instrument - Текущий инструмент
 * @param dispatch - Redux dispatch
 */
export const stopAllNoteLogic = (
  note: string,
  instrument: Instrument,
  dispatch: AppDispatch
) => {
  // Удаляем ноту из Redux
  dispatch(removeNote(note));

  // Полностью останавливаем все ноты данного инструмента
  stopAllNotes(instrument.name);

  // Завершаем визуализацию
  const noteId = noteIdMap.get(note);
  if (noteId) {
    dispatch(stopVisualNote({ id: noteId, endTime: performance.now() }));
    noteIdMap.delete(note);
  }
};
