import { useEffect, useState } from "react";
import { keyMapping } from "../../utils/keyMappings";
import Key from "../Key/Key";
import styles from "./Piano.module.scss";

interface PianoProps {
  octave: number;
}

const Piano = ({ octave }: PianoProps) => {
  const [activeNotes, setActiveNotes] = useState<string[]>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const code = event.code;

    // Проверка обычных клавиш
    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote && !activeNotes.includes(normalNote.note)) {
      setActiveNotes((prev) => [...prev, normalNote.note]);
      event.preventDefault();
      return;
    }

    // Проверка диезов
    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp && !activeNotes.includes(sharpNote.sharp.note)) {
      setActiveNotes((prev) => [...prev, sharpNote.sharp!.note]);
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const code = event.code;

    // Обычная нота
    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote) {
      setActiveNotes((prev) => prev.filter((n) => n !== normalNote.note));
      event.preventDefault();
      return;
    }

    // Диез
    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp) {
      setActiveNotes((prev) => prev.filter((n) => n !== sharpNote.sharp!.note));
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // навешиваем только один раз

  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ note, label, sharp }) => (
        <div key={note} className={styles.keyWrapper}>
          <Key
            note={note}
            keyChar={label}
            octave={octave}
            isSharp={false}
            active={activeNotes.includes(note)}
            onMouseDown={() =>
              setActiveNotes((prev) =>
                prev.includes(note) ? prev : [...prev, note]
              )
            }
            onMouseUp={() =>
              setActiveNotes((prev) => prev.filter((n) => n !== note))
            }
          />
          {sharp && (
            <Key
              note={sharp.note}
              keyChar={sharp.label}
              octave={octave}
              isSharp={true}
              active={activeNotes.includes(sharp.note)}
              onMouseDown={() =>
                setActiveNotes((prev) =>
                  prev.includes(sharp.note) ? prev : [...prev, sharp.note]
                )
              }
              onMouseUp={() =>
                setActiveNotes((prev) =>
                  prev.filter((n) => n !== sharp.note)
                )
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Piano;
