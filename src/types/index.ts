export type KeyMapping = {
  note: string;
  code: string;
  label: string;
  sharp: { note: string; code: string; label: string } | null;
}

export type Instrument = {
  name: string;
  src: string;
}