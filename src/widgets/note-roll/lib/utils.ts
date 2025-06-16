import { keyMapping } from "../../../utils/keyMappings";

const keyWidthWhite = 60;
const keyWidthBlack = 40;

export function getNoteX(note: string): number {
  let position = 0;
  for (const key of keyMapping) {
    if (key.note === note) return position;
    position += keyWidthWhite;
    if (key.sharp?.note === note)
      return position - keyWidthWhite / 2 + keyWidthBlack / 2;
  }
  return 0;
}

export function getNoteWidth(note: string): number {
  for (const key of keyMapping) {
    if (key.sharp?.note === note) return keyWidthBlack;
    if (key.note === note) return keyWidthWhite;
  }
  return keyWidthWhite;
}

export function generateColumnOffsets(widths: number[]): number[] {
  const offsets: number[] = [];
  let current = 0;
  for (const w of widths) {
    offsets.push(current);
    current += w;
  }
  return offsets;
}