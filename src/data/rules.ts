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
    icon: "iconoir:clean-water",
  },
  {
    id: 2,
    title: "Odhlášení\n z lekce do 19.00",
    detail: "Nemůžete-li přijít, dejte mi prosím vědět do 19.00 předchozího dne.",
    accent: "sky-deep",
    icon: "ph:clock-counter-clockwise-fill",
  },
  {
    id: 3,
    title: "Jsme tu jeden\npro druhého",
    detail:
      "Telefon necháváme v šatně. Těchto 45 minut je časem pro budování vztahu s dítětem.",
    accent: "blush-deep",
    icon: "local:phone-off",
  },
  {
    id: 4,
    title: "Rodič je parťák,\nne divák",
    detail:
      "Děti nás kopírují. Když cvičí, skáče a raduje se máma nebo táta, dítě se přidá mnohem radostněji.",
    accent: "sky-deep",
    icon: "material-symbols-light:handshake-outline-rounded",
  },
  {
    id: 5,
    title: "Bezpečnost\nna prvním místě",
    detail:
      "V tělocvičně neběháme s jídlem v puse. Na nářadí jistící rodič vždy stojí u dítěte (jistíme za trup, ne za ruce).",
    accent: "blush-deep",
    icon: "stash:shield-duotone",
  },
  {
    id: 6,
    title: "Respektujeme\ntempo",
    detail:
      "Pokud dítě nechce cvičit, nenuťte ho. Může se jen dívat – i pozorování je forma učení.",
    accent: "sky-deep",
    icon: "fluent:hand-open-heart-20-regular",
  },
  {
    id: 7,
    title: "Čistý\nprostor",
    detail: "Do tělocvičny vstupujeme v ponožkách (nebo naboso) a bez pití.",
    accent: "blush-deep",
    icon: "ion:sparkles-outline",
  },
  {
    id: 8,
    title: "Uklízíme\nspolečně",
    detail:
      "Pomůcky uklízíme společně s dětmi. Je to součást výchovy a rituálu ukončení lekce.",
    accent: "sky-deep",
    icon: "ph:broom",
  },
];
