export type Workshop = {
  id: string;
  title: string;
  summary: string;
  /** When omitted, the card hides the duration pill */
  duration?: string;
  forWhom: string;
  accent: "blush" | "sky" | "lilac";
  upcoming?: string;
};

export const workshops: Workshop[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    summary:
      "Naučíte se základní hmaty pro každodenní zklidnění miminka. Krátký workshop, ze kterého si odnesete praktické dovednosti.",
    // duration: "90 min",
    forWhom: "Rodiče s miminky 0–6 měsíců",
    accent: "blush",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "nosenidetí",
    title: "Nošení dětí v šátku",
    summary:
      "Ukážeme si bezpečné vázání šátku a nosítka. Probereme správné polohy a tipy do běžného dne.",
    duration: "2 h",
    forWhom: "Rodiče s dětmi 0–18 měsíců",
    accent: "sky",
    upcoming: "Termín na vyžádání",
  },
  {
    id: "psychomotoricky-vyvoj",
    title: "Psychomotorický vývoj",
    summary:
      "Co se v miminku děje vývojově a jak ho podpořit doma? Workshop plný praktických ukázek a doporučení.",
    duration: "2 h",
    forWhom: "Rodiče miminek 0–12 měsíců",
    accent: "lilac",
    upcoming: "Termín na vyžádání",
  },
];
