import { useState } from "react";
import { instruments } from "../../utils/instruments";
import styles from "./InstrumentSelector.module.scss";

// interface InstrumentSelectorProps {
//   currentInstrument: string;
//   onChange: (instrument: string) => void;
// }

const InstrumentSelector = (
//   {
//   currentInstrument,
//   onChange,
// }: InstrumentSelectorProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentInstrument = "grand_piano";

  // const handleSelect = (instrument: string) => {
  //   onChange(instrument);
  //   setIsOpen(false);
  // };

  return (
    <div className={styles.selector}>
      <button
        className={styles.selectorButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        🎵 {currentInstrument.replace("_", " ")}
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {instruments.map((inst) => (
            <li
              key={inst}
              className={
                inst === currentInstrument ? styles.active : styles.option
              }
              // onClick={() => handleSelect(inst)}
            >
              {inst.replace("_", " ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstrumentSelector;
