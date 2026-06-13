export type AgeGroupPage = {
  id: string;
  range: string;
  title: string;
  description: string;
  highlights: string[];
  /** Krátký řádek pod věkem — vynechá se, pokud chybí */
  groupsLabel?: string;
  /** Iconify název (sada:id) — ikona pro kartu na detailní stránce */
  icon: string;
  accent: "blush" | "sky" | "lilac" | "cream";
  optional?: boolean;
};

export type AgeGroupsPageMeta = {
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  pageDescription: string;
};

export const ageGroupsPageMeta: AgeGroupsPageMeta = {
  sectionId: "vekove-skupiny",
  eyebrow: "Věkové kategorie",
  title: "Pro každý věk",
  titleAccent: "to pravé cvičení",
  subtitle:
    "Každá věková skupina má vlastní náplň – od jemné stimulace pro miminka po budování radost ze cvičení u školních dětí. Vše v klidu a v tempu, které dítěti vyhovuje.",
  pageDescription:
    "Přehled věkových skupin JustKids – od miminek 3–6 měsíců po batolata 2–3 roky. Každá kategorie má vlastní náplň cvičení.",
};

/** Karty — cvičení s rodiči (Baby, Mini, Move, Active) */
export const ageGroupsPageWithParents: AgeGroupPage[] = [
  {
    id: "3-6",
    range: "3-6 měsíců",
    title: "Baby",
    groupsLabel: "od 3 měsíců",
    description:
      "První společné chvíle plné doteku, blízkosti a jemného pohybu, které podporují zdravý vývoj miminka i jistotu rodiče.",
    highlights: [
      "Zábavné říkanky",
      "Jemná masáž miminek",
      "Hravé cviky pro radost",
    ],
    icon: "fxemoji:cherryblossom",
    accent: "sky",
  },
  {
    id: "6-12",
    range: "6-12 měsíců",
    title: "Mini",
    groupsLabel: "od rozlezení",
    description:
      "Radost z objevování vlastního těla, první pokusy o pohyb a hravé chvíle, kdy se dítě učí s důvěrou vnímat svět kolem sebe.",
    highlights: ["Lezení a plazení", "Hrubá motorika", "Smyslové podněty"],
    icon: "twemoji:hatching-chick",
    accent: "lilac",
  },
  {
    id: "1-2",
    range: "1-2 roky",
    title: "Move",
    groupsLabel: "od chůze",
    description:
      "Období prvních krůčků, zkoušení, objevování a zdokonalování – podporujeme jistotu, rovnováhu i radost z každého nového pohybu.",
    highlights: ["Překážkové dráhy", "Rovnováha a koordinace", "Hudba a tanec"],
    icon: "noto-v1:lion",
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
    icon: "emojione:monkey-face",
    accent: "cream",
  },
];

/** Karty — cvičení bez rodičů (Fit, Pro) */
export const ageGroupsPageWithoutParents: AgeGroupPage[] = [
  {
    id: "fit",
    range: "3-6 let",
    title: "Fit",
    description:
      "Pohyb jako radost, jistota i zdravý základ do života – děti si budují vztah ke sportu hravou a přirozenou cestou.",
    highlights: [],
    icon: "noto:seedling",
    accent: "sky",
  },
  {
    id: "pro",
    range: "6-9 let",
    title: "Pro",
    description:
      "Energie, pohyb a zábava v jednom. Děti si budují zdravý vztah k pohybu, získávají sebevědomí a především si užívají aktivní čas plný radosti a nových zážitků.",
    highlights: [],
    icon: "fxemoji:rocket",
    accent: "lilac",
  },
];

/** @deprecated Použij ageGroupsPageWithParents — zachováno pro kompatibilitu */
export const ageGroupsPage = ageGroupsPageWithParents;
