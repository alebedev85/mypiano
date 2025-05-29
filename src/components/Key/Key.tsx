import styles from "./Key.module.scss";

interface KeyProps {
  note: string;
  keyChar: string;
  octave: number;
  isSharp: boolean;
}

const Key = ({ note, keyChar, octave, isSharp }: KeyProps) => {
  const handleClick = () => {
    const audio = new Audio(`/assets/sounds/${note}${octave}.mp3`);
    audio.play();
  };

  return (
    <div
      className={`${styles.key} ${isSharp ? styles.sharp : styles.natural}`}
      onClick={handleClick}
    >
      <span className={styles.label}>
        <p className={styles.not}>{note.toUpperCase()}</p>
        <p className={styles.keyChar}>{keyChar}</p>
        </span>
    </div>
  );
};

export default Key;
