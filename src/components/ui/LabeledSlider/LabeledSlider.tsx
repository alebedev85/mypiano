import styles from "./LabeledSlider.module.scss";

type Props = {
  label: string;
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

const LabeledSlider = ({ label, id, min, max, step = 1, value, onChange }: Props) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className={styles.sliderContainer}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
};

export default LabeledSlider;
