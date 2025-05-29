import Key from "../Key/Key";
import styles from "./Piano.module.scss";
import { keyMapping } from "../../utils/keyMappings";

interface PianoProps {
  octave: number;
}

const Piano = ({ octave }: PianoProps) => {
  return (
    <div className={styles.pianoWrapper}>
      {keyMapping.map(({ key, note, sharp }) => (
        <div key={note} className={styles.keyWrapper}>
          <Key
            note={note}
            keyChar={key}
            octave={octave}
            isSharp={false}
          />
          {sharp && (
            <Key
              note={sharp.note}
              keyChar={sharp.key}
              octave={octave}
              isSharp={true}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Piano;
