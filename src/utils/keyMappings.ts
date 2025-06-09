import type { KeyMapping } from "../types";

export const keyMapping: KeyMapping[] = [
  { note: "C2", code: "KeyQ", label: "Q", sharp: { note: "C#2", code: "Digit2", label: "2" } },
  { note: "D2", code: "KeyW", label: "W", sharp: { note: "D#2", code: "Digit3", label: "3" } },
  { note: "E2", code: "KeyE", label: "E", sharp: null },
  { note: "F2", code: "KeyR", label: "R", sharp: { note: "F#2", code: "Digit5", label: "5" } },
  { note: "G2", code: "KeyT", label: "T", sharp: { note: "G#2", code: "Digit6", label: "6" } },
  { note: "A2", code: "KeyY", label: "Y", sharp: { note: "A#2", code: "Digit7", label: "7" } },
  { note: "B2", code: "KeyU", label: "U", sharp: null },
  { note: "C3", code: "KeyI", label: "I", sharp: { note: "C#3", code: "Digit9", label: "9" } },
  { note: "D3", code: "KeyO", label: "O", sharp: { note: "D#3", code: "Digit0", label: "0" } },
  { note: "E3", code: "KeyP", label: "P", sharp: null },
  { note: "F3", code: "BracketLeft", label: "[", sharp: { note: "F#3", code: "Equal", label: "=" } },
  { note: "G3", code: "BracketRight", label: "]", sharp: { note: "G#3", code: "KeyA", label: "A" } },
  { note: "A3", code: "KeyZ", label: "Z", sharp: { note: "A#3", code: "KeyD", label: "D" } },
  { note: "B3", code: "KeyX", label: "X", sharp: null },
  { note: "C4", code: "KeyC", label: "C", sharp: { note: "C#4", code: "KeyF", label: "F" } },
  { note: "D4", code: "KeyV", label: "V", sharp: { note: "D#4", code: "KeyG", label: "G" } },
  { note: "E4", code: "KeyB", label: "B", sharp: null },
  { note: "F4", code: "KeyN", label: "N", sharp: { note: "F#4", code: "KeyJ", label: "J" } },
  { note: "G4", code: "KeyM", label: "M", sharp: { note: "G#4", code: "KeyK", label: "K" } },
  { note: "A4", code: "Comma", label: ",", sharp: { note: "A#4", code: "KeyL", label: "l" } },
  { note: "B4", code: "Period", label: ".", sharp: null },
  { note: "C5", code: "Slash", label: "/", sharp: null },
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
