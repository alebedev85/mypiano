import styles from "./OctaveSelector.module.scss";

interface Props {
  currentOctave: number;
  onChange: (octave: number) => void;
}

const OctaveSelector = ({ currentOctave, onChange }: Props) => {
  const handlePrev = () => onChange(currentOctave - 1);
  const handleNext = () => onChange(currentOctave + 1);

  return (
    <div className={styles.octaveSelector}>
      <button onClick={handlePrev} disabled={currentOctave <= 2}>
        -
      </button>
      <span>Октава: {currentOctave}</span>
      <button onClick={handleNext} disabled={currentOctave >= 6}>
        +
      </button>
    </div>
  );
};

export default OctaveSelector;
