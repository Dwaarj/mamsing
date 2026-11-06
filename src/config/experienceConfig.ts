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
    didYouKnow: "Kommer du ihåg när...", answerPlaceholder: "Skriv ditt svar här", emptyAnswer: "Skriv ett svar först så provar vi tillsammans.", revealing: "Dagens nästa överraskning avslöjas…",
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
      id: "Illum Bolighus", enabled: true, order: 1, eyebrow: "Första överraskningen",
      title: "Första överraskningen", teaser: "Nu börjar dagen på riktigt. Vi ska ge oss iväg till en plats där du får fria händer att hitta något som du verkligen tycker om.",
      images: [
  {
    src: "/images/1.jpg",
    alt: "Illum Bolighus",
    caption: "[BILDTEXT]"
  }
],

challenge: {
        type: "text", prompt: "Dagens första destination har sina rötter i vårt grannland och är fylld med sådant som kan få ett hem att kännas lite extra fint. Namnet handlar egentligen om ljus, men vi ska inte dit för att köpa lampor. Vart är vi på väg?",
        acceptedAnswers: ["Illum Bolighus", "Illum", "Illums bolighus", "illumbolighus"], ignoreCase: true, ignoreWhitespace: true,
        hint: "Tänk dansk design och inredning. Första delen av namnet för tankarna till något som lyser.",
        successMessage: "Precis rätt, mamma! 🎉",
      },
      reveal: { title: "Vi åker till Illum Bolighus", description: "Där får du shoppa precis vad du vill för 5000 kronor. Sponsorer: Pappa, Carina & Ann-Charlotte", budget: "Din shoppingbudget: 5 000 kr"},   
    },
    {
      id: "lunch", enabled: true, order: 2, eyebrow: "Nästa stopp",
      title: "Nästa stopp", teaser: "Efter shopping och inspiration är det dags att slå sig ner, skåla och äta något riktigt gott.",
      images: [{ src: "/images/restaurang.jpg", alt: "Restaurangen" }],
      challenge: {
        type: "multipleChoice", prompt: "Vilken maträtt brukade du laga som vi barn fortfarande förknippar särskilt mycket med dig?", shuffleOptions: true,
        options: [ // ← markera RÄTT alternativ med isCorrect: true
          { id: "a", label: "Fläskfilé med italienskt täcke", isCorrect: true },
          { id: "b", label: "Pasta Carbonara" }, { id: "c", label: "Bakad potatis" }, { id: "d", label: "Kallops" },
        ],
        successMessage: "Ja just det – det minns vi så väl! ❤️",
      },
      reveal: { title: "Nu väntar en riktigt fin lunch!", description: "Vi åker vidare till Maderiet för en sen lunch tillsammans.", destination: "Maderiet, Bokskogens GK", time: "13:00" },
      didYouKnow: { enabled: true, text: "Våra finaste minnen med dig är dina helt underbara Julbruncher", image: "/images/2.jpg" },
    },
    {
      id: "vila", enabled: true, order: 3, eyebrow: "Lugn före stormen",
      title: "Lugn före stormen", teaser: "Efter dagens första äventyr väntar en liten paus. Du kommer att behöva samla energi, för dagen är långt ifrån slut.",
      images: [{ src: "/images/4.jpg", alt: "Vila och avkoppling" }],
      challenge: {
        type: "text", prompt: "På vilken plats semestrade vi när Jesper bajsade på sig?", acceptedAnswers: ["Liseberg", "liseberg"],
        hint: "En årlig tradition när vi var små", successMessage: "Helt rätt! Vilket minne. ❤️",
      },
      reveal: { title: "Dags för en välförtjänt paus", description: "Nu åker du hem och vilar en stund. Ta det lugnt, byt om och gör dig redo. Kvällen har bara börjat." },
    },
    {
      id: "depeche-mode", enabled: true, order: 4, eyebrow: "Kvällens huvudnummer",
      title: "Kvällens huvudnummer", teaser: "Nu kombinerar vi musik, nostalgi och något gott i glaset. En av dina favoriter står i centrum.",
      images: [{ src: "/images/tarta.jpg", alt: "Konsert eller familjefoto" }],
      challenge: {
        type: "number", prompt: "Vilket år bildades Depeche Mode?", acceptedAnswers: ["1980"],
        hint: "Det var i början av ett årtionde som kom att präglas av synthar, stora frisyrer och ikonisk musik.", successMessage: "Rätt! Du är en riktig kännare. 🎶",
      },
      reveal: { title: "Ikväll blir det Depeche Mode-fest!", description: "Det väntar Depeche Mode, bubbel, tilltugg och en kväll i musikens tecken." },
      didYouKnow: { enabled: true, text: "Vi åkte limousine och träffade Depeche Mode backstage?" },
    },
    {
      id: "middag", enabled: true, order: 5, eyebrow: "Kvällen fortsätter",
      title: "Kvällen fortsätter", teaser: "Musiken och bubblet var bara början. Nu väntar något som samlar dem som betyder allra mest.",
      images: [{ src: "/images/middag.jpg", alt: "Familjemiddag" }],
      challenge: {
        type: "riddle", prompt: "Vilket telefonnummer hade vi innan 447677?", acceptedAnswers: ["446414", "hej"],
        hint: "[LÄGG IN LEDTRÅD]", successMessage: "Du listade ut det! ❤️",
      },
      reveal: {
        title: "Nu blir det middag med familjen", description: "Vi fortsätter kvällen med oxfilé och bearneise! Sponsor och kock: Jesper",
      },
    },
    {
      id: "tarta", enabled: true, order: 6, eyebrow: "Ett sista mysterium",
      title: "Ett sista mysterium", teaser: "Det återstår fortfarande en viktig födelsedagstradition.",
      images: [{ src: "/images/depeche-mode.jpg", alt: "Tårta och presenter" }],
      challenge: {
        type: "multipleChoice", prompt: "Shopping, lunch, vila, bubbel, Depeche Mode och middag. Vad saknas för att dagen officiellt ska kunna kallas ett 60-årsfirande?", shuffleOptions: true,
        options: [{ id: "a", label: "Tårta och presenter", isCorrect: true }, { id: "b", label: "En tupplur till" }, { id: "c", label: "Fyrverkerier" }, { id: "d", label: "Disk och städning" }],
        successMessage: "Ja, mamma. Du är så älskad. ❤️",
      },
      reveal: { title: "Tårta och presentöppning!", description: "Nu avslutar vi dagen med tårta, presenter och ännu mer firande tillsammans." },
      didYouKnow: { enabled: false, text: ""}
    },
  ],

  familyGreetings: [
    { id: "jesper", message: "Grattis mamma! Vi älskar dig mer än vad vi kan beskriva i ord här och hoppas att du har haft en fantastisk dag.", image: "/images/3.jpg"},
  ],
  gallery: { enabled: true, images: [
    { src: "/images/5.jpg", alt: "Familjebild 1", caption: "[BILDTEXT]" },
    { src: "/images/7.jpg", alt: "Familjebild 2" },
    { src: "/images/vila.jpg", alt: "Familjebild 3" },
  ] },
  finale: {
    title: "Grattis på 60-årsdagen, mamma!",
    message: "Den här dagen handlar om dig och om allt du betyder för oss. Tack för alla minnen, all kärlek och allt du gör. Vi hoppas att den här dagen blir ett nytt minne som vi får bära med oss tillsammans.",
    closing: "Vi älskar dig ❤️", image: "/images/familj.jpg"
  },
};
