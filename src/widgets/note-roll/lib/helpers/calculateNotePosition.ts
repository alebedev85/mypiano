import { pxPerSecond } from "../../config/constants";

/**
 * Рассчитывает высоту ноты в пикселях.
 * 
 * @param startTime - время начала ноты (ms)
 * @param endTime - время конца ноты (ms), если уже завершена
 * @param now - текущее время (ms)
 * @returns высота в px
 */
export function calculateNoteHeight(startTime: number, endTime: number | null, now: number): number {
  const effectiveEndTime = endTime ?? now; // Если нота ещё звучит, берем now
  return ((effectiveEndTime - startTime) / 1000) * pxPerSecond;
}

/**
 * Рассчитывает вертикальное смещение (анимация подъема после завершения)
 * 
 * @param endTime - время конца ноты (ms), если есть
 * @param now - текущее время (ms)
 * @returns смещение в px
 */
export function calculateTranslateY(endTime: number | null, now: number): number {
  if (!endTime) return 0;
  return ((now - endTime) / 1000) * pxPerSecond;
}
