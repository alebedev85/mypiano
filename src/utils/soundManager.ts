import * as Tone from "tone";
import { instruments } from "../constants/instruments";
import { store } from "../store";
import type { Instrument } from "../types";

// Хранилище Sampler'ов по имени инструмента
export const samplers: Record<string, Tone.Sampler> = {};

// Хранилище активных нот (для их остановки)
export const activeNotesMap: Record<string, Set<string>> = {};

// Глобальный эффект эха (feedback delay)
const reverbNode = new Tone.Reverb({
  decay: 2, // Время затухания (в секундах)
  preDelay: 0.01, // Задержка перед началом реверберации
  wet: 0, // Степень применения эффекта (0 — сухой, 1 — полностью с эффектом)
}).toDestination();

// Глобальный контрол громкости
const volumeGain = new Tone.Gain(0.5).connect(reverbNode); // по умолчанию 50%

/**
 * Загружает все Sampler'ы и ожидает завершения загрузки буферов
 */
export const loadAllSamplers = async () => {
  instruments.forEach((instrument: Instrument) => {
    const sampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
      },
      baseUrl: `${import.meta.env.BASE_URL}sounds/${instrument.src}/`,
      release: 1,
    }).connect(volumeGain);

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
export const playNote = async (note: string, instrumentName: string) => {
  const sampler = samplers[instrumentName];
  if (!sampler) {
    console.warn(`Sampler for instrument ${instrumentName} not found`);
    return;
  }

  //Получаем громкость и эффект эха из Redux
  const state = store.getState().piano;
  volumeGain.gain.value = state.volume;
  reverbNode.wet.value = state.echo;

  await Tone.start(); //активируем аудиоконтекст
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
