import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { removeOldNotes, stopRoll } from "../store/noteRollSlice";
import { keyMapping } from "../utils/keyMappings";
import styles from "./NoteRoll.module.scss";

const pxPerSecond = 100; // Скорость движения нот (пикселей в секунду)
const keyWidthWhite = 60; // Ширина белой клавиши пианино (в пикселях)
const keyWidthBlack = 40; // Ширина черной клавиши пианино (в пикселях)

const NoteRoll = () => {
  const dispatch = useDispatch();

  // Хук для хранения id текущего requestAnimationFrame
  const animationRef = useRef<number | null>(null);

  // Локальный стейт для текущего времени в миллисекундах,
  // чтобы триггерить перерендер компонента для анимации нот
  const [now, setNow] = useState<number>(performance.now());

  // Получаем из Redux текущие визуальные ноты
  const visualNotes = useSelector((state: RootState) => state.noteRoll.notes);

  // Получаем состояние "идёт ли анимация"
  const isRolling = useSelector((state: RootState) => state.noteRoll.isRolling);

  // Основная функция анимации — вызывается в цикле requestAnimationFrame
  const animate = () => {
    const newNow = performance.now(); // Получаем текущее время с высокой точностью
    setNow(newNow);                   // Обновляем локальный стейт, чтобы React перерисовал компонент

    // Удаляем старые ноты из Redux — передаём текущее время
    dispatch(removeOldNotes(newNow));

    // Запрашиваем следующий кадр анимации
    animationRef.current = requestAnimationFrame(animate);
  };

  // Хук для управления запуском и остановкой анимации
  useEffect(() => {
    // Если анимация должна идти и она ещё не запущена — запускаем
    if (isRolling && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }

    // Если анимация должна остановиться — отменяем requestAnimationFrame
    if (!isRolling && animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Если нот нет, но анимация всё ещё считается "идущей" — останавливаем анимацию
    if (visualNotes.length === 0 && isRolling) {
      dispatch(stopRoll());
    }

    // Очистка при размонтировании компонента
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRolling, visualNotes]);

  return (
    <div className={styles.noteRoll}>
      {/* Сетка с горизонтальными и вертикальными линиями */}
      <div className={styles.gridOverlay}>
        {[...Array(5)].map((_, i) => {
          const top = i * 100;
          const label = 5 - i;
          return (
            <div
              key={`row-${i}`}
              className={styles.horizontalLine}
              style={{ top }}
            >
              <span className={styles.timeLabel}>{label}s</span>
            </div>
          );
        })}

        {/* Вертикальные линии с рассчитанными позициями */}
        {generateColumnOffsets([180, 240, 180, 240, 180, 240, 180]).map(
          (left, i) => (
            <div
              key={`col-${i}`}
              className={styles.verticalLine}
              style={{ left }}
            />
          )
        )}
      </div>

      {/* Контейнер с нотами — они двигаются вверх с помощью изменения bottom */}
      <div className={styles.notesContainer}>
        {visualNotes.map((note) => {
          // Вычисляем, насколько нота поднялась вверх (в пикселях)
          // Текущее смещение от нижнего края определяется разницей текущего времени и времени начала ноты
          const startOffset =
            ((now - note.startTime) / 1000) * pxPerSecond;

          // Аналогично вычисляем конец ноты (если есть)
          const endOffset = note.endTime
            ? ((now - note.endTime) / 1000) * pxPerSecond
            : startOffset - 20; // Если нет endTime, ставим высоту по умолчанию

          // Высота ноты — разница между позицией начала и конца
          const height = startOffset - endOffset;

          // Вычисляем горизонтальное смещение в зависимости от клавиши
          const left = getNoteX(note.note);

          return (
            <div
              key={note.id}
              className={styles.note}
              style={{
                bottom: startOffset,  // Смещаем ноту вверх со временем
                left,
                width: getNoteWidth(note.note),
                height,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NoteRoll;

// --- Утилиты для вычисления позиции и размера нот

// Вычисляет смещение слева для ноты в зависимости от раскладки клавиатуры
function getNoteX(note: string): number {
  let position = 0;
  for (const key of keyMapping) {
    if (key.note === note) return position;
    position += keyWidthWhite;
    if (key.sharp?.note === note)
      return position - keyWidthWhite / 2 + keyWidthBlack / 2;
  }
  return 0;
}

// Возвращает ширину ноты: 40px для чёрных клавиш, 60px для белых
function getNoteWidth(note: string): number {
  for (const key of keyMapping) {
    if (key.sharp?.note === note) return keyWidthBlack;
    if (key.note === note) return keyWidthWhite;
  }
  return keyWidthWhite;
}

// Генерирует массив горизонтальных смещений колонок для сетки
function generateColumnOffsets(widths: number[]): number[] {
  const offsets: number[] = [];
  let current = 0;
  for (const w of widths) {
    offsets.push(current);
    current += w;
  }
  return offsets;
}
