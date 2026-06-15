export type Rule = {
  id: number;
  title: string;
  detail: string;
  accent: "blush-deep" | "sky-deep";
  /** Iconify název (sada:id) — ilustrace vpravo na kartě */
  icon?: string;
};

/**
 * Pravidla chování na lekci - jednoduchá pravidla,
 * která pomáhají, aby byly lekce bezpečné a příjemné pro všechny.
 */
export const rules: Rule[] = [
  {
    id: 1,
    title: "Pití a plenku\ns sebou",
    detail: "Nezapomeňte prosím na pití a náhradní plenku pro své děťátko.",
    accent: "blush-deep",
    icon: "ph:backpack-light",
  },
  {
    id: 2,
    title: "Odhlášení\n24h předem",
    detail: "Pokud nemůžete přijít, dejte mi prosím vědět den předem.",
    accent: "sky-deep",
    icon: "ph:clock-counter-clockwise-light",
  },
];
