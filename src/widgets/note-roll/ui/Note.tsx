import type { VisualNote } from "../model/types";
import { getNoteX, getNoteWidth } from "../lib/utils.ts";
import styles from "./NoteRoll.module.scss";

const pxPerSecond = 100;

type Props = {
  note: VisualNote;
  now: number;
};

export const Note = ({ note, now }: Props) => {
  if (!note.endTime) {
    const height = ((now - note.startTime) / 1000) * pxPerSecond;
    return (
      <div
        className={styles.note}
        style={{
          position: "absolute",
          bottom: 0,
          left: getNoteX(note.note),
          width: getNoteWidth(note.note),
          height,
          transform: "translateY(0)",
        }}
      />
    );
  } else {
    const height = ((note.endTime - note.startTime) / 1000) * pxPerSecond;
    const elapsed = (now - note.endTime) / 1000;
    return (
      <div
        className={styles.note}
        style={{
          position: "absolute",
          bottom: 0,
          left: getNoteX(note.note),
          width: getNoteWidth(note.note),
          height,
          transform: `translateY(-${elapsed * pxPerSecond}px)`,
        }}
      />
    );
  }
};
