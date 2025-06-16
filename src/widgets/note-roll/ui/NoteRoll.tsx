import { useSelector } from "react-redux";
import { selectIsRolling, selectVisualNotes } from "../model/selectors";
import { GridOverlay } from "./NoteGrid";
import { Note } from "./Note";
import { useNoteRollAnimation } from "../lib/useNoteRollAnimation";
import styles from "./NoteRoll.module.scss";

export const NoteRoll = () => {
  const visualNotes = useSelector(selectVisualNotes);
  const isRolling = useSelector(selectIsRolling);
  const now = useNoteRollAnimation(isRolling, visualNotes);

  return (
    <div className={styles.noteRoll}>
      <GridOverlay />
      <div className={styles.notesContainer}>
        {visualNotes.map((note) => (
          <Note key={note.id} note={note} now={now} />
        ))}
      </div>
    </div>
  );
};
