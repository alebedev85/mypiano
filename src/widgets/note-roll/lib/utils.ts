import { keyMapping } from "../../../constants/keyMappings";
import { keyWidthBlack, keyWidthWhite } from "../config/constants";

/**
 * Вычисляет горизонтальную позицию ноты на пианоролле.
 *
 * Позиция рассчитывается на основе последовательности клавиш в keyMapping.
 * - Белые клавиши увеличивают позицию на keyWidthWhite.
 * - Чёрные клавиши (диезы) располагаются между белыми с корректировкой.
 *
 * @param note - Название ноты (например, "C4" или "C#4")
 * @returns Смещение слева (в пикселях) для данной ноты
 */
export function getNoteX(note: string): number {
  let position = 0;
  for (const key of keyMapping) {
    // Если это белая клавиша — возвращаем текущую позицию
    if (key.note === note) return position;

    // Переходим к следующей белой клавише
    position += keyWidthWhite;

    // Проверяем, есть ли у текущей белой клавиши чёрная (диезная) клавиша
    if (key.sharp?.note === note)
      // Чёрная клавиша располагается между белыми, с небольшим смещением
      return position - keyWidthWhite / 2 + keyWidthBlack / 2;
  }
  // Если нота не найдена — возвращаем 0 (fallback)
  return 0;
}

/**
 * Возвращает ширину ноты в зависимости от её типа.
 *
 * - Для белых клавиш — keyWidthWhite
 * - Для чёрных клавиш — keyWidthBlack
 *
 * @param note - Название ноты
 * @returns Ширина ноты в пикселях
 */
export function getNoteWidth(note: string): number {
  for (const key of keyMapping) {
    if (key.sharp?.note === note) return keyWidthBlack;
    if (key.note === note) return keyWidthWhite;
  }
  // Если нота не найдена — по умолчанию считаем её белой
  return keyWidthWhite;
}

/**
 * Генерирует массив смещений (offsets) для отрисовки вертикальных линий сетки.
 *
 * Используется для построения колонок в GridOverlay.
 *
 * @param widths - Массив ширин колонок (например: ширины клавиш)
 * @returns Массив накопленных смещений (левый край каждой колонки)
 */
export function generateColumnOffsets(widths: number[]): number[] {
  const offsets: number[] = [];
  let current = 0;
  for (const w of widths) {
    offsets.push(current);
    current += w;
  }
  return offsets;
}
