import type { ExperienceConfig } from "../types";

/**
 * ============ HÄR ÄNDRAR DU ALLT INNEHÅLL ============
 * - Ändra texter, svar, bilder och ljud direkt nedan.
 * - Byt ordning: ändra "order" (lägst först).
 * - Stäng av ett steg: enabled: false.
 * - Nytt steg: kopiera ett helt steg-block, ge det nytt unikt "id" och "order".
 * - Ta bort steg: radera blocket (eller sätt enabled: false).
 * - Bilder ligger i public/images (sökväg "/images/filnamn.jpg"), ljud i public/audio.
 * Allt som står som [PLATSHÅLLARE] ska bytas ut.
 */
export const experienceConfig: ExperienceConfig = {
  recipientName: "Mamma",
  birthdayAge: 60,
  date: "2026-11-09",
  title: "Grattis på 60-årsdagen, mamma ❤️",
  welcomeText: "I dag är ingen vanlig dag. Vi har planerat en hel dag fylld av överraskningar, minnen och saker som vi hoppas att du kommer att tycka om. Men du får inte veta allt på en gång. För att avslöja nästa del av dagen behöver du lösa några små klurigheter längs vägen.",
  welcomeClosing: "Är du redo att börja ditt födelsedagsäventyr?",
  startButtonText: "Starta äventyret",
  welcomeImage: "/images/welcome.jpg",
  texts: {
    continue: "Fortsätt", check: "Kontrollera svaret", hint: "Ledtråd", showHint: "Behöver du en liten ledtråd?", retry: "Börja om",
    restart: "Starta om dagen", restartConfirm: "Är du säker? Alla upplåsta överraskningar återställs.", cancel: "Avbryt", confirmRestart: "Ja, starta om",
    secret: "Hemlig överraskning", overview: "Dagens överraskningar", gallery: "Minnesgalleri", finaleButton: "Till finalen",
    didYouKnow: "Visste du att…", answerPlaceholder: "Skriv ditt svar här", emptyAnswer: "Skriv ett svar först så provar vi tillsammans.", revealing: "Dagens nästa överraskning avslöjas…",
  },
  meta: { pageTitle: "Födelsedagsäventyret", storageKey: "bday-progress-v1" },
  ui: {
    imageMissing: "Bild kommer snart", enlarge: "Förstora: {alt}", close: "Stäng", memoryAlt: "Minne",
    audioIntro: "En personlig hälsning", audioIntroFrom: "En personlig hälsning från {from}", audioError: "Ljudhälsningen kunde inte laddas just nu.",
    audioAria: "Ljudhälsning: {title}", audioPlay: "Spela upp hälsningen", audioPause: "Pausa hälsningen",
    audioBlocked: "Webbläsaren väntar på ditt tryck – tryck på ”Spela upp hälsningen”.",
    answerLabel: "Ditt svar", optionsLabel: "Svarsalternativ", sequenceHelp: "Tryck i rätt ordning. Valt: {picked} av {total}",
    progress: "Överraskning {current} av {total}", progressLeftOne: "{n} överraskning kvar", progressLeftMany: "{n} överraskningar kvar", progressAria: "Framsteg",
    greetingsTitle: "Hälsningar från familjen", greetingFrom: "Hälsning från {author}", reviewDay: "Titta tillbaka på dagen", back: "Tillbaka",
    noSteps: "Inga aktiva steg i konfigurationen.", menuAria: "Meny", welcomeAlt: "Välkomstbild", familyImageAlt: "Familjebild",
  },
  // Adminläge: öppna sidan med ?admin=true. Sätt enabled: false före publicering om du vill stänga av det.
  admin: { enabled: true, param: "admin", value: "true", texts: { title: "Adminläge", jump: "Hoppa till steg", unlockNext: "Lås upp nästa steg", unlockAll: "Lås upp allt (final)", reset: "Återställ framsteg", open: "Öppna adminpanelen", close: "Stäng panelen" } },
  // Små etiketter ovanför varje sektion i ett steg
  sectionLabels: { intro: "Överraskningen", images: "Bilder", challenge: "Din klurighet", correct: "Rätt svar", reveal: "Avslöjat", memory: "Ett minne", audio: "Hälsningar till dig" },
  // Vänliga svar vid fel – används i tur och ordning
  wrongMessages: ["Inte riktigt, men du är nära!", "Bra försök! Vill du prova igen?", "Det där var ett bra svar, men vi tänker på något annat.", "Behöver du en liten ledtråd?"],
  // Färgtema (beige, champagne, vinrött, mörkgrönt, guld)
  theme: { primary: "#7a1f2b", secondary: "#2f4a3a", accent: "#b8923f", background: "#f6efe3", card: "#fffaf0", text: "#2b2220", dark: { background: "#1a1024", card: "#2a1a3a", text: "#f5ecff" } /* mörkt steg (variant: "dark") */ },
  settings: { confetti: true, shuffleOptions: true, wrongAttemptsBeforeHint: 2, revealDelayMs: 2200 /* väntan före avslöjandet */ },

  steps: [
    {
      id: "vellingeblomman", enabled: true, order: 1, eyebrow: "Första överraskningen",
      title: "Första överraskningen", teaser: "Nu börjar dagen på riktigt. Vi ska ge oss iväg till en plats där du får fria händer att hitta något som du verkligen tycker om.",
      images: [
  {
    src: "/images/vellingeblomman.jpg",
    alt: "Vellingeblomman",
    caption: "[BILDTEXT]"
  }
],

challenge: {
        type: "text", prompt: "Vilket utflyktsmål förknippar vi med blommor, inredning, inspiration och shopping?",
        acceptedAnswers: ["hej", "Vellinge Blomman", "Vellinge blomman"], ignoreCase: true, ignoreWhitespace: true,
        hint: "Platsen ligger i Vellinge och namnet avslöjar att där finns gott om växtlighet.",
        successMessage: "Precis rätt, mamma! 🎉",
      },
      reveal: { title: "Vi åker till Vellingeblomman!", description: "Där får du shoppa precis vad du vill för 1 000 kronor.", budget: "Din shoppingbudget: 1 000 kr", destination: "Vellingeblomman" },
      didYouKnow: { enabled: true, heading: "Visste du att…", text: "Visste du att vi fortfarande pratar om gången då du [LÄGG IN PERSONLIGT MINNE HÄR]?", image: "/images/1.jpg" },
      audioGreeting: { enabled: true, src: "/audio/jesper-halsning.mp3", title: "En hälsning inför shoppingen", from: "[NAMN]", autoplayAfterReveal: false },
      // Flera hälsningar på samma steg: använd audioGreetings (lista)
      audioGreetings: [{ enabled: true, src: "/audio/familjen-halsning.mp3", title: "Hälsning från hela gänget", from: "Familjen" }],
    },
    {
      id: "lunch", enabled: true, order: 2, eyebrow: "Nästa stopp",
      title: "Nästa stopp", teaser: "Efter shopping och inspiration är det dags att slå sig ner, skåla och äta något riktigt gott.",
      images: [{ src: "/images/restaurang.jpg", alt: "Restaurangen" }],
      challenge: {
        type: "multipleChoice", prompt: "Vilken maträtt brukade du laga som vi barn fortfarande förknippar särskilt mycket med dig?", shuffleOptions: true,
        options: [ // ← markera RÄTT alternativ med isCorrect: true
          { id: "a", label: "hej", isCorrect: true },
          { id: "b", label: "[FEL ALTERNATIV 1]" }, { id: "c", label: "[FEL ALTERNATIV 2]" }, { id: "d", label: "[FEL ALTERNATIV 3]" },
        ],
        successMessage: "Ja just det – det minns vi så väl! ❤️",
      },
      reveal: { title: "Nu väntar en riktigt fin lunch!", description: "Vi åker vidare till [RESTAURANGENS NAMN] för en sen lunch tillsammans.", destination: "[RESTAURANGENS NAMN], [ADRESS ELLER OMRÅDE]", time: "[BOKAD TID]", practicalInformation: ["[PRAKTISK INFORMATION]"] },
      didYouKnow: { enabled: true, text: "Ett av våra finaste minnen med dig är [LÄGG IN MINNE HÄR].", image: "/images/2.jpg" },
      audioGreeting: { enabled: true, src: "/audio/familjen-halsning.mp3", title: "En hälsning vid lunchen", from: "[NAMN]" },
    },
    {
      id: "vila", enabled: true, order: 3, eyebrow: "Lugn före stormen",
      title: "Lugn före stormen", teaser: "Efter dagens första äventyr väntar en liten paus. Du kommer att behöva samla energi, för dagen är långt ifrån slut.",
      images: [{ src: "/images/vila.jpg", alt: "Vila och avkoppling" }],
      challenge: {
        type: "text", prompt: "På vilken plats semestrade vi när [LÄGG IN PERSONLIG HÄNDELSE]?", acceptedAnswers: ["hej", "[ALTERNATIV STAVNING]"],
        hint: "[LÄGG IN EN PERSONLIG LEDTRÅD]", successMessage: "Helt rätt! Vilket minne. ❤️",
      },
      reveal: { title: "Dags för en välförtjänt paus", description: "Nu åker du hem och vilar en stund. Ta det lugnt, byt om och gör dig redo. Kvällen har bara börjat." },
      didYouKnow: { enabled: true, text: "Visste du att [LÄGG IN MINNE HÄR]?" },
      audioGreeting: { enabled: true, src: "/audio/vila-halsning.mp3", title: "Vilohälsning", from: "[NAMN]" },
    },
    {
      id: "depeche-mode", enabled: true, order: 4, variant: "dark", eyebrow: "Kvällens huvudnummer",
      title: "Kvällens huvudnummer", teaser: "Nu kombinerar vi musik, nostalgi och något gott i glaset. En av dina favoriter står i centrum.",
      images: [{ src: "/images/depeche-mode.jpg", alt: "Konsert eller familjefoto" }],
      challenge: {
        type: "number", prompt: "Vilket år bildades Depeche Mode?", acceptedAnswers: ["hej"],
        hint: "Det var i början av ett årtionde som kom att präglas av synthar, stora frisyrer och ikonisk musik.", successMessage: "Rätt! Du är en riktig kännare. 🎶",
      },
      reveal: { title: "Ikväll blir det Depeche Mode-fest!", description: "Det väntar Depeche Mode, bubbel, tilltugg och en kväll i musikens tecken." },
      didYouKnow: { enabled: true, text: "[LÄGG IN ETT DEPECHE MODE-RELATERAT MINNE]" },
      audioGreeting: { enabled: true, src: "/audio/depeche-halsning.mp3", title: "Inför festen", from: "[NAMN]" },
    },
    {
      id: "middag", enabled: true, order: 5, eyebrow: "Kvällen fortsätter",
      title: "Kvällen fortsätter", teaser: "Musiken och bubblet var bara början. Nu väntar något som samlar dem som betyder allra mest.",
      images: [{ src: "/images/middag.jpg", alt: "Familjemiddag" }],
      challenge: {
        type: "riddle", prompt: "[LÄGG IN EN PERSONLIG GÅTA SOM LEDER TILL BARNET ELLER PLATSEN]", acceptedAnswers: ["hej", "[ALTERNATIVT SVAR]"],
        hint: "[LÄGG IN LEDTRÅD]", successMessage: "Du listade ut det! ❤️",
      },
      reveal: {
        title: "Nu blir det middag med familjen", description: "Vi fortsätter kvällen hemma hos [NAMN], där det väntar middag och mer tid tillsammans.",
        destination: "Värd: [NAMN] · [ADRESS]", time: "Ungefär [TID]", practicalInformation: ["Klädkod: [KLÄDKOD]", "[PRAKTISK INFORMATION]"],
      },
      didYouKnow: { enabled: true, text: "Visste du att [LÄGG IN MINNE HÄR]?" },
      audioGreeting: { enabled: true, src: "/audio/middag-halsning.mp3", title: "En hälsning före middagen", from: "[NAMN]" },
    },
    {
      id: "tarta", enabled: true, order: 6, eyebrow: "Ett sista mysterium",
      title: "Ett sista mysterium", teaser: "Det återstår fortfarande en viktig födelsedagstradition. Eller kanske två.",
      images: [{ src: "/images/tarta.jpg", alt: "Tårta och presenter" }],
      challenge: {
        type: "multipleChoice", prompt: "Vad hoppas vi att du känner extra mycket i dag?", shuffleOptions: true,
        options: [{ id: "a", label: "hej", isCorrect: true }, { id: "b", label: "Stressad" }, { id: "c", label: "Uttråkad" }, { id: "d", label: "Bortglömd" }],
        successMessage: "Ja, mamma. Du är så älskad. ❤️",
      },
      reveal: { title: "Tårta och presentöppning!", description: "Nu avslutar vi dagen med tårta, presenter och ännu mer firande tillsammans." },
      didYouKnow: { enabled: false, text: "" },
      audioGreeting: { enabled: false, src: "", title: "" },
    },
  ],

  familyGreetings: [
    { id: "jesper", author: "Jesper", message: "Grattis mamma! Vi älskar dig och hoppas att du får en fantastisk dag.", image: "/images/greetings/jesper.jpg", audioSrc: "/audio/jesper-halsning.mp3" },
  ],
  gallery: { enabled: true, images: [
    { src: "/images/gallery/1.jpg", alt: "Familjebild 1", caption: "[BILDTEXT]" },
    { src: "/images/gallery/2.jpg", alt: "Familjebild 2" },
    { src: "/images/gallery/3.jpg", alt: "Familjebild 3" },
  ] },
  finale: {
    title: "Grattis på 60-årsdagen, mamma!",
    message: "Den här dagen handlar om dig och om allt du betyder för oss. Tack för alla minnen, all kärlek och allt du gör. Vi hoppas att den här dagen blir ett nytt minne som vi får bära med oss tillsammans.",
    closing: "Vi älskar dig ❤️", image: "/images/family.jpg",
    collage: [{ src: "/images/gallery/1.jpg", alt: "Collage 1" }, { src: "/images/gallery/2.jpg", alt: "Collage 2" }],
    audio: { enabled: true, src: "/audio/sista-overraskningen.mp3", title: "En gemensam hälsning från oss alla", from: "Hela familjen" },
  },
};
