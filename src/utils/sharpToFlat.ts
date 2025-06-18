// export const sharpToFlat = (note: string): string => {
//   const sharpToFlatMap: Record<string, string> = {
//     'C#': 'Db',
//     'D#': 'Eb',
//     'F#': 'Gb',
//     'G#': 'Ab',
//     'A#': 'Bb',
//   };

//   // Разделяем ноту и октаву (например, 'C#2' → 'C#' + '2')
//   const match = note.match(/^([A-G]#)(\d)$/);
//   if (!match) return note;

//   const [, sharpNote, octave] = match;
//   const flatNote = sharpToFlatMap[sharpNote];

//   return flatNote ? `${flatNote}${octave}` : note;
// };