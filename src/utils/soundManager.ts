import { Howl } from "howler";
import { sharpToFlat } from "./keyMappings";

const soundCache = new Map<string, Howl>();

export const playNote = (note: string) => {
  if (!note) return;

  const flatNote = sharpToFlat(note);
  
  if (!soundCache.has(flatNote)) {
    const sound = new Howl({
      src: [`/sounds/${flatNote}.mp3`],
      volume: 1.0,
    });
    soundCache.set(flatNote, sound);
  }
  
  soundCache.get(flatNote)!.play();
};
