export type AgeGroup = {
  id: string;
  range: string;
  title: string;
  description: string;
  highlights: string[];
  accent: "blush" | "sky" | "lilac" | "cream";
  optional?: boolean;
};

export const ageGroups: AgeGroup[] = [
  {
    id: "3-6",
    range: "3-6 měsíců",
    title: "První dotek pohybu",
    description:
      "Jemná stimulace, masáže a polohování. Posilujeme krční svalstvo a otáčení, učíme se vnímat rytmus.",
    highlights: ["Masáž miminka", "Polohování na bříšku", "Říkanky a písničky"],
    accent: "sky",
  },
  {
    id: "6-12",
    range: "6-12 měsíců",
    title: "Objevuju svět",
    description:
      "Plazení, lezení, sed a první stavění. Hravé cviky, které podpoří přirozený vývoj a koordinaci.",
    highlights: ["Lezení a plazení", "Hrubá motorika", "Smyslové podněty"],
    accent: "blush",
  },
  {
    id: "1-2",
    range: "1-2 roky",
    title: "Malí průzkumníci",
    description:
      "Chůze, běh, první přeskoky a překážkové dráhy. Spousta her, balónků a společné radosti.",
    highlights: ["Překážkové dráhy", "Rovnováha a koordinace", "Hudba a tanec"],
    accent: "lilac",
  },
  {
    id: "2-3",
    range: "2-3 roky",
    title: "Šikulové v pohybu",
    description:
      "Skupinové hry, jednoduché cviky podle pokynů a první gymnastické prvky. Stavíme zdravé pohybové návyky.",
    highlights: ["Hry ve skupině", "Prvky gymnastiky", "Koncentrace a poslouchání"],
    accent: "cream",
  },
];
