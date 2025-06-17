import { useSelector } from "react-redux";
import { selectIsRolling, selectVisualNotes } from "../model/selectors";
import { GridOverlay } from "./NoteGrid";
import { Note } from "./Note";
import { useNoteRollAnimation } from "../lib/useNoteRollAnimation";
import styles from "./NoteRoll.module.scss";

export const NoteRoll = () => {
  // Получаем список визуальных нот из Redux store (active ноты для отрисовки)
  const visualNotes = useSelector(selectVisualNotes);

  // Получаем флаг: запущена ли анимация (идет ли воспроизведение нот)
  const isRolling = useSelector(selectIsRolling);

  // Используем кастомный хук для запуска анимации и получения актуального времени
  const now = useNoteRollAnimation(isRolling, visualNotes);

  return (
    <div className={styles.noteRoll}>
      {/* Отрисовываем сетку поверх нот */}
      <GridOverlay />

      {/* Контейнер для визуальных нот */}
      <div className={styles.notesContainer}>
        {/* Проходим по всем визуальным нотам и отрисовываем их */}
        {visualNotes.map((note) => (
          <Note key={note.id} note={note} now={now} />
        ))}
      </div>
    </div>
  );
};
