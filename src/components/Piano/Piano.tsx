import { useEffect, useRef, useState } from "react";
import { keyMapping } from "../../utils/keyMappings";
import { playNote } from "../../utils/soundManager";
import Key from "../Key/Key";
import styles from "./Piano.module.scss";

const Piano = () => {
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const activeNotesRef = useRef<string[]>([]);

  useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

  const addNote = (note: string) => {
    // console.log(note);
    if (!activeNotesRef.current.includes(note)) {
      setActiveNotes((prev) => [...prev, note]);
      playNote(note);
    }
  };

  const removeNote = (note: string) => {
    setActiveNotes((prev) => prev.filter((n) => n !== note));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const code = event.code;

    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote) {
      addNote(normalNote.note);
      event.preventDefault();
      return;
    }

    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp) {
      addNote(sharpNote.sharp.note);
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const code = event.code;

    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote) {
      removeNote(normalNote.note);
      event.preventDefault();
      return;
    }

    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp) {
      removeNote(sharpNote.sharp.note);
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
  }, []);

  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ note, label, sharp }) => (
        <div key={note} className={styles.keyWrapper}>
          <Key
            note={note}
            keyChar={label}
            isSharp={false}
            active={activeNotes.includes(note)}
            onMouseDown={() => addNote(note)}
            onMouseUp={() => removeNote(note)}
          />
          {sharp && (
            <Key
              note={sharp.note}
              keyChar={sharp.label}
              isSharp={true}
              active={activeNotes.includes(sharp.note)}
              onMouseDown={() => addNote(sharp.note)}
              onMouseUp={() => removeNote(sharp.note)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Piano;
