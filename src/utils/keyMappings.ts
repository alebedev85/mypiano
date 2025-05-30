import type { KeyMapping } from "../types";

export const keyMapping: KeyMapping[] = [
  { note: "G1", code: "KeyQ", label: "Q", sharp: { note: "G#1", code: "Digit2", label: "2" } },
  { note: "A1", code: "KeyW", label: "W", sharp: { note: "A#1", code: "Digit3", label: "3" } },
  { note: "B1", code: "KeyE", label: "E", sharp: null },
  { note: "C2", code: "KeyR", label: "R", sharp: { note: "C#2", code: "Digit5", label: "5" } },
  { note: "D2", code: "KeyT", label: "T", sharp: { note: "D#2", code: "Digit6", label: "6" } },
  { note: "E2", code: "KeyY", label: "Y", sharp: null },
  { note: "F2", code: "KeyU", label: "U", sharp: { note: "F#2", code: "Digit8", label: "8" } },

  { note: "G2", code: "KeyI", label: "I", sharp: { note: "G#2", code: "Digit9", label: "9" } },
  { note: "A2", code: "KeyO", label: "O", sharp: { note: "A#2", code: "Digit0", label: "0" } },
  { note: "B2", code: "KeyP", label: "P", sharp: null },
  { note: "C3", code: "BracketLeft", label: "[", sharp: { note: "C#3", code: "Equal", label: "=" } },
  { note: "D3", code: "BracketRight", label: "]", sharp: { note: "D#3", code: "KeyA", label: "A" } },
  { note: "E3", code: "KeyZ", label: "Z", sharp: null },
  { note: "F3", code: "KeyX", label: "X", sharp: { note: "F#3", code: "KeyD", label: "D" } },

  { note: "G3", code: "KeyC", label: "C", sharp: { note: "G#3", code: "KeyF", label: "F" } },
  { note: "A3", code: "KeyV", label: "V", sharp: { note: "A#3", code: "KeyG", label: "G" } },
  { note: "B3", code: "KeyB", label: "B", sharp: null },
  { note: "C4", code: "KeyN", label: "N", sharp: { note: "C#4", code: "KeyJ", label: "J" } },
  { note: "D4", code: "KeyM", label: "M", sharp: { note: "D#4", code: "KeyK", label: "K" } },
  { note: "E4", code: "Comma", label: ",", sharp: null },
  { note: "F4", code: "Period", label: ".", sharp: { note: "F#4", code: "Semicolon", label: ";" } },

  { note: "G4", code: "Slash", label: "/", sharp: { note: "G#4", code: "Quote", label: "'" } },
  { note: "B4", code: "Backslash", label: "\\", sharp: null },
];

export const sharpToFlat = (note: string): string => {
  const sharpToFlatMap: Record<string, string> = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
  };

  // Разделяем ноту и октаву (например, 'C#2' → 'C#' + '2')
  const match = note.match(/^([A-G]#)(\d)$/);
  if (!match) return note;

  const [, sharpNote, octave] = match;
  const flatNote = sharpToFlatMap[sharpNote];

  return flatNote ? `${flatNote}${octave}` : note;
};
