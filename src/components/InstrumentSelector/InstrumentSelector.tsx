import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { instruments } from "../../utils/instruments";
import { setInstrument } from "../../store/pianoSlice";
import styles from "./InstrumentSelector.module.scss";
import type { RootState } from "../../store";
import type { Instrument } from "../../types";

const InstrumentSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentInstrument = useSelector((state: RootState) => state.piano.currentInstrument);
  const dispatch = useDispatch();

  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (instrument: Instrument) => {
    dispatch(setInstrument(instrument));
    setIsOpen(false);
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Закрытие по клавише Escape
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.selector} ref={selectorRef}>
      <button
        className={styles.selectorButton}
        onClick={(e) => {
          setIsOpen((prev) => !prev);
          (e.currentTarget as HTMLButtonElement).blur(); // снимаем фокус
        }}
      >
        🎵 {currentInstrument.name}
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {instruments.map((inst: Instrument) => (
            <li
              key={inst.src}
              className={
                inst.name === currentInstrument.name ? styles.active : styles.option
              }
              onClick={() => handleSelect(inst)}
            >
              {inst.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstrumentSelector;
