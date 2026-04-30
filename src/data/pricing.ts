export type PriceTier = {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlight?: boolean;
  accent: "blush" | "sky" | "lilac";
};

export const pricing: PriceTier[] = [
  {
    id: "single",
    name: "Jednorázová lekce",
    price: "200",
    unit: "Kč / lekce",
    description: "Pro vyzkoušení nebo když chcete přijít jen občas.",
    features: ["Jedna lekce dle výběru", "Bez závazků", "Místo dle dostupnosti"],
    accent: "sky",
  },
  {
    id: "5lekci",
    name: "Permanentka 5 lekcí",
    price: "900",
    unit: "Kč / 5 lekcí",
    description: "Nejoblíbenější volba pro pravidelné cvičení.",
    features: ["Sleva oproti jednorázovce", "Platnost 8 týdnů", "Přednostní rezervace"],
    highlight: true,
    accent: "blush",
  },
  {
    id: "10lekci",
    name: "Permanentka 10 lekcí",
    price: "1 700",
    unit: "Kč / 10 lekcí",
    description: "Nejvýhodnější pro dlouhodobé docházení.",
    features: ["Maximální sleva", "Platnost 16 týdnů", "Možnost přerušení"],
    accent: "lilac",
  },
];

export const pricingNote =
  "Ceny jsou orientační a můžou se v jednotlivých lokalitách lišit. Aktuální cenu vždy najdete v rezervačním systému.";
