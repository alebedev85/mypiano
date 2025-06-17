import { generateColumnOffsets } from "../lib/utils";
import { columnOffsets } from "../config/constants";
import { numberOgHorizontalLines, pxPerSecond } from "../config/constants";
import styles from "./NoteRoll.module.scss";

/**
 * GridOverlay — компонент, который отрисовывает сетку в NoteRoll:
 * - горизонтальные линии — разметка по времени (секунды)
 * - вертикальные линии — разметка по клавишам пианино
 */
export const GridOverlay = () => {
  // Генерируем горизонтальные линии
  const horizontalLines = Array.from({ length: numberOgHorizontalLines }, (_, i) => {
    const top = i * pxPerSecond;
    const label = numberOgHorizontalLines - i;
    return (
      <div key={`row-${i}`} className={styles.horizontalLine} style={{ top }}>
        <span className={styles.timeLabel}>{label}s</span>
      </div>
    );
  });

  // Генерируем вертикальные линии на основе смещений
  const verticalLines = generateColumnOffsets(columnOffsets).map((left, i) => (
    <div key={`col-${i}`} className={styles.verticalLine} style={{ left }} />
  ));

  return (
    <div className={styles.gridOverlay}>
      {horizontalLines}
      {verticalLines}
    </div>
  );
};
