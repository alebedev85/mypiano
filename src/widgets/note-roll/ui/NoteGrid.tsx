import { generateColumnOffsets } from "../lib/utils";
import styles from "./NoteRoll.module.scss";

export const GridOverlay = () => {
  return (
    <div className={styles.gridOverlay}>
      {[...Array(5)].map((_, i) => {
        const top = i * 100;
        const label = 5 - i;
        return (
          <div
            key={`row-${i}`}
            className={styles.horizontalLine}
            style={{ top }}
          >
            <span className={styles.timeLabel}>{label}s</span>
          </div>
        );
      })}

      {generateColumnOffsets([180, 240, 180, 240, 180, 240, 180]).map(
        (left, i) => (
          <div
            key={`col-${i}`}
            className={styles.verticalLine}
            style={{ left }}
          />
        )
      )}
    </div>
  );
};
