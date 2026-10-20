import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { experienceConfig as config } from "./config/experienceConfig";
import { useProgress } from "./hooks/useProgress";
import { FinaleScreen, MemoryGallery, MenuIcon, ProgressIndicator, ResetExperienceDialog, StepNavigation, WelcomeScreen } from "./components/Screens";
import { AdminPanel } from "./components/Admin";
import { StepScreen } from "./components/StepScreen";

export default function App() {
  const { p, update, reset } = useProgress();
  const [overlay, setOverlay] = useState<"none" | "nav" | "reset" | "gallery">("none");
  // Aktiva steg i rätt ordning – nya/borttagna/inaktiverade steg hanteras automatiskt
  const steps = useMemo(() => config.steps.filter((s) => s.enabled).sort((a, b) => a.order - b.order), []);
  const firstUnsolved = steps.findIndex((s) => !p.solved.includes(s.id));
  const allDone = steps.length > 0 && firstUnsolved === -1;
  const unlockedIdx = allDone ? steps.length - 1 : Math.max(firstUnsolved, 0);
  const found = steps.findIndex((s) => s.id === p.viewId);
  const viewIdx = found >= 0 && found <= unlockedIdx ? found : unlockedIdx; // låsta steg kan inte öppnas
  const step = steps[viewIdx];
  const t = config.theme;
  const dark = !!step && step.variant === "dark" && p.started && !(p.finished && allDone);
  const vars = { "--primary": t.primary, "--secondary": t.secondary, "--accent": t.accent, "--bg": dark ? t.dark.background : t.background, "--card": dark ? t.dark.card : t.card, "--text": dark ? t.dark.text : t.text } as React.CSSProperties;
  const go = (i: number) => update((s) => ({ ...s, viewId: steps[i]?.id ?? null, finished: false }));
  useEffect(() => { document.title = config.meta.pageTitle; }, []);
  const A = config.admin;
  const isAdmin = A.enabled && new URLSearchParams(window.location.search).get(A.param) === A.value;
  const ids = steps.map((s) => s.id);
  const uniq = (a: string[]) => [...new Set(a)];
  const adminEl = isAdmin ? (
    <AdminPanel config={config} steps={steps} viewIdx={viewIdx}
      // Hoppa: lås upp alla steg före målet och öppna det
      onJump={(i) => { setOverlay("none"); update((s) => ({ ...s, started: true, finished: false, solved: uniq([...s.solved, ...ids.slice(0, i)]), viewId: ids[i] })); }}
      // Lås upp nästa: markera aktuellt olöst steg som löst och gå vidare
      onUnlockNext={() => { setOverlay("none"); update((s) => { const cur = ids.find((id) => !s.solved.includes(id)); if (!cur) return { ...s, started: true, finished: true }; const nxt = ids[ids.indexOf(cur) + 1]; return { ...s, started: true, solved: [...s.solved, cur], viewId: nxt ?? cur, finished: !nxt }; }); }}
      onUnlockAll={() => { setOverlay("none"); update((s) => ({ ...s, started: true, solved: ids, finished: true })); }}
      onReset={() => { reset(); setOverlay("none"); }} />
  ) : null;
  const showFinale = p.finished && allDone;

  if (!p.started) return <div style={vars}><WelcomeScreen config={config} onStart={() => update((s) => ({ ...s, started: true }))} />{adminEl}</div>;

  let body;
  if (!step) body = <p className="p-6">{config.ui.noSteps}</p>;
  else if (overlay === "gallery") body = <MemoryGallery key="g" config={config} onClose={() => setOverlay("none")} />;
  else if (showFinale) body = <FinaleScreen key="f" config={config} onBack={() => setOverlay("reset")} onGallery={() => setOverlay("gallery")} onReview={() => update((s) => ({ ...s, finished: false, viewId: steps[0].id }))} />;
  else body = (
    <StepScreen key={step.id} step={step} config={config} solved={p.solved.includes(step.id)} hintShown={p.hints.includes(step.id)} isLast={viewIdx === steps.length - 1}
      onHint={() => update((s) => ({ ...s, hints: [...s.hints, step.id] }))}
      onSolved={() => update((s) => ({ ...s, solved: s.solved.includes(step.id) ? s.solved : [...s.solved, step.id] }))}
      onPlayed={() => update((s) => ({ ...s, played: s.played.includes(step.id) ? s.played : [...s.played, step.id] }))}
      onNext={() => (viewIdx === steps.length - 1 ? update((s) => ({ ...s, finished: true })) : go(viewIdx + 1))} />
  );

  return (
    <div style={vars} className="min-h-screen">
      <div className="mx-auto max-w-xl space-y-5 px-4 pb-16 pt-4">
        <nav className="flex items-center justify-between" aria-label={config.ui.menuAria}>
          <button className="btn btn-ghost !min-h-[44px]" onClick={() => setOverlay("nav")} aria-label={config.texts.overview}><MenuIcon className="h-5 w-5" /></button>
          <button className="btn btn-ghost !min-h-[44px] text-sm" onClick={() => setOverlay("reset")}><RotateCcw className="mr-1 inline h-4 w-4" />{config.texts.restart}</button>
        </nav>
        {!showFinale && overlay !== "gallery" && steps.length > 0 && <ProgressIndicator index={viewIdx + 1} total={steps.length} />}
        <AnimatePresence mode="wait">{body}</AnimatePresence>
      </div>
      {adminEl}
      {overlay === "nav" && <StepNavigation steps={steps} solved={p.solved} unlockedIdx={unlockedIdx} viewIdx={viewIdx} config={config} onGo={go} onClose={() => setOverlay("none")} />}
      {overlay === "reset" && <ResetExperienceDialog config={config} onCancel={() => setOverlay("none")} onConfirm={() => { reset(); setOverlay("none"); }} />}
    </div>
  );
}
