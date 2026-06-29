export type CampFeatureIcon = {
  icon: string;
  accentDeep: string;
  accentSoft: string;
};

/** Ikony pod nadpisem kempu — pohyb, tvoření, radost */
export const campFeatureIcons: CampFeatureIcon[] = [
  {
    icon: "healthicons:running-outline",
    accentDeep: "var(--color-blush-vivid)",
    accentSoft: "var(--color-blush-soft)",
  },
  {
    icon: "ph:paint-brush",
    accentDeep: "var(--color-lilac-deep)",
    accentSoft: "var(--color-lilac-soft)",
  },
  {
    icon: "ph:smiley",
    accentDeep: "#e8943a",
    accentSoft: "var(--color-apricot-soft)",
  },
];

export type Camp = {
  title: string;
  city: string;
  dateRange: string;
  time: string;
  venue: {
    name: string;
    address?: string;
  };
  audience: {
    primary: string;
    secondary: string;
  };
  price: string;
  accent: "blush" | "sky" | "lilac";
};

export const campsMeta = {
  /** Popisek nad cenou v `.camp__price` */
  priceLabel: "Cena:",
  /** Text tlačítka v `.camp__cta` — stejná role jako `signupLabel` u workshopů */
  signupLabel: "Přihlásit se na kemp",
  /** Štítek denního programu v `.camp__daily-badge` */
  dailyLabel: "Každý den",
  /** Položky denního programu — v `.camp__daily-list` v jedné řádce */
  dailyProgram: ["Pohyb", "Tvoření", "Volná zábava"],
};

export const camps: Camp[] = [
  {
    title: "Letní příměstský kemp",
    city: "Zdice",
    dateRange: "7. – 10. července",
    time: "9:00 – 12:00",
    venue: {
      name: "Dětská skupina Špunti",
      address: "Černín 96, Zdice",
    },
    audience: {
      primary: "Děti 1-3 roky",
      secondary: "v doprovodu dospělé osoby",
    },
    price: "1 400 Kč",
    accent: "blush",
  },
  {
    title: "Letní příměstský kemp",
    city: "Broumy",
    dateRange: "17. – 21. srpna",
    time: "9:00 – 12:00",
    venue: {
      name: "Centrum Rosenbaum",
      address: "Na Návsi 11, Broumy",
    },
    audience: {
      primary: "Děti 1-3 roky",
      secondary: "v doprovodu dospělé osoby",
    },
    price: "1 750 Kč",
    accent: "lilac",
  },
];
