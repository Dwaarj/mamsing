import { useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import type { ExperienceConfig, ExperienceStep } from "../types";
import { fill } from "../utils/text";
import { checkChoice, checkSequence, checkTextAnswer, shuffle } from "../utils/answer";

interface Props { step: ExperienceStep; config: ExperienceConfig; hintShown: boolean; onHint: () => void; onSolved: () => void }

export function HintButton({ hint, shown, emphasize, label, shownLabel, onClick }: { hint?: string; shown: boolean; emphasize: boolean; label: string; shownLabel: string; onClick: () => void }) {
  if (!hint) return null;
  return shown ? (
    <p className="rounded-2xl bg-[var(--accent)]/15 p-3" role="note"><strong>{shownLabel}: </strong>{hint}</p>
  ) : (
    <button onClick={onClick} className={`btn btn-ghost w-full ${emphasize ? "!border-2 !bg-[var(--accent)]/20 animate-pulse" : ""}`}><Lightbulb className="mr-2 inline h-4 w-4" />{label}</button>
  );
}

type P = { step: ExperienceStep; config: ExperienceConfig; fail: () => void; onSolved: () => void };

/** Väljer rätt utmaningskomponent utifrån step.challenge.type. Lägg till nya typer här. */
export function ChallengeRenderer({ step, config, hintShown, onHint, onSolved }: Props) {
  const c = step.challenge, T = config.texts;
  const [wrong, setWrong] = useState(0), [msg, setMsg] = useState("");
  const fail = () => {
    const n = wrong + 1; setWrong(n);
    setMsg(c.incorrectMessage ?? config.wrongMessages[(n - 1) % config.wrongMessages.length]);
  };
  const emphasize = wrong >= config.settings.wrongAttemptsBeforeHint;
  return (
    <div className="space-y-4">
      <p className="font-serif text-2xl leading-snug">{c.prompt}</p>
      {c.type === "multipleChoice" && <Choice {...{ step, config, fail, onSolved }} />}
      {c.type === "sequence" && <Sequence {...{ step, config, fail, onSolved }} />}
      {(c.type === "text" || c.type === "number" || c.type === "riddle") && <TextLike {...{ step, config, fail, onSolved, setMsg }} />}
      <div aria-live="polite" className="min-h-6 text-[var(--primary)]">{msg}</div>
      <HintButton hint={c.hint} shown={hintShown} emphasize={emphasize} label={T.showHint} shownLabel={T.hint} onClick={onHint} />
    </div>
  );
}

function TextLike({ step, config, fail, onSolved, setMsg }: P & { setMsg: (s: string) => void }) {
  const c = step.challenge, [v, setV] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.trim()) return setMsg(config.texts.emptyAnswer);
    checkTextAnswer(c, v) ? onSolved() : fail();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="sr-only" htmlFor="answer">{config.ui.answerLabel}</label>
      <input id="answer" className="field" value={v} onChange={(e) => setV(e.target.value)} placeholder={config.texts.answerPlaceholder}
        inputMode={c.type === "number" ? "numeric" : "text"} autoComplete="off" />
      <button className="btn w-full" type="submit">{config.texts.check}</button>
    </form>
  );
}

function Choice({ step, config, fail, onSolved }: P) {
  const c = step.challenge;
  const opts = useMemo(() => ((c.shuffleOptions ?? config.settings.shuffleOptions) ? shuffle(c.options ?? []) : c.options ?? []), [step.id]);
  const [tried, setTried] = useState<string[]>([]);
  return (
    <div className="grid gap-3" role="group" aria-label={config.ui.optionsLabel}>
      {opts.map((o) => (
        <button key={o.id} disabled={tried.includes(o.id)} className="btn btn-ghost !h-auto min-h-[56px] py-3 text-left text-lg"
          onClick={() => (checkChoice(c, o.id) ? onSolved() : (setTried([...tried, o.id]), fail()))}>{o.label}</button>
      ))}
    </div>
  );
}

/** Tryck på alternativen i rätt ordning (mobilvänligt). */
function Sequence({ step, config, fail, onSolved }: P) {
  const c = step.challenge;
  const opts = useMemo(() => shuffle(c.options ?? []), [step.id]);
  const [picked, setPicked] = useState<string[]>([]);
  const add = (id: string) => {
    const next = [...picked, id]; setPicked(next);
    if (next.length === opts.length) { checkSequence(c, next) ? onSolved() : (fail(), setPicked([])); }
  };
  return (
    <div className="space-y-3">
      <p className="text-sm opacity-80">{fill(config.ui.sequenceHelp, { picked: picked.length, total: opts.length })}</p>
      {opts.map((o) => {
        const i = picked.indexOf(o.id);
        return <button key={o.id} disabled={i >= 0} className="btn btn-ghost !h-auto min-h-[56px] w-full py-3 text-left text-lg" onClick={() => add(o.id)}>{i >= 0 ? `${i + 1}. ` : ""}{o.label}</button>;
      })}
      <button className="btn btn-ghost w-full" onClick={() => setPicked([])}>{config.texts.retry}</button>
    </div>
  );
}
