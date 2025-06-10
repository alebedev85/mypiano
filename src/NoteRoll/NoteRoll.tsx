import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import styles from "./NoteRoll.module.scss";

/**
 * Настройки для отображения визуальных нот
 */
const pxPerSecond = 10; // сколько пикселей прокручивается за 1 секунду
const keyWidth = 10; // ширина одной клавиши (и визуальной полоски)

const lineOffsets: number[] = [];
let x = 0;
const pattern = [180, 240, 180];
while (x < 2000) {
  for (let i = 0; i < pattern.length && x < 2000; i++) {
    x += pattern[i];
    lineOffsets.push(x);
  }
}

const NoteRoll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // контейнер со всеми нотами
  const animationRef = useRef<number | null>(null); // ID requestAnimationFrame
  const startTimeRef = useRef(performance.now()); // момент запуска анимации

  // Получаем список визуальных нот из Redux
  const visualNotes = useSelector((state: RootState) => state.noteRoll.notes);

  // Эффект для запуска анимации прокрутки нот вверх
  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000; // прошедшее время в секундах

      if (containerRef.current) {
        // Сдвигаем контейнер вверх на elapsed * pxPerSecond
        containerRef.current.style.transform = `translateY(-${
          elapsed * pxPerSecond
        }px)`;
      }

      animationRef.current = requestAnimationFrame(animate); // след. кадр
    };

    animationRef.current = requestAnimationFrame(animate); // старт анимации

    // Очистка анимации при размонтировании
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.noteRoll}>
      {/* Горизонтальная и вертикальная сетка */}
      <div className={styles.gridOverlay}>
        {[...Array(5)].map((_, i) => {
          const top = i * 100;
          const label = 5 - i; // Счёт снизу вверх: 9s внизу → 0s вверху
          return (
            <div
              key={`row-${i}`}
              className={styles.horizontalLine}
              style={{ top: `${top}px` }}
            >
              <span className={styles.timeLabel}>{label}s</span>
            </div>
          );
        })}
        {/* Вертикальные линии с чередованием: 180, 240, 180, 240... */}
        {generateColumnOffsets([180, 240, 180, 240, 180, 240, 180]).map(
          (left, i) => (
            <div
              key={`col-${i}`}
              className={styles.verticalLine}
              style={{ left: `${left}px` }}
            />
          )
        )}
      </div>

      {/* Контейнер с полосками нот */}
      <div className={styles.notesContainer} ref={containerRef}>
        {visualNotes.map((note) => {
          const startOffset = (note.startTime / 1000) * pxPerSecond;
          const duration = note.endTime
            ? (note.endTime - note.startTime) / 1000
            : 0.2;

          const heightPx = duration * pxPerSecond;
          const noteIndex = noteToIndex(note.note);

          return (
            <div
              key={note.id}
              className={styles.note}
              style={{
                left: noteIndex * keyWidth,
                bottom: startOffset,
                width: keyWidth - 2,
                height: heightPx,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Возвращает массив cumulative left-значений для вертикальных линий
const generateColumnOffsets = (widths: number[]) => {
  const offsets: number[] = [];
  let current = 0;

  for (const w of widths) {
    offsets.push(current);
    current += w;
  }

  return offsets;
};

/**
 * Преобразует ноту (например, "C4") в индекс клавиши,
 * чтобы позиционировать её по горизонтали
 */
function noteToIndex(note: string): number {
  const notesOrder = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const match = note.match(/^([A-G]#?)(\d)$/);

  if (!match) return 0;

  const [, pitch, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);
  const noteIndex = notesOrder.indexOf(pitch);

  return octave * 12 + noteIndex;
}

export default NoteRoll;
