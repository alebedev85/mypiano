import { useState } from "react";
import InstrumentSelector from "../InstrumentSelector/InstrumentSelector";
import LabeledSlider from "../ui/LabeledSlider/LabeledSlider";
import styles from "./PianoControls.module.scss";

const PianoControls = () => {
  const [volume, setVolumeState] = useState(50);
  const [echo, setEchoState] = useState(0);
  return (
    <div className={styles.controls}>
      <InstrumentSelector />
      <LabeledSlider
        label="Громкость"
        id="volume"
        min={0}
        max={100}
        value={volume}
        onChange={(v) => {
          setVolumeState(v);
          // setVolume(v / 100);
        }}
      />
      <LabeledSlider
        label="Эхо"
        id="echo"
        min={0}
        max={1}
        step={0.01}
        value={echo}
        onChange={(v) => {
          setEchoState(v);
          // setEchoLevel(v);
        }}
      />
    </div>
  );
};

export default PianoControls;
