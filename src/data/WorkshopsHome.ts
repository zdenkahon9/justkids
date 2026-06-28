export type WorkshopsHomeMeta = {
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  /** Text v `.workshops-home__note` před zvýrazněním */
  cardNoteLead: string;
  /** Zvýrazněná část (růžová) v `.workshops-home__note` */
  cardNoteHighlight: string;
  /** Text v `.workshops-home__note` po zvýraznění */
  cardNoteTail: string;
  /** Popis v levém sloupci karty (desktop 1024px+) */
  cardNoteDescription: string;
  /** Text v `.workshops-home__info` pod seznamem workshopů */
  cardInfoText: string;
  detailHref: string;
  ctaLabel: string;
};

export const workshopsHomeMeta: WorkshopsHomeMeta = {
  sectionId: "workshopy",
  eyebrow: "Další akce",
  title: "Workshopy",
  titleAccent: "pro rodiče",
  subtitle:
    "Praktické workhopy nejen pro rodiče zaměřené na první pomoc u dětí, handling miminek a psychomotorický vývoj.",
  cardNoteLead: "Dopřejte svému miminku ten",
  cardNoteHighlight: "nejlepší start",
  cardNoteTail: "do života.",
  cardNoteDescription:
    "Naše workshopy vám pomohou získat jistotu, pochopit potřeby dítěte a podpořit jeho zdravý vývoj.",
  cardInfoText: "Aktuální termíny a místa konání najdete v detailu.",
  detailHref: "/workshopy",
  ctaLabel: "Všechny workshopy",
};

export type WorkshopDateSlot = {
  id: string;
  /** Den v měsíci v `.workshop__date-day` */
  day: string;
  /** Zkratka měsíce v `.workshop__date-month` */
  month: string;
  time: string;
  venueName: string;
  href?: string;
};

export type Workshop = {
  id: string;
  title: string;
  /** Text pro `.workshop__summary` — render v WorkshopsHome (zatím vypnuto) */
  summary: string;
  /** Odrážky v `.workshop__details` — jedna položka = jedno `<li>` */
  highlights: string[];
  /** When omitted, the card hides the duration pill */
  duration?: string;
  /** Věkový rozsah v `.workshop__header` (WorkshopsPage) */
  ageRange?: string;
  forWhom: string;
  /** Krátký popis pod názvem v `.workshops-home__topic-summary` */
  homeSummary?: string;
  /** Cena v `.workshop__price-value` na WorkshopsPage */
  price?: string;
  /** Termíny v `.workshop__dates` na WorkshopsPage */
  dates?: WorkshopDateSlot[];
  accent: "blush" | "blush-deep" | "sky" | "sky-deep" | "lilac" | "lilac-deep";
  upcoming?: string;
};

const prvniPomocDates: WorkshopDateSlot[] = [
  {
    id: "prvni-pomoc-rosenbaum",
    day: "4",
    month: "KVĚ",
    time: "od 18:15",
    venueName: "Centrum Rosenbaum",
  },
  {
    id: "prvni-pomoc-zdice",
    day: "7",
    month: "KVĚ",
    time: "od 16:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    id: "prvni-pomoc-horovice",
    day: "16",
    month: "KVĚ",
    time: "od 9:00",
    venueName: "Yogasee Hořovice",
  },
];

const handlingDates: WorkshopDateSlot[] = [
  {
    id: "handling-rosenbaum",
    day: "12",
    month: "KVĚ",
    time: "od 20:00",
    venueName: "Centrum Rosenbaum",
  },
  {
    id: "handling-zdice",
    day: "15",
    month: "KVĚ",
    time: "od 17:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    id: "handling-horovice",
    day: "16",
    month: "KVĚ",
    time: "od 11:00",
    venueName: "Yogasee Hořovice",
  },
];

const prevenceDates: WorkshopDateSlot[] = [
  {
    id: "prevence-rosenbaum",
    day: "25",
    month: "KVĚ",
    time: "od 18:15",
    venueName: "Centrum Rosenbaum",
  },
  {
    id: "prevence-zdice",
    day: "21",
    month: "KVĚ",
    time: "od 16:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    id: "prevence-horovice",
    day: "16",
    month: "KVĚ",
    time: "od 13:00",
    venueName: "Yogasee Hořovice",
  },
];

/** Iconify názvy (sada:id) — mapování podle id workshopu */
export const workshopIconById: Record<string, string> = {
  "prvni-pomoc-u-deti": "fluent:briefcase-medical-24-regular",
  "handling-a-psychomotoricky-vyvoj": "streamline-sharp:health-care-2",
  "psychomotoricky-vyvoj-prevence": "ph:brain",
};

export const workshops: Workshop[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    homeSummary: "Specifika dětské první pomoci a krizové situace.",
    summary: "Jak reagovat v krizových situacích a poskytnout dítěti první pomoc.",
    highlights: [
      "Specifika dětské první pomoci",
      "Řešení nejčastějších situací",
      "Resuscitace",
      "Dušení",
      "Úrazy",
      "Krvácení",
      "Popáleniny",
    ],
    forWhom: "Rodiče s miminky 0–6 měsíců",
    ageRange: "nejen pro rodiče",
    price: "200 Kč",
    dates: prvniPomocDates,
    accent: "blush-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "handling-a-psychomotoricky-vyvoj",
    title: "Handling a psychomotorický vývoj",
    homeSummary: "Vývoj dítěte a správné zacházení.",
    summary: "Porozumění pohybovému vývoji dítěte a správnému zacházení.",
    highlights: [
      "Správná manipulace",
      "Správné polohování",
      "Vývoj krok za krokem",
      "Podpora přirozeného vývoje",
      "Vhodné / nevhodné pomůcky",
      "Kdy vyhledat odborníka",
    ],
    forWhom: "Miminka 0–6 měsíců",
    ageRange: "0-6 měsíců",
    price: "200 Kč",
    dates: handlingDates,
    accent: "lilac-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "psychomotoricky-vyvoj-prevence",
    title: "Psychomotorický vývoj & prevence",
    homeSummary: "Vývoj dítěte krok za krokem a prevence obtíží.",
    summary:
      "Jak předcházet obtížím ve vývoji a podpořit přirozený rozvoj pohybu a vnímání.",
    highlights: [
      "Vývoj krok za krokem",
      "Podpora přirozeného vývoje",
      "Vhodné / nevhodné pomůcky",
      "Prevence špatného držení těla",
      "Botičky - kdy a jaké",
      "Valgozita, w-sed, zkřížené syndromy",
      "Kdy vyhledat odborníka",
    ],
    forWhom: "Rodiče miminek 0–12 měsíců",
    ageRange: "6-12 měsíců",
    price: "200 Kč",
    dates: prevenceDates,
    accent: "sky-deep",
    upcoming: "Termín na vyžádání",
  },
];
