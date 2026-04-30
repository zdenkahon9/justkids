export type Course = {
  id: string;
  title: string;
  year?: string;
  detail?: string;
};

export const courses: Course[] = [
  {
    id: "instruktor-cviceni-rodicu-s-detmi",
    title: "Instruktor cvičení rodičů s dětmi",
    year: "2023",
    detail: "Akreditovaný kurz pro práci s dětmi od 3 měsíců do 3 let.",
  },
  {
    id: "masaze-kojencu",
    title: "Masáže kojenců a batolat",
    year: "2022",
    detail: "Praktický kurz zaměřený na techniky jemné masáže.",
  },
  {
    id: "psychomotoricky-vyvoj",
    title: "Psychomotorický vývoj dítěte",
    year: "2022",
    detail: "Teoretický kurz o vývojových milnících v prvních letech života.",
  },
  {
    id: "prvni-pomoc-deti",
    title: "První pomoc u dětí",
    year: "2024",
    detail: "Pravidelně obnovované školení první pomoci pro nejmenší.",
  },
];
