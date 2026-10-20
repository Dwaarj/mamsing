export type ChallengeType = "text" | "multipleChoice" | "number" | "riddle" | "sequence";
export interface Img { src: string; alt: string; caption?: string }
export interface Option { id: string; label: string; isCorrect?: boolean }
export interface Challenge {
  type: ChallengeType; prompt: string;
  acceptedAnswers?: string[];
  /** multipleChoice: markera rätt med isCorrect. sequence: skriv alternativen i RÄTT ordning (de blandas vid visning). */
  options?: Option[];
  shuffleOptions?: boolean;
  hint?: string; successMessage: string; incorrectMessage?: string;
  ignoreCase?: boolean; ignoreWhitespace?: boolean; ignoreSwedishDiacritics?: boolean;
}
export interface AudioGreeting { enabled: boolean; src: string; title: string; from?: string; caption?: string; autoplayAfterReveal?: boolean }
export interface DidYouKnow { enabled: boolean; heading?: string; text: string; image?: string }
export interface ExperienceStep {
  id: string; enabled: boolean; order: number;
  variant?: "light" | "dark";
  eyebrow?: string; title: string; subtitle?: string; teaser: string;
  images: Img[]; challenge: Challenge;
  reveal: { title: string; description: string; destination?: string; budget?: string; time?: string; practicalInformation?: string[] };
  didYouKnow?: DidYouKnow;
  /** En eller flera ljudhälsningar. audioGreeting (en enda) fungerar fortfarande. */
  audioGreetings?: AudioGreeting[]; audioGreeting?: AudioGreeting;
}
export interface FamilyGreeting { id: string; author: string; message: string; image?: string; audioSrc?: string }
export interface ExperienceConfig {
  recipientName: string; birthdayAge: number; date: string; title: string; welcomeText: string; welcomeClosing: string;
  startButtonText: string; welcomeImage: string;
  texts: Record<"continue"|"check"|"hint"|"showHint"|"retry"|"restart"|"restartConfirm"|"cancel"|"confirmRestart"|"secret"|"overview"|"gallery"|"finaleButton"|"didYouKnow"|"answerPlaceholder"|"emptyAnswer"|"revealing", string>;
  wrongMessages: string[];
  /** Webbläsarens fliktitel och nyckeln som framsteg sparas under i localStorage */
  meta: { pageTitle: string; storageKey: string };
  /** Övriga gränssnittstexter. {platshållare} fylls i av koden. */
  ui: Record<"imageMissing"|"enlarge"|"close"|"memoryAlt"|"audioIntro"|"audioIntroFrom"|"audioError"|"audioAria"|"audioPlay"|"audioPause"|"audioBlocked"|"answerLabel"|"optionsLabel"|"sequenceHelp"|"progress"|"progressLeftOne"|"progressLeftMany"|"progressAria"|"greetingsTitle"|"greetingFrom"|"reviewDay"|"back"|"noSteps"|"menuAria"|"welcomeAlt"|"familyImageAlt", string>;
  /** Dolt adminläge, nås med ?admin=true (sätt enabled: false för att stänga av helt) */
  admin: { enabled: boolean; param: string; value: string; texts: Record<"title"|"jump"|"unlockNext"|"unlockAll"|"reset"|"open"|"close", string> };
  sectionLabels: Record<"intro"|"images"|"challenge"|"correct"|"reveal"|"memory"|"audio", string>;
  theme: { primary: string; secondary: string; accent: string; background: string; card: string; text: string; dark: { background: string; card: string; text: string } };
  settings: { confetti: boolean; shuffleOptions: boolean; wrongAttemptsBeforeHint: number; revealDelayMs: number };
  steps: ExperienceStep[];
  familyGreetings: FamilyGreeting[];
  gallery: { enabled: boolean; images: Img[] };
  finale: { title: string; message: string; closing: string; image?: string; collage?: Img[]; audio?: AudioGreeting };
}
