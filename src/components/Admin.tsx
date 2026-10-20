import { useState } from "react";
import { Settings } from "lucide-react";
import type { ExperienceConfig, ExperienceStep } from "../types";

interface Props { config: ExperienceConfig; steps: ExperienceStep[]; viewIdx: number; onJump: (i: number) => void; onUnlockNext: () => void; onUnlockAll: () => void; onReset: () => void }

/** Dolt adminläge (?admin=true). Alla texter och på/av styrs av config.admin. */
export function AdminPanel({ config, steps, viewIdx, onJump, onUnlockNext, onUnlockAll, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const A = config.admin.texts;
  return (
    <div className="fixed bottom-3 right-3 z-[60] text-sm" style={{ color: "#222" }}>
      {open ? (
        <div className="w-72 space-y-2 rounded-2xl border border-black/20 bg-white p-4 shadow-2xl">
          <p className="font-semibold">{A.title}</p>
          <label className="block">{A.jump}
            <select className="field !min-h-[44px] mt-1" value={viewIdx} onChange={(e) => onJump(Number(e.target.value))}>
              {steps.map((s, i) => <option key={s.id} value={i}>{i + 1}. {s.title}</option>)}
            </select>
          </label>
          <button className="btn w-full !min-h-[44px]" onClick={onUnlockNext}>{A.unlockNext}</button>
          <button className="btn btn-ghost w-full !min-h-[44px]" onClick={onUnlockAll}>{A.unlockAll}</button>
          <button className="btn btn-ghost w-full !min-h-[44px]" onClick={onReset}>{A.reset}</button>
          <button className="btn btn-ghost w-full !min-h-[44px]" onClick={() => setOpen(false)}>{A.close}</button>
        </div>
      ) : (
        <button className="btn !min-h-[44px] opacity-80" aria-label={A.open} onClick={() => setOpen(true)}><Settings className="inline h-4 w-4" /></button>
      )}
    </div>
  );
}
