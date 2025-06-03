import Piano from "./components/Piano/Piano";
import InstrumentSelector from "./components/InstrumentSelector/InstrumentSelector";
import styles from "./App.module.scss";

const App = () => {

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎹Виртуальное пианино</h1>
      <InstrumentSelector/>
      <div className={styles.pianoContainer}>
        <Piano />
      </div>
    </div>
  );
};

export default App;
