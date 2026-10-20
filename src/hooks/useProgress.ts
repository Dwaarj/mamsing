import { useEffect, useState } from "react";
import { experienceConfig } from "../config/experienceConfig";
const KEY = experienceConfig.meta.storageKey;
export interface Progress { started: boolean; solved: string[]; hints: string[]; played: string[]; finished: boolean; viewId: string | null }
const empty: Progress = { started: false, solved: [], hints: [], played: [], finished: false, viewId: null };
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
function load(): Progress {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!r || typeof r !== "object") return empty;
    return { started: !!r.started, solved: strs(r.solved), hints: strs(r.hints), played: strs(r.played), finished: !!r.finished, viewId: typeof r.viewId === "string" ? r.viewId : null };
  } catch { return empty; }
}
export function useProgress() {
  const [p, setP] = useState<Progress>(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignoreras */ } }, [p]);
  const update = (f: (p: Progress) => Progress) => setP(f);
  const reset = () => { try { localStorage.removeItem(KEY); } catch { /* */ } setP(empty); };
  return { p, update, reset };
}
