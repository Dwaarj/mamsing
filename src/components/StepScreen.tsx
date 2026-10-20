import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { ExperienceConfig, ExperienceStep } from "../types";
import { AudioGreetingPlayer, ConfettiEffect, DidYouKnowCard, ImageGallery } from "./ui";
import { ChallengeRenderer } from "./Challenge";

type Tone = "intro" | "challenge" | "success" | "reveal" | "bare";
const toneClass: Record<Tone, string> = {
  intro: "card border-l-4 !border-l-[var(--accent)] p-5",
  challenge: "card p-5",
  success: "rounded-3xl border border-emerald-700/30 bg-emerald-50 p-5 text-emerald-950",
  reveal: "rounded-3xl p-6 text-center text-white shadow-2xl",
  bare: "",
};

/** En visuellt avgränsad sektion med liten etikett (etiketterna styrs av config.sectionLabels). */
function Panel({ label, tone, delay = 0, children }: { label?: string; tone: Tone; delay?: number; children: ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18, scale: tone === "reveal" ? 0.96 : 1 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay }}
      className={toneClass[tone]} style={tone === "reveal" ? { background: "linear-gradient(135deg, var(--secondary), var(--primary))", border: "1px solid var(--accent)" } : undefined}>
      {label && <p className={`mb-2 text-xs uppercase tracking-[0.25em] ${tone === "reveal" ? "text-[var(--accent)]" : "opacity-60"}`}>{label}</p>}
      {children}
    </motion.section>
  );
}

type Props = { step: ExperienceStep; config: ExperienceConfig; solved: boolean; hintShown: boolean; isLast: boolean;
  onHint: () => void; onSolved: () => void; onNext: () => void; onPlayed: () => void };

/** Berättelseflöde: challenge → celebrating (kort väntan) → revealed. Allt innehåll kommer från config. */
export function StepScreen({ step, config, solved, hintShown, isLast, onHint, onSolved, onNext, onPlayed }: Props) {
  const reduce = useReducedMotion();
  const instant = useRef(solved).current; // redan löst vid öppning → inga fördröjningar
  const [phase, setPhase] = useState<"challenge" | "celebrating" | "revealed">(solved ? "revealed" : "challenge");
  const [fire, setFire] = useState(0);
  const h1 = useRef<HTMLHeadingElement>(null), revealHead = useRef<HTMLHeadingElement>(null);
  const L = config.sectionLabels, r = step.reveal, dyk = step.didYouKnow;
  const audios = [...(step.audioGreetings ?? []), ...(step.audioGreeting ? [step.audioGreeting] : [])].filter((a) => a.enabled && a.src);

  useEffect(() => { window.scrollTo({ top: 0 }); h1.current?.focus(); }, []);
  useEffect(() => {
    if (phase !== "celebrating") return;
    const id = setTimeout(() => setPhase("revealed"), reduce ? 600 : config.settings.revealDelayMs);
    return () => clearTimeout(id);
  }, [phase]);
  useEffect(() => { if (phase === "revealed" && !instant) revealHead.current?.focus({ preventScroll: false }); }, [phase]);

  const d = (n: number) => (instant || reduce ? 0 : n);
  const info = [r.destination, r.time].filter(Boolean).join(" · ");
  return (
    <div className="space-y-5">
      <ConfettiEffect fire={fire} enabled={config.settings.confetti} />
      <header className="text-center">
        {step.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{step.eyebrow}</p>}
        <h1 ref={h1} tabIndex={-1} className="text-3xl font-bold outline-none">{step.title}</h1>
        {step.subtitle && <p className="opacity-80">{step.subtitle}</p>}
      </header>

      <Panel tone="intro" label={L.intro}><p className="text-lg leading-relaxed">{step.teaser}</p></Panel>
      {step.images.length > 0 && <Panel tone="bare" label={L.images}><ImageGallery images={step.images} /></Panel>}

      {phase === "challenge" && (
        <Panel tone="challenge" label={L.challenge}>
          <ChallengeRenderer step={step} config={config} hintShown={hintShown} onHint={onHint}
            onSolved={() => { setFire((f) => f + 1); onSolved(); setPhase("celebrating"); }} />
        </Panel>
      )}

      {phase !== "challenge" && (
        <Panel tone="success" label={L.correct}>
          <p className="flex items-center gap-2 text-lg font-semibold"><Check className="h-5 w-5 shrink-0" aria-hidden />{step.challenge.successMessage}</p>
          {phase === "celebrating" && (
            <p className="mt-3 flex items-center gap-2" role="status"><Sparkles className="h-4 w-4 animate-pulse" aria-hidden />{config.texts.revealing}</p>
          )}
        </Panel>
      )}

      {phase === "revealed" && (
        <>
          <Panel tone="reveal" label={L.reveal}>
            <h2 ref={revealHead} tabIndex={-1} className="text-3xl font-bold outline-none">{r.title}</h2>
            <p className="mt-3 text-lg leading-relaxed">{r.description}</p>
            {r.budget && <div className="mx-auto mt-4 inline-block rounded-2xl border border-[var(--accent)] bg-white/10 px-5 py-3 font-serif text-xl">{r.budget}</div>}
            {info && <p className="mt-3 text-sm opacity-90">{info}</p>}
            {r.practicalInformation?.length ? <ul className="mx-auto mt-3 max-w-sm list-disc pl-5 text-left text-sm">{r.practicalInformation.map((t) => <li key={t}>{t}</li>)}</ul> : null}
          </Panel>
          {dyk?.enabled && dyk.text && (
            <Panel tone="bare" label={L.memory} delay={d(0.9)}><DidYouKnowCard heading={dyk.heading ?? config.texts.didYouKnow} text={dyk.text} image={dyk.image} /></Panel>
          )}
          {audios.length > 0 && (
            <Panel tone="bare" label={L.audio} delay={d(1.6)}>
              <div className="space-y-3">{audios.map((a, i) => <AudioGreetingPlayer key={a.src + i} audio={i === 0 ? a : { ...a, autoplayAfterReveal: false }} onPlayed={onPlayed} />)}</div>
            </Panel>
          )}
          <Panel tone="bare" delay={d(2.2)}><button className="btn w-full" onClick={onNext}>{isLast ? config.texts.finaleButton : config.texts.continue}</button></Panel>
        </>
      )}
    </div>
  );
}
