import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ImageOff, Play, Pause, X, Volume2, Lightbulb } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { AudioGreeting, Img } from "../types";
import { experienceConfig } from "../config/experienceConfig";
import { fill } from "../utils/text";
const U = experienceConfig.ui;

export function ImageFallback({ src, alt, caption, className = "" }: Img & { className?: string }) {
  const [bad, setBad] = useState(false);
  return (
    <figure className={`m-0 ${className}`}>
      {bad ? (
        <div role="img" aria-label={alt} className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--accent)] bg-white/40 text-sm opacity-70">
          <ImageOff aria-hidden /> {U.imageMissing}
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className="h-full w-full rounded-2xl object-cover" />
      )}
      {caption && <figcaption className="mt-1 text-center text-xs opacity-70">{caption}</figcaption>}
    </figure>
  );
}

/** Diskret konfetti i guld och vinrött. */
export function ConfettiEffect({ fire, enabled, big }: { fire: number; enabled: boolean; big?: boolean }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!fire || !enabled || reduce) return;
    confetti({ particleCount: big ? 160 : 70, spread: big ? 100 : 70, origin: { y: 0.65 }, colors: ["#c9a24b", "#f3e3b5", "#7a1f2b", "#2f4a3a"] });
  }, [fire]);
  return null;
}

export function ImageGallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<Img | null>(null);
  if (!images.length) return null;
  return (
    <>
      <div className={`grid gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {images.map((im, i) => (
          <button key={im.src + i} onClick={() => setOpen(im)} aria-label={fill(U.enlarge, { alt: im.alt })}
            className={`overflow-hidden rounded-2xl ${i === 0 && images.length % 2 === 1 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}>
            <ImageFallback {...im} className="h-full" />
          </button>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.alt} onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button className="absolute right-4 top-4 text-white" aria-label={U.close}><X /></button>
          <div className="max-h-[90vh] max-w-3xl text-white" onClick={(e) => e.stopPropagation()}>
            <ImageFallback {...open} className="max-h-[80vh]" />
          </div>
        </div>
      )}
    </>
  );
}

export function DidYouKnowCard({ heading, text, image }: { heading: string; text: string; image?: string }) {
  return (
    <aside className="card p-5">
      <p className="mb-2 flex items-center gap-2 font-serif text-xl"><Lightbulb className="h-5 w-5 text-[var(--accent)]" aria-hidden />{heading}</p>
      {image && <ImageFallback src={image} alt={U.memoryAlt} className="mb-3 aspect-[4/3]" />}
      <p className="text-lg leading-relaxed">{text}</p>
    </aside>
  );
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
/** Ljudspelare. Startar aldrig ljud oväntat; autoplay försöks och faller tillbaka till knapp. */
export function AudioGreetingPlayer({ audio, onPlayed }: { audio: AudioGreeting; onPlayed?: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false), [t, setT] = useState(0), [d, setD] = useState(0), [err, setErr] = useState(false), [blocked, setBlocked] = useState(false);
  const play = () => ref.current?.play().then(() => { setBlocked(false); onPlayed?.(); }).catch(() => setBlocked(true));
  useEffect(() => { const a = ref.current; if (audio.autoplayAfterReveal) play(); return () => a?.pause(); }, [audio.src]);
  if (!audio.enabled) return null;
  if (err) return <p className="text-sm opacity-70">{U.audioError}</p>;
  return (
    <section className="card p-4" aria-label={fill(U.audioAria, { title: audio.title })}>
      <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest opacity-70"><Volume2 className="h-4 w-4" aria-hidden />{audio.from ? fill(U.audioIntroFrom, { from: audio.from }) : U.audioIntro}</p>
      <p className="font-serif text-lg">{audio.title}</p>
      {audio.caption && <p className="text-sm opacity-80">{audio.caption}</p>}
      <audio ref={ref} src={audio.src} preload="metadata" onError={() => setErr(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setD(e.currentTarget.duration)} />
      <div className="mt-3 flex items-center gap-3">
        <button className="btn !px-4" aria-label={playing ? U.audioPause : U.audioPlay} onClick={() => (playing ? ref.current?.pause() : play())}>
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded bg-black/10" role="progressbar" aria-valuenow={Math.round(t)} aria-valuemax={Math.round(d) || 0}>
          <div className="h-full bg-[var(--accent)]" style={{ width: d ? `${(t / d) * 100}%` : 0 }} />
        </div>
        <span className="text-xs tabular-nums">{fmt(t)} / {fmt(d || 0)}</span>
      </div>
      {blocked && <p className="mt-2 text-sm">{U.audioBlocked}</p>}
    </section>
  );
}
