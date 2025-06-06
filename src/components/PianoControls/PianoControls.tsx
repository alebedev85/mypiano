import { useDispatch, useSelector } from "react-redux";
import InstrumentSelector from "../InstrumentSelector/InstrumentSelector";
import LabeledSlider from "../ui/LabeledSlider/LabeledSlider";
import styles from "./PianoControls.module.scss";
import type { RootState } from "../../store";
import { setEcho, setVolume } from "../../store/pianoSlice";

const PianoControls = () => {
  const dispatch = useDispatch();
  const {volume, echo}= useSelector((state: RootState) => state.piano);
  return (
    <div className={styles.controls}>
      <InstrumentSelector />
      <LabeledSlider
        label="Громкость"
        id="volume"
        min={0}
        max={3}
        step={0.1}
        value={volume}
        onChange={(val) => dispatch(setVolume(val))}
      />
      <LabeledSlider
        label="Эхо"
        id="echo"
        min={0}
        max={1}
        step={0.01}
        value={echo}
        onChange={(val) => dispatch(setEcho(val))}
      />
    </div>
  );
};

export default PianoControls;
