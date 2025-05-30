import { playNote } from "../../utils/soundManager";
import styles from "./Key.module.scss";

interface KeyProps {
  note: string;
  keyChar: string;
  isSharp: boolean;
  active?: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

const Key = ({
  note,
  keyChar,
  isSharp,
  active = false,
  onMouseDown,
  onMouseUp,
}: KeyProps) => {
  const handlePlay = () => {
    playNote(note);
  };

  return (
    <div
      className={`${styles.key} ${isSharp ? styles.sharp : styles.natural} ${
        active ? styles.active : ""
      }`}
      onClick={handlePlay}
      onMouseDown={() => {
        onMouseDown?.();
        handlePlay();
      }}
      onMouseUp={onMouseUp}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handlePlay();
          e.preventDefault();
        }
      }}
    >
      <span className={styles.label}>
        <p className={styles.not}>{note.toUpperCase()}</p>
        <p className={styles.keyChar}>{keyChar}</p>
      </span>
    </div>
  );
};

export default Key;
