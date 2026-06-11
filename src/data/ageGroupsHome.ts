export type AgeGroupHomeCard = {
  id: string;
  title: string;
  ageRange: string;
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
};

export const ageGroupsHomeMeta: AgeGroupsHomeMeta = {
  sectionId: "vekove-kategorie",
  eyebrow: "Věkové kategorie",
  title: "Pro každý věk",
  titleAccent: "to pravé cvičení",
  subtitle:
    "Čtyři věkové skupiny od 3 měsíců do 3 let – vyberte tu, která sedí vašemu dítěti.",
  detailHref: "/vekove-kategorie",
  ctaLabel: "Zobrazit všechny kategorie",
};

/** Teaser karty na homepage — 2 hlavní kategorie */
export const ageGroupsHomeCards: AgeGroupHomeCard[] = [
  {
    id: "s-rodici",
    title: "Cvičení s rodiči",
    ageRange: "3 měsíce - 3 roky",
    groups: ["Baby", "Mini", "Move", "Active"],
    summary: "Zdravý pohybový vývoj od prvních měsíců života.",
    icon: "ph:hand-heart-light",
    accent: "blush-deep",
  },
  {
    id: "bez-rodicu",
    title: "Cvičení bez rodičů",
    ageRange: "3 roky - 9 let",
    groups: ["Fit", "Pro"],
    summary: "Rozvoj samostatnosti, sebevědomí a radosti z pohybu.",
    icon: "mage:star",
    accent: "sky-deep",
  },
];
