import styles from "./Key.module.scss";

interface KeyProps {
  note: string;
  keyChar: string;
  isSharp: boolean;
  active?: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseEnter?: () => void;
}

const Key = ({
  note,
  keyChar,
  isSharp,
  active = false,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}: KeyProps) => {

  return (
    <div
      className={`${styles.key} ${isSharp ? styles.sharp : styles.natural} ${
        active ? styles.active : ""
      }`}
      // При нажатии мыши вызываем коллбэк onMouseDown (если передан)
      // и сразу воспроизводим звук
      onMouseDown={() => {
        onMouseDown?.();
      }}
      // При отпускании мыши вызываем коллбэк onMouseUp (если есть)
      onMouseUp={onMouseUp}
      // При наведении мыши вызываем коллбэк onMouseEnter (если есть)
      onMouseEnter={() => {
        onMouseEnter?.();
        // Обычно не воспроизводим звук здесь, чтобы избежать лишних срабатываний
      }}

      // При касании пальцем — воспроизводим ноту
      onTouchStart={(e) => {
        e.preventDefault(); // предотвращаем залипание/прокрутку при свайпах
        onMouseDown?.();
      }}

      // При отпускании пальца — останавливаем ноту
      onTouchEnd={(e) => {
        e.preventDefault();
        onMouseUp?.();
      }}
      
      // Атрибуты для доступности: кнопка и возможность фокусировки
      role="button"
      tabIndex={0}
      
      // Обрабатываем клавиши Enter и пробел для воспроизведения звука с клавиатуры
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // предотвращаем скролл страницы при пробеле
        }
      }}
    >
      <span className={styles.label}>
        {/* Отображаем название ноты заглавными буквами */}
        <p className={styles.not}>{note.toUpperCase()}</p>
        {/* Отображаем символ клавиши, который соответствует клавиатуре */}
        <p className={styles.keyChar}>{keyChar}</p>
      </span>
    </div>
  );
};

export default Key;
