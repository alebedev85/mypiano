import styles from "./App.module.scss";
import Piano from "./components/Piano/Piano";
import PianoControls from "./components/PianoControls/PianoControls";
import { useFirstInteraction } from "./hooks/useFirstInteraction";
import { NoteRoll } from "./widgets/note-roll/ui/NoteRoll";

const App = () => {
  const { isReady } = useFirstInteraction();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎹Виртуальное пианино</h1>
      {isReady ? (
        <div className={styles.pianoContainer}>
          <NoteRoll />
          <PianoControls />
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
