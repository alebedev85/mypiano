import type { KeyMapping } from "../types";

export const keyMapping: KeyMapping[] = [
  { note: "G", key: "q", sharp: { note: "G#", key: "2" } },
  { note: "A", key: "w", sharp: { note: "A#", key: "3" } },
  { note: "B", key: "e", sharp: null },
  { note: "C2", key: "r", sharp: { note: "C#", key: "5" } },
  { note: "D2", key: "t", sharp: { note: "D#", key: "6" } },
  { note: "E2", key: "y", sharp: null },
  { note: "F2", key: "u", sharp: { note: "F#", key: "8" } },

  { note: "G2", key: "i", sharp: { note: "G#2", key: "9" } },
  { note: "A2", key: "o", sharp: { note: "A#2", key: "0" } },
  { note: "B2", key: "p", sharp: null },
  { note: "C3", key: "[", sharp: { note: "C#3", key: "=" } },
  { note: "D3", key: "]", sharp: { note: "D#3", key: "a" } },
  { note: "E3", key: "z", sharp: null },
  { note: "F3", key: "x", sharp: { note: "F#3", key: "d" } },

  { note: "G3", key: "c", sharp: { note: "G#3", key: "f" } },
  { note: "A3", key: "v", sharp: { note: "A#3", key: "g" } },
  { note: "B3", key: "b", sharp: null },
  { note: "C4", key: "n", sharp: { note: "C#4", key: "j" } },
  { note: "D4", key: "m", sharp: { note: "D#4", key: "k" } },
  { note: "E4", key: ",", sharp: null },
  { note: "F4", key: ".", sharp: { note: "F#4", key: ";" } },

  { note: "G4", key: "/", sharp: { note: "G#4", key: "'" } },
  { note: "B4", key: "\\", sharp: null },
];
