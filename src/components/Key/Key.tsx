import styles from "./Key.module.scss";

interface KeyProps {
  note: string;
  keyChar: string;
  octave: number;
  isSharp: boolean;
  active?: boolean; // новый пропс для подсветки
  onMouseDown?: () => void; // прокидываем обработчики мыши
  onMouseUp?: () => void;
}

const Key = ({
  note,
  keyChar,
  octave,
  isSharp,
  active = false,
  onMouseDown,
  onMouseUp,
}: KeyProps) => {
  const handleClick = () => {
    const audio = new Audio(`/assets/sounds/${note}${octave}.mp3`);
    audio.play();
  };

  return (
    <div
      className={`${styles.key} ${isSharp ? styles.sharp : styles.natural} ${
        active ? styles.active : ""
      }`}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
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
