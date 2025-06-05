import { useEffect, useState } from "react";
import * as Tone from "tone";
import styles from "./App.module.scss";
import InstrumentSelector from "./components/InstrumentSelector/InstrumentSelector";
import Piano from "./components/Piano/Piano";
import { loadAllSamplers } from "./utils/soundManager";

const App = () => {
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

  if (!isReady) {
    return (
      <div className={styles.app}>
        <h1 className={styles.title}>🎹Виртуальное пианино</h1>
        <p className={styles.loading}>
          Нажмите в любом месте, чтобы загрузить звуки...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎹Виртуальное пианино</h1>
      <InstrumentSelector />
      <div className={styles.pianoContainer}>
        <Piano />
      </div>
    </div>
  );
};

export default App;
