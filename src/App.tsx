import { useState } from "react";
import Piano from "./components/Piano/Piano";
import OctaveSelector from "./components/OctaveSelector/OctaveSelector";
import styles from "./App.module.scss";

const App = () => {
  const [octave, setOctave] = useState(4); // Значение по умолчанию — 4 октава

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎹Виртуальное пианино</h1>
      <OctaveSelector currentOctave={octave} onChange={setOctave} />
      <div className={styles.pianoContainer}>
        <Piano octave={octave} />
      </div>
    </div>
  );
};

export default App;
