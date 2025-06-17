import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeOldNotes, stopRoll } from "../model/noteRollSlice";
import type { VisualNote } from "../model/types";

/**
 * Хук useNoteRollAnimation управляет анимацией нот на пианоролле.
 * 
 * Основная идея:
 * - Запускается requestAnimationFrame для плавной анимации.
 * - На каждом кадре обновляется текущее время (now), чтобы компоненты могли его использовать
 *   для пересчёта положения и размера нот.
 * - Также на каждом кадре вызывается removeOldNotes, чтобы удалять ноты, которые вышли за пределы экрана.
 * - Если ноты закончились — автоматически останавливает анимацию через stopRoll.
 * 
 * @param isRolling - Флаг из Redux: сейчас идёт анимация или нет
 * @param visualNotes - Список визуальных нот (из Redux)
 * @returns now — текущее время (performance.now()), обновляемое каждый кадр
 */
export const useNoteRollAnimation = (
  isRolling: boolean,
  visualNotes: VisualNote[]
): number => {
  const dispatch = useDispatch();

  // Храним ID активного requestAnimationFrame
  const animationRef = useRef<number | null>(null);

  // Локальное состояние — текущее время (нужно для анимации и обновления компонентов)
  const [now, setNow] = useState<number>(performance.now());

  /**
   * Основная функция анимации — вызывается каждый кадр через requestAnimationFrame.
   * Обновляет текущее время и удаляет устаревшие ноты.
   */
  const animate = () => {
    const newNow = performance.now(); // Получаем точное текущее время
    setNow(newNow);                   // Обновляем состояние — триггерим перерендер компонента
    dispatch(removeOldNotes(newNow)); // Очищаем устаревшие ноты из Redux
    animationRef.current = requestAnimationFrame(animate); // Запрашиваем следующий кадр
  };

  /**
   * Управление запуском и остановкой анимации.
   * Срабатывает каждый раз при изменении isRolling или visualNotes.
   */
  useEffect(() => {
    // Если нужно запустить анимацию (и она ещё не запущена)
    if (isRolling && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }

    // Если нужно остановить анимацию
    if (!isRolling && animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Дополнительная логика: если нот больше нет, а анимация всё ещё идёт — останавливаем её
    if (visualNotes.length === 0 && isRolling) {
      dispatch(stopRoll());
    }

    // Очистка при размонтировании компонента или изменении зависимостей
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRolling, visualNotes]);

  // Возвращаем текущее время, чтобы его мог использовать компонент NoteRoll
  return now;
};
