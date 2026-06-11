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
    title: "Baby",
    description:
      "První společné chvíle plné doteku, blízkosti a jemného pohybu, které podporují zdravý vývoj miminka i jistotu rodiče.",
    highlights: [
      "Zábavné říkanky",
      "Jemná masáž miminek",
      "Hravé cviky pro radost",
    ],
    accent: "sky",
  },
  {
    id: "6-12",
    range: "6-12 měsíců",
    title: "Mini",
    description:
      "Radost z objevování vlastního těla, první pokusy o pohyb a hravé chvíle, kdy se dítě učí s důvěrou vnímat svět kolem sebe.",
    highlights: ["Lezení a plazení", "Hrubá motorika", "Smyslové podněty"],
    accent: "lilac",
  },
  {
    id: "1-2",
    range: "1-2 roky",
    title: "Move",
    description:
      "Období prvních krůčků, zkoušení, objevování a zdokonalování – podporujeme jistotu, rovnováhu i radost z každého nového pohybu.",
    highlights: ["Překážkové dráhy", "Rovnováha a koordinace", "Hudba a tanec"],
    accent: "blush",
  },
  {
    id: "2-3",
    range: "2-3 roky",
    title: "Active",
    description:
      "Společné hry plné smíchu, pohybu a nových dovedností, které posilují samostatnost i přirozenou dětskou energii.",
    highlights: [
      "Hry ve skupině",
      "Prvky gymnastiky",
      "Koncentrace a poslouchání",
    ],
    accent: "cream",
  },
];
