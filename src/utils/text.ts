/** Fyller i {platshållare} i texter från config, t.ex. fill("Steg {n}", { n: 3 }). */
export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
