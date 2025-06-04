import { Howl } from "howler";
import { sharpToFlat } from "./keyMappings";

// Кэш звуков по инструменту и ноте
const soundCache = new Map<string, Howl>();

export const playNote = (note: string, instrument: string) => {
  if (!note) return;

  console.log(note, instrument);

  const flatNote = sharpToFlat(note);
  const cacheKey = `${instrument}/${flatNote}`;
    console.log('cacheKey: ',cacheKey);


  // Если звука нет в кэше — создаём и добавляем
  if (!soundCache.has(cacheKey)) {
    console.log('Howl');

    const sound = new Howl({
      src: [`sounds/${instrument}/${flatNote}.mp3`],
      volume: 1.0,
    });
    soundCache.set(cacheKey, sound);
  }

  // Воспроизводим звук (даже если он уже проигрывается)
  const sound = soundCache.get(cacheKey)!;
  sound.play();
};
