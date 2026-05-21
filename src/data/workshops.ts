/** One bullet in the card; optional `points` render as a nested list under the same `<li>`. */
export type WorkshopHighlight =
  | string
  | {
      text: string;
      points?: string[];
    };

export type Workshop = {
  id: string;
  title: string;
  /** Short bullet points shown under the title */
  highlights: WorkshopHighlight[];
  /** When omitted, the card hides the duration pill */
  duration?: string;
  forWhom: string;
  accent: "blush" | "blush-deep" | "sky" | "sky-deep" | "lilac" | "lilac-deep";
  upcoming?: string;
};

export const workshops: Workshop[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    highlights: [
      "Specifika dětské první pomoci",
      {
        text: "Řešení nejčastějších situací:",
        points: ["resuscitace", "dušení", "úrazy", "krvácení", "popáleniny"],
      },
    ],
    // duration: "90 min",
    forWhom: "Rodiče s miminky 0–6 měsíců",
    accent: "sky-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "handling-a-psychomotoricky-vyvoj",
    title: "Handling a psychomotorický vývoj",
    highlights: [
      "Správná manipulace",
      "Správné polohování",
      "Vývoj krok za krokem",
      "Podpora přirozeného vývoje",
      "Vhodné / nevhodné pomůcky",
      "Kdy vyhledat odborníka",
    ],
    // duration: "2 h",
    forWhom: "Miminka 0–6 měsíců",
    accent: "lilac-deep",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "psychomotoricky-vyvoj-prevence",
    title: "Psychomotorický vývoj & prevence",
    highlights: [
      "Vývojové milníky a podpora doma",
      "Praktické ukázky a doporučení",
    ],
    // duration: "2 h",
    forWhom: "Rodiče miminek 0–12 měsíců",
    accent: "blush-deep",
    upcoming: "Termín na vyžádání",
  },
];
