import type { Challenge } from "../types";
const norm = (s: string, c: Challenge) => {
  let v = s.normalize("NFC").trim();
  if (c.ignoreCase !== false) v = v.toLocaleLowerCase("sv");
  if (c.ignoreWhitespace !== false) v = v.replace(/\s+/g, "");
  else v = v.replace(/\s+/g, " ");
  if (c.ignoreSwedishDiacritics) v = v.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return v;
};
/** Kontrollerar text-, nummer- och gåtsvar mot acceptedAnswers. */
export const checkTextAnswer = (c: Challenge, input: string) =>
  (c.acceptedAnswers ?? []).some((a) => norm(a, c) === norm(input, c));
export const checkChoice = (c: Challenge, id: string) => !!c.options?.find((o) => o.id === id)?.isCorrect;
export const checkSequence = (c: Challenge, ids: string[]) =>
  !!c.options && ids.length === c.options.length && c.options.every((o, i) => o.id === ids[i]);
export const shuffle = <T,>(a: T[]): T[] => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
