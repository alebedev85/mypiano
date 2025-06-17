import type { VisualNote } from "../model/types";
import { getNoteX, getNoteWidth } from "../lib/utils";
import { calculateNoteHeight, calculateTranslateY } from "../lib/helpers/calculateNotePosition";
import styles from "./NoteRoll.module.scss";

type Props = {
  note: VisualNote;
  now: number;
};

/**
 * Компонент отрисовки одной ноты на Roll.
 */
export const Note = ({ note, now }: Props) => {
  const height = calculateNoteHeight(note.startTime, note.endTime ?? null, now);
  const translateY = calculateTranslateY(note.endTime ?? null, now);

  return (
    <div
      className={styles.note}
      style={{
        position: "absolute",
        bottom: 0,
        left: getNoteX(note.note),
        width: getNoteWidth(note.note),
        height,
        transform: `translateY(-${translateY}px)`,
      }}
    />
  );
};
