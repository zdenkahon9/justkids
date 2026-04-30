/**
 * Novinky - aktualizujte ručně.
 *
 * - title: nadpis novinky
 * - date: datum ve formátu YYYY-MM-DD (řazení od nejnovější)
 * - text: krátký popis (1-3 věty)
 * - link (volitelné): externí odkaz, např. registrace nebo článek
 */

export type NewsItem = {
  title: string;
  date: string; // YYYY-MM-DD
  text: string;
  link?: {
    href: string;
    label: string;
  };
};

export const news: NewsItem[] = [
  {
    title: "Nový jarní kurz pro miminka 3-6 měsíců",
    date: "2026-04-15",
    text: "Otevíráme nový kurz ve Zdicích pro nejmenší. Lekce probíhají každou středu dopoledne. Místa jsou omezená!",
    link: { href: "#rezervace", label: "Rezervovat místo" },
  },
  {
    title: "Léto bez cvičení? Ne s námi!",
    date: "2026-04-02",
    text: "I přes letní pauzu připravujeme menší prázdninové setkání v parku. Sledujte Instagram pro detaily.",
  },
  {
    title: "Yogasee Hořovice - nové časy lekcí",
    date: "2026-03-20",
    text: "Od dubna posouváme lekce v Hořovicích na čtvrtek 9:30 a 10:45. Více času na čaj a klábosení po cvičení.",
  },
];
