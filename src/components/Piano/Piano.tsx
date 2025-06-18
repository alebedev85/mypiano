import { useSelector } from "react-redux";
import { usePianoControls } from "../../hooks/usePianoControls";
import { createMouseHandlers } from "../../utils/createMouseHandlers";
import { keyMapping } from "../../constants/keyMappings";
import Key from "../Key/Key";
import styles from "./Piano.module.scss";
import type { RootState } from "../../store";

const Piano = () => {
  const { activeNotes, isMouseDownRef, dispatch } = usePianoControls();
  const {currentInstrument} = useSelector((state: RootState) => state.piano);

  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ note, label, sharp }) => {
        const whiteHandlers = createMouseHandlers(note, currentInstrument, isMouseDownRef, dispatch);

        return (
          <div key={note} className={styles.keyWrapper}>
            <Key
              note={note}
              keyChar={label}
              isSharp={false}
              active={activeNotes.includes(note)}
              {...whiteHandlers}
            />
            {sharp && (
              <Key
                note={sharp.note}
                keyChar={sharp.label}
                isSharp={true}
                active={activeNotes.includes(sharp.note)}
                {...createMouseHandlers(sharp.note, currentInstrument, isMouseDownRef, dispatch)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Piano;
