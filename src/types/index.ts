export interface KeyMapping {
  note: string;
  code: string;
  label: string;
  sharp: { note: string; code: string; label: string } | null;
}