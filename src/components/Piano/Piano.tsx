import { useEffect, useRef, useState } from "react";
import { keyMapping } from "../../utils/keyMappings";
import { playNote } from "../../utils/soundManager";
import Key from "../Key/Key";
import styles from "./Piano.module.scss";

const Piano = () => {
  // Состояние активных нот — те, которые сейчас "нажаты"
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  
  // Реф для актуального состояния activeNotes, чтобы использовать внутри обработчиков событий
  const activeNotesRef = useRef<string[]>([]);
  
  // Реф для отслеживания зажатия кнопки мыши (true, если мышь зажата)
  const isMouseDownRef = useRef(false);

  // Обновляем ref при изменении состояния activeNotes
  useEffect(() => {
    activeNotesRef.current = activeNotes;
  }, [activeNotes]);

  // Добавляет ноту в активные, если её там ещё нет, и воспроизводит звук
  const addNote = (note: string) => {
    if (!activeNotesRef.current.includes(note)) {
      setActiveNotes((prev) => [...prev, note]);
      playNote(note);
    }
  };

  // Убирает ноту из активных
  const removeNote = (note: string) => {
    setActiveNotes((prev) => prev.filter((n) => n !== note));
  };

  // Обработчик нажатия клавиши на клавиатуре
  const handleKeyDown = (event: KeyboardEvent) => {
    const code = event.code;

    // Ищем обычную ноту по коду клавиши
    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote) {
      addNote(normalNote.note);
      event.preventDefault(); // предотвращаем дефолтное поведение браузера
      return;
    }

    // Ищем диез (sharp) по коду клавиши
    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp) {
      addNote(sharpNote.sharp.note);
      event.preventDefault();
    }
  };

  // Обработчик отпускания клавиши на клавиатуре
  const handleKeyUp = (event: KeyboardEvent) => {
    const code = event.code;

    // Убираем обычную ноту из активных
    const normalNote = keyMapping.find((k) => k.code === code);
    if (normalNote) {
      removeNote(normalNote.note);
      event.preventDefault();
      return;
    }

    // Убираем диез (sharp) из активных
    const sharpNote = keyMapping.find((k) => k.sharp?.code === code);
    if (sharpNote?.sharp) {
      removeNote(sharpNote.sharp.note);
      event.preventDefault();
    }
  };

  useEffect(() => {
    // Добавляем слушатели для клавиатурных событий
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Глобальный обработчик отпускания мыши:
    // снимает флаг зажатия мыши и сбрасывает все активные ноты,
    // если мышь была отпущена вне клавиши
    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      setActiveNotes([]); // все ноты отпущены
    };
    window.addEventListener("mouseup", handleMouseUp);

    // Чистим слушатели при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ note, label, sharp }) => (
        <div key={note} className={styles.keyWrapper}>
          {/* Белая клавиша */}
          <Key
            note={note}
            keyChar={label}
            isSharp={false}
            active={activeNotes.includes(note)} // выделение если активна
            onMouseDown={() => {
              isMouseDownRef.current = true; // зажали мышь
              addNote(note); // добавить ноту и проиграть звук
            }}
            onMouseEnter={() => {
              // Если мышь зажата и курсор вошёл на клавишу — тоже добавить ноту (drag over)
              if (isMouseDownRef.current) addNote(note);
            }}
            onMouseUp={() => removeNote(note)} // отпускаем ноту при отпускании мыши
          />
          {/* Чёрная клавиша (диез), если есть */}
          {sharp && (
            <Key
              note={sharp.note}
              keyChar={sharp.label}
              isSharp={true}
              active={activeNotes.includes(sharp.note)}
              onMouseDown={() => {
                isMouseDownRef.current = true;
                addNote(sharp.note);
              }}
              onMouseEnter={() => {
                if (isMouseDownRef.current) addNote(sharp.note);
              }}
              onMouseUp={() => removeNote(sharp.note)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Piano;
