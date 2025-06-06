import styles from "./App.module.scss";
import InstrumentSelector from "./components/InstrumentSelector/InstrumentSelector";
import Piano from "./components/Piano/Piano";
import { useFirstInteraction } from "./hooks/useFirstInteraction";

const App = () => {
  const { isReady } = useFirstInteraction();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎹Виртуальное пианино</h1>
      <InstrumentSelector />
      {isReady ? (
        <div className={styles.pianoContainer}>
          <Piano />
        </div>
      ) : (
        <p className={styles.loading}>
          Нажмите в любом месте, чтобы загрузить звуки...
        </p>
      )}
    </div>
  );
};

export default App;
