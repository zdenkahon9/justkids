export type WorkshopsHomeMeta = {
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  detailHref: string;
  ctaLabel: string;
};

export const workshopsHomeMeta: WorkshopsHomeMeta = {
  sectionId: "workshopy",
  eyebrow: "Další akce",
  title: "Workshopy",
  titleAccent: "pro rodiče",
  subtitle:
    "Praktické workshopy pro rodiče miminek a malých dětí. Dopřejte svému miminku ten nejlepší start do života.",
  detailHref: "/workshopy",
  ctaLabel: "Všechny workshopy",
};

export type Workshop = {
  id: string;
  title: string;
  /** Text v `.workshop__summary` */
  summary: string;
  /** Odrážky v `.workshop__details` — jedna položka = jedno `<li>` */
  highlights: string[];
  /** When omitted, the card hides the duration pill */
  duration?: string;
  /** Věkový rozsah mezi `.workshop__header` a `.workshop__summary` */
  ageRange?: string;
  forWhom: string;
  accent: "blush" | "blush-deep" | "sky" | "sky-deep" | "lilac" | "lilac-deep";
  upcoming?: string;
};

export const workshops: Workshop[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    summary:
      "Jak reagovat v krizových situacích a poskytnout dítěti první pomoc.",
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
    accent: "blush-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "handling-a-psychomotoricky-vyvoj",
    title: "Handling a psychomotorický vývoj",
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
    accent: "lilac-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "psychomotoricky-vyvoj-prevence",
    title: "Psychomotorický vývoj & prevence",
    summary:
      "Jak předcházet obtížím ve vývoji a podpořit přirozený rozvoj pohybu a vnímání.",
    highlights: [
      "Vývojové milníky a podpora doma",
      "Praktické ukázky a doporučení",
    ],
    forWhom: "Rodiče miminek 0–12 měsíců",
    ageRange: "6-12 měsíců",
    accent: "sky-deep",
    upcoming: "Termín na vyžádání",
  },
];
