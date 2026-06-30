import { ROUTE_IDS, ROUTES } from "../config/routes";

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
  sectionId: ROUTE_IDS.home.workshops,
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
  detailHref: ROUTES.workshops._,
  ctaLabel: "Všechny workshopy",
};

export type WorkshopHome = {
  id: string;
  title: string;
  /** Věkový rozsah v `.workshop__header` (WorkshopsHome) */
  ageRange?: string;
  /** Krátký popis pod názvem v `.workshops-home__topic-summary` */
  homeSummary?: string;
  accent: "blush" | "blush-deep" | "sky" | "sky-deep" | "lilac" | "lilac-deep";
};

/** Iconify názvy (sada:id) — mapování podle id workshopu */
export const workshopIconById: Record<string, string> = {
  "prvni-pomoc-u-deti": "fluent:briefcase-medical-24-regular",
  "handling-a-psychomotoricky-vyvoj": "streamline-sharp:health-care-2",
  "psychomotoricky-vyvoj-prevence": "ph:brain",
};

/** Teaser workshopy na homepage */
export const workshops: WorkshopHome[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    homeSummary: "Specifika dětské první pomoci a krizové situace.",
    ageRange: "nejen pro rodiče",
    accent: "blush-deep",
  },
  {
    id: "handling-a-psychomotoricky-vyvoj",
    title: "Handling a psychomotorický vývoj",
    homeSummary: "Vývoj dítěte a správné zacházení.",
    ageRange: "0-6 měsíců",
    accent: "lilac-deep",
  },
  {
    id: "psychomotoricky-vyvoj-prevence",
    title: "Psychomotorický vývoj & prevence",
    homeSummary: "Vývoj dítěte krok za krokem a prevence obtíží.",
    ageRange: "6-12 měsíců",
    accent: "sky-deep",
  },
];
