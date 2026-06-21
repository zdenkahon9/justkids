export type Camp = {
  id: string;
  title: string;
  date: string;
  place: string;
  summary: string;
  accent: "blush" | "sky" | "lilac";
};

export const camps: Camp[] = [
  {
    id: "letni-vyjezd",
    title: "Letní víkendový výjezd",
    date: "Léto 2026",
    place: "Penzion v Brdech",
    summary:
      "Prodloužený víkend pro rodiče s dětmi. Společné cvičení v přírodě, hry, čaj u krbu a klid pro celou rodinu.",
    accent: "blush",
  },
  {
    id: "podzimni-kemp",
    title: "Podzimní kemp pro maminky",
    date: "Podzim 2026",
    place: "Berounsko",
    summary:
      "Tři dny zaměřené na pohyb, dech a sdílení. Vhodné i pro maminky s mladšími miminky v šátku.",
    accent: "sky",
  },
];
