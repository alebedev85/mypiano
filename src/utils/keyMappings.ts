import type { KeyMapping } from "../types";

export const keyMapping: KeyMapping[] = [
  { note: "G", key: "q", sharp: { note: "G#", key: "1" } },
  { note: "A", key: "w", sharp: { note: "A#", key: "2" } },
  { note: "B", key: "e", sharp: null },
  { note: "C2", key: "r", sharp: { note: "C#", key: "3" } },
  { note: "D2", key: "t", sharp: { note: "D#", key: "4" } },
  { note: "E2", key: "y", sharp: null },
  { note: "F2", key: "u", sharp: { note: "F#", key: "5" } },

  { note: "G2", key: "i", sharp: { note: "G#2", key: "6" } },
  { note: "A2", key: "o", sharp: { note: "A#2", key: "7" } },
  { note: "B2", key: "p", sharp: null },
  { note: "C3", key: "[", sharp: { note: "C#2", key: "8" } },
  { note: "D3", key: "]", sharp: { note: "D#2", key: "9" } },
  { note: "E3", key: "\\", sharp: null },
  { note: "F3", key: "=", sharp: { note: "F#2", key: "0" } },

  { note: "G3", key: "z", sharp: { note: "G#3", key: "a" } },
  { note: "A3", key: "x", sharp: { note: "A#3", key: "s" } },
  { note: "B3", key: "c", sharp: null },
  { note: "C4", key: "v", sharp: { note: "C#3", key: "d" } },
  { note: "D4", key: "b", sharp: { note: "D#3", key: "f" } },
  { note: "E4", key: "n", sharp: null },
  { note: "F4", key: "m", sharp: { note: "F#3", key: "g" } },

  { note: "G4", key: ",", sharp: { note: "G#4", key: "h" } },
  { note: "A4", key: ".", sharp: { note: "A#4", key: "j" } },
  { note: "B4", key: "/", sharp: null },
];
