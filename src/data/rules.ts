export type Rule = {
  id: number;
  title: string;
  detail: string;
};

/**
 * Pravidla chování na lekci - jednoduchá pravidla,
 * která pomáhají, aby byly lekce bezpečné a příjemné pro všechny.
 */
export const rules: Rule[] = [
  {
    id: 1,
    title: "Pití a plenku s sebou",
    detail: "Vodu, plenku, podložku a ručník si přineste vlastní.",
  },
  {
    id: 2,
    title: "Odhláška 24 h předem",
    detail: "Pokud nemůžete přijít, dejte mi prosím vědět den předem, ať lekci využije někdo další.",
  },
];
