import * as Tone from "tone";
import type { Instrument } from "../types";
import { instruments } from "./instruments";

// Хранилище Sampler'ов по имени инструмента
export const samplers: Record<string, Tone.Sampler> = {};

// Хранилище активных нот (для их остановки)
export const activeNotesMap: Record<string, Set<string>> = {};

/**
 * Загружает все Sampler'ы и ожидает завершения загрузки буферов
 */
export const loadAllSamplers = async () => {
  instruments.forEach((instrument: Instrument) => {
    const sampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
      },
      baseUrl: `/sounds/${instrument.src}/`,
      release: 1,
    }).toDestination();

    samplers[instrument.name] = sampler;
    activeNotesMap[instrument.name] = new Set();
  });

  // Ожидаем, пока все буферы загрузятся
  await Tone.loaded();
};

/**
 * Проигрывает ноту на выбранном инструменте
 * @param note Название ноты (например, "C4")
 * @param instrumentName Название выбранного инструмента
 */
export const playNote = (note: string, instrumentName: string) => {

  const sampler = samplers[instrumentName];
  if (!sampler) {
    console.warn(`Sampler for instrument ${instrumentName} not found`);
    return;
  }

  // Запуск ноты
  sampler.triggerAttack(note);
  activeNotesMap[instrumentName].add(note);
};

/**
 * Останавливает ноту (например, при отпускании клавиши)
 * @param note Название ноты
 * @param instrumentName Название выбранного инструмента
 */
export const stopNote = (note: string, instrumentName: string) => {
  const sampler = samplers[instrumentName];
  if (!sampler) {
    console.warn(`Sampler for instrument ${instrumentName} not found`);
    return;
  }

  // Остановка ноты
  sampler.triggerRelease(note);
  activeNotesMap[instrumentName].delete(note);
};

/**
 * Останавливает все активные ноты у инструмента
 * @param instrumentName Название выбранного инструмента
 */
export const stopAllNotes = (instrumentName: string) => {
  const sampler = samplers[instrumentName];
  if (!sampler) return;

  const activeNotes = activeNotesMap[instrumentName];
  activeNotes.forEach((note) => {
    sampler.triggerRelease(note);
  });

  activeNotes.clear();
};
