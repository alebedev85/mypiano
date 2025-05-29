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
    const pressedKey = event.key.toLowerCase();

    console.log(pressedKey)

    // Ищем обычную ноту
    const normalNote = keyMapping.find((k) => k.key === pressedKey);
    if (normalNote) {
      if (!activeNotes.includes(normalNote.note)) {
        setActiveNotes((prev) => [...prev, normalNote.note]);
      }
      event.preventDefault();
      console.log(activeNotes)
      return;
    }

    // Ищем диез
    const sharpNote = keyMapping.find((k) => k.sharp?.key === pressedKey);
    if (sharpNote?.sharp?.note) {
      const sharpNoteName = sharpNote.sharp.note;
      if (!activeNotes.includes(sharpNoteName)) {
        setActiveNotes((prev) => [...prev, sharpNoteName]);
      }
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const releasedKey = event.key.toLowerCase();

    // Обычная нота
    const normalNote = keyMapping.find((k) => k.key === releasedKey);
    if (normalNote) {
      setActiveNotes((prev) => prev.filter((n) => n !== normalNote.note));
      event.preventDefault();
      return;
    }

    // Диез
    const sharpNote = keyMapping.find((k) => k.sharp?.key === releasedKey);
    if (sharpNote?.sharp?.note) {
      const sharpNoteName = sharpNote.sharp.note;
      setActiveNotes((prev) => prev.filter((n) => n !== sharpNoteName));
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
  }, [activeNotes]);

  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ key, note, sharp }) => (
        <div key={note} className={styles.keyWrapper}>
          <Key
            note={note}
            keyChar={key}
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
              keyChar={sharp.key}
              octave={octave}
              isSharp={true}
              active={activeNotes.includes(sharp.note)}
              onMouseDown={() =>
                setActiveNotes((prev) =>
                  prev.includes(sharp.note) ? prev : [...prev, sharp.note]
                )
              }
              onMouseUp={() =>
                setActiveNotes((prev) => prev.filter((n) => n !== sharp.note))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Piano;
