# Födelsedagsäventyret

## Installation
```
npm install
npm run dev        # utvecklingsserver (http://localhost:5173)
npm run build      # bygg till dist/
npm run preview    # förhandsgranska bygget
```

## Ändra aktiviteter (allt i `src/config/experienceConfig.ts`)
- **Ändra:** redigera texterna i steget under `steps`.
- **Byt ordning:** ändra `order` (lägst först).
- **Inaktivera:** `enabled: false`.
- **Nytt steg:** kopiera ett helt block i `steps`, ge nytt unikt `id` och `order`. Inget annat behöver ändras.
- **Ta bort:** radera blocket.
- Tips: tryck "Starta om dagen" efter ändringar när du testar (framsteg sparas i localStorage).

## Ändra frågor
- `challenge.prompt` är frågan. `type`: `text`, `number`, `riddle`, `multipleChoice`, `sequence`.
- Flera godkända svar: `acceptedAnswers: ["Svar 1", "Svar 2"]`. Versaler och mellanslag ignoreras som standard; `ignoreSwedishDiacritics: true` gör å/ä/ö = a/o.
- Flervalsfråga: `options` med `isCorrect: true` på rätt alternativ. Blandning: `shuffleOptions`.
- `sequence`: skriv `options` i RÄTT ordning – de blandas automatiskt och mamma trycker i rätt följd.
- Ledtråd: `hint` (ta bort raden = ingen ledtråd). Framhävning efter X fel: `settings.wrongAttemptsBeforeHint`.

## Lägga till bilder
- Lägg filer i `public/images/` (JPG eller WebP, helst under 500 kB; 4:3 eller 3:2 liggande, välkomstbilden gärna stående 4:5).
- Sökväg i config: `"/images/mittnamn.jpg"`. Flera bilder på ett steg: lägg till fler objekt i `images: [...]`.
- Saknas en bild visas en snygg reservyta.

## Lägga till ljudhälsningar
- Lägg filer i `public/audio/` (MP3 eller M4A).
- Config: `audioGreeting: { enabled: true, src: "/audio/namn.mp3", title: "...", from: "Namn" }`.
- Avstängt för ett steg: `enabled: false` (eller ta bort raden).
- `autoplayAfterReveal: true` försöker spela direkt; blockerar webbläsaren visas en knapp. Ljud startar annars aldrig av sig själv.
- Gemensam hälsning på finalen: `finale.audio`.

## Ändra familjeminnen ("Visste du att…")
`didYouKnow: { enabled: true, heading?, text, image? }` per steg. `enabled: false` stänger av.

## Publicering
- **Netlify:** `npm run build`, dra mappen `dist/` till app.netlify.com/drop (eller koppla repot: build `npm run build`, publish `dist`).
- **Vercel:** importera repot, Vite upptäcks automatiskt.
