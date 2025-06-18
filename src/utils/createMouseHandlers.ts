// src/utils/createMouseHandlers.ts

import type { AppDispatch } from "../store";
import type { Instrument } from "../types";
import { startNote, stopNoteLogic, stopAllNoteLogic } from "./noteHandlers";

/**
 * Фабрика обработчиков событий мыши для одной клавиши пианино.
 * 
 * Позволяет:
 * - Начинать воспроизведение при нажатии (mousedown)
 * - Поддерживать drag-over: при перемещении мыши с зажатой кнопкой активировать новые клавиши (mouseenter)
 * - Останавливать воспроизведение при отпускании (mouseup)
 * - Останавливать при уходе мыши с зажатой кнопкой (mouseleave)
 * 
 * @param note - Нота, к которой относится клавиша (например: "C4")
 * @param instrument - Текущий выбранный инструмент
 * @param isMouseDownRef - ref, отслеживающий зажата ли кнопка мыши (используется для drag-over)
 * @param dispatch - Redux dispatch
 * @returns Объект с обработчиками событий
 */
export const createMouseHandlers = (
  note: string,
  instrument: Instrument,
  isMouseDownRef: React.MutableRefObject<boolean>,
  dispatch: AppDispatch
) => ({

  /**
   * Пользователь нажал мышкой на клавишу
   * Начинаем воспроизведение ноты
   */
  onMouseDown: () => {
    isMouseDownRef.current = true;
    startNote(note, instrument, dispatch);
  },

  /**
   * Пользователь двигает мышь по клавишам с зажатой кнопкой.
   * Если клавиша ещё не была активна — активируем её.
   */
  onMouseEnter: () => {
    if (isMouseDownRef.current) {
      startNote(note, instrument, dispatch);
    }
  },

  /**
   * Пользователь отпустил кнопку мыши на этой клавише.
   * Останавливаем воспроизведение и визуализацию.
   * Важно: используем полную остановку всех нот (гарантируем, что не останется "зависших" звуков)
   */
  onMouseUp: () => {
    stopAllNoteLogic(note, instrument, dispatch);
  },

  /**
   * Пользователь ушёл с клавиши во время зажатой кнопки мыши (drag + leave)
   * Останавливаем только конкретную ноту, не все.
   */
  onMouseLeave: () => {
    if (isMouseDownRef.current) {
      stopNoteLogic(note, instrument, dispatch);
    }
  },
});
