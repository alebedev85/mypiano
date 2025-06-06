import { useState, useEffect } from "react";
import * as Tone from "tone";
import { loadAllSamplers } from "../utils/soundManager";

export const useFirstInteraction= () => {
  const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      const handleFirstInteraction = async () => {
        await Tone.start(); // Разблокируем аудио после взаимодействия
        await loadAllSamplers(); // Загружаем все семплеры
        setIsReady(true);
        window.removeEventListener("click", handleFirstInteraction);
      };
  
      window.addEventListener("click", handleFirstInteraction);
  
      return () => {
        window.removeEventListener("click", handleFirstInteraction);
      };
    }, []);

    return {isReady}
}