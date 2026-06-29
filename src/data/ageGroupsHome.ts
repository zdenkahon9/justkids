export type AgeGroupHomeCard = {
  id: string;
  title: string;
  ageRange: string;
  /** Odkaz na sekci na stránce věkových kategorií (desktop) */
  detailHref: string;
  /** Názvy skupin pod věkovým rozsahem */
  groups: string[];
  /** Krátký popis pod oddělovací čárou */
  summary: string;
  /** Iconify název (sada:id) — ilustrace vpravo na kartě */
  icon: string;
  accent: "blush-deep" | "sky-deep";
};

export type AgeGroupsHomeMeta = {
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  detailHref: string;
  ctaLabel: string;
  cardLinkLabel: string;
};

export const ageGroupsHomeMeta: AgeGroupsHomeMeta = {
  sectionId: "vekove-kategorie",
  eyebrow: "Věkové kategorie",
  title: "Pro každý věk",
  titleAccent: "to pravé cvičení",
  subtitle:
    "Od 3 měsíců do 9 let – každá věková skupina má vlastní cvičení přizpůsobené vývoji dítěte.",
  detailHref: "/vekove-kategorie",
  ctaLabel: "Zobrazit všechny kategorie",
  cardLinkLabel: "Zobrazit lekce",
};

/** Teaser karty na homepage — 2 hlavní kategorie */
export const ageGroupsHomeCards: AgeGroupHomeCard[] = [
  {
    id: "s-rodici",
    title: "Cvičení s rodiči",
    detailHref: "/vekove-kategorie#s-rodici",
    ageRange: "3 měsíce - 3 roky",
    groups: ["Baby", "Mini", "Move", "Active"],
    summary: "Zdravý pohybový vývoj od prvních měsíců života.",
    icon: "ph:hand-heart-light",
    accent: "blush-deep",
  },
  {
    id: "bez-rodicu",
    title: "Cvičení bez rodičů",
    detailHref: "/vekove-kategorie#bez-rodicu",
    ageRange: "3 roky - 9 let",
    groups: ["Fit", "Pro"],
    summary: "Rozvoj samostatnosti, sebevědomí a radosti z pohybu.",
    icon: "solar:star-linear",
    accent: "sky-deep",
  },
];
