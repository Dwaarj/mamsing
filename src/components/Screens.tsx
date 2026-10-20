import { motion } from "framer-motion";
import { Check, Lock, Gift, Menu, Heart, Image as ImageIcon, RotateCcw } from "lucide-react";
import { fill } from "../utils/text";
import { experienceConfig as CFG } from "../config/experienceConfig";
import type { ExperienceConfig, ExperienceStep } from "../types";
import { AudioGreetingPlayer, ConfettiEffect, ImageFallback, ImageGallery } from "./ui";

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.5 } };

export function WelcomeScreen({ config, onStart }: { config: ExperienceConfig; onStart: () => void }) {
  return (
    <div className="relative flex min-h-screen items-end justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[var(--secondary)]"><ImageFallback src={config.welcomeImage} alt={config.ui.welcomeAlt} className="h-full [&>img]:rounded-none [&>div]:rounded-none" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
      <motion.div {...fade} className="relative z-10 mx-auto max-w-xl space-y-5 p-6 pb-10 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{config.date}</p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{config.title}</h1>
        <div className="rule" />
        <p className="text-lg leading-relaxed">{config.welcomeText}</p>
        <p className="font-serif text-xl italic">{config.welcomeClosing}</p>
        <button className="btn w-full !bg-[var(--accent)] !text-black sm:w-auto" autoFocus onClick={onStart}>{config.startButtonText}</button>
      </motion.div>
    </div>
  );
}

export function ProgressIndicator({ index, total }: { index: number; total: number }) {
  const left = total - index;
  return (
    <div className="text-center text-sm" aria-label={CFG.ui.progressAria}>
      <p>{fill(CFG.ui.progress, { current: Math.min(index, total), total })} · {fill(left === 1 ? CFG.ui.progressLeftOne : CFG.ui.progressLeftMany, { n: left })}</p>
      <div className="mx-auto mt-2 h-1 max-w-xs overflow-hidden rounded bg-black/10"><div className="h-full bg-[var(--accent)] transition-all" style={{ width: `${(Math.min(index, total) / total) * 100}%` }} /></div>
    </div>
  );
}

/** Översikt: klara steg, aktuellt steg och låsta hemligheter. */
export function StepNavigation({ steps, solved, unlockedIdx, viewIdx, config, onGo, onClose }: { steps: ExperienceStep[]; solved: string[]; unlockedIdx: number; viewIdx: number; config: ExperienceConfig; onGo: (i: number) => void; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label={config.texts.overview} className="fixed inset-0 z-40 flex items-end bg-black/50 sm:items-center sm:justify-center" onClick={onClose}>
      <div className="card w-full max-w-md space-y-2 p-5" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl">{config.texts.overview}</h2>
        {steps.map((s, i) => {
          const locked = i > unlockedIdx, done = solved.includes(s.id);
          return (
            <button key={s.id} disabled={locked} onClick={() => { onGo(i); onClose(); }} aria-current={i === viewIdx}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${i === viewIdx ? "bg-[var(--accent)]/25" : ""} ${locked ? "opacity-60" : ""}`}>
              {locked ? <Lock className="h-5 w-5" /> : done ? <Check className="h-5 w-5 text-green-700" /> : <Gift className="h-5 w-5" />}
              <span>{locked ? config.texts.secret : done ? s.reveal.title : s.title}</span>
            </button>
          );
        })}
        <button className="btn btn-ghost w-full" onClick={onClose}>{config.ui.close}</button>
      </div>
    </div>
  );
}

export function FamilyGreetings({ config }: { config: ExperienceConfig }) {
  if (!config.familyGreetings.length) return null;
  return (
    <section className="space-y-3"><h2 className="text-center text-2xl">{config.ui.greetingsTitle}</h2>
      {config.familyGreetings.map((g) => (
        <article key={g.id} className="card space-y-2 p-4">
          <div className="flex items-center gap-3">{g.image && <ImageFallback src={g.image} alt={g.author} className="h-14 w-14 shrink-0 overflow-hidden rounded-full [&_div]:min-h-0 [&_div]:text-[0]" />}<h3 className="text-xl">{g.author}</h3></div>
          <p>{g.message}</p>
          {g.audioSrc && <AudioGreetingPlayer audio={{ enabled: true, src: g.audioSrc, title: fill(config.ui.greetingFrom, { author: g.author }), from: g.author }} />}
        </article>
      ))}
    </section>
  );
}

export function FinaleScreen({ config, onBack, onGallery, onReview }: { config: ExperienceConfig; onBack: () => void; onGallery: () => void; onReview: () => void }) {
  const f = config.finale;
  return (
    <motion.div {...fade} className="space-y-6">
      <ConfettiEffect fire={1} enabled={config.settings.confetti} big />
      {f.image && <ImageFallback src={f.image} alt={config.ui.familyImageAlt} className="aspect-[4/3]" />}
      <h1 className="text-center text-4xl font-bold">{f.title}</h1>
      <p className="text-center text-lg leading-relaxed">{f.message}</p>
      <p className="text-center font-serif text-2xl text-[var(--primary)]"><Heart className="mr-2 inline h-5 w-5" aria-hidden />{f.closing}</p>
      {f.collage?.length ? <ImageGallery images={f.collage} /> : null}
      {f.audio?.enabled && <AudioGreetingPlayer audio={f.audio} />}
      <FamilyGreetings config={config} />
      <div className="grid gap-3">
        {config.gallery.enabled && <button className="btn" onClick={onGallery}><ImageIcon className="mr-2 inline h-5 w-5" />{config.texts.gallery}</button>}
        <button className="btn btn-ghost" onClick={onReview}>{config.ui.reviewDay}</button>
        <button className="btn btn-ghost" onClick={onBack}><RotateCcw className="mr-2 inline h-4 w-4" />{config.texts.restart}</button>
      </div>
    </motion.div>
  );
}

export function MemoryGallery({ config, onClose }: { config: ExperienceConfig; onClose: () => void }) {
  return (
    <div className="space-y-5"><h1 className="text-center text-3xl">{config.texts.gallery}</h1><ImageGallery images={config.gallery.images} /><button className="btn w-full" onClick={onClose}>{config.ui.back}</button></div>
  );
}

export function ResetExperienceDialog({ config, onCancel, onConfirm }: { config: ExperienceConfig; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div role="alertdialog" aria-modal="true" aria-label={config.texts.restart} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="card max-w-sm space-y-4 p-6 text-center">
        <p className="text-lg">{config.texts.restartConfirm}</p>
        <div className="grid grid-cols-2 gap-3"><button autoFocus className="btn btn-ghost" onClick={onCancel}>{config.texts.cancel}</button><button className="btn" onClick={onConfirm}>{config.texts.confirmRestart}</button></div>
      </div>
    </div>
  );
}

export const MenuIcon = Menu;
