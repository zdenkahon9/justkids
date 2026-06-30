import { ROUTE_IDS } from "../config/routes";

export type WorkshopsPageMeta = {
  /** Id sekce — kotva pro odkaz `/#workshopy` i scroll-margin */
  sectionId: string;
  title: string;
  titleAccent: string;
  /** Podnadpis v intro `.section-subtitle` na detailní stránce */
  subtitle: string;
  /** Popisek nad cenou v `.workshop__price-label` */
  priceLabel: string;
  /** Výchozí cena v `.workshop__price-value`, když workshop nemá vlastní */
  defaultPrice: string;
  /** Nadpis sekce termínů v `.workshop__terms-label` */
  termsLabel: string;
  /** Text tlačítka v `.workshops-page__cta` */
  signupLabel: string;
  /** Text pilulky „Zobrazit všechny termíny“ nad mřížkou */
  showAllDatesLabel: string;
};

export const workshopsPageMeta: WorkshopsPageMeta = {
  sectionId: ROUTE_IDS.workshops.page,
  title: "Workshopy",
  titleAccent: "pro rodiče",
  subtitle:
    "Získejte jistotu v péči o své miminko.\nPraktické informace a dovednosti, které využijete v každodenní péči o své miminko.",
  priceLabel: "Cena workshopu",
  defaultPrice: "200 Kč",
  termsLabel: "Nejbližší termíny",
  signupLabel: "Přihlásit se na workshop",
  showAllDatesLabel: "Zobrazit všechny termíny",
};

export type WorkshopDateSlot = {
  /** Den v měsíci v `.workshop__date-day` */
  day: string;
  /** Zkratka měsíce v `.workshop__date-month` */
  month: string;
  time: string;
  venueName: string;
  href?: string;
};

export type WorkshopPage = {
  id: string;
  title: string;
  /** Odrážky v `.workshop__details` — jedna položka = jedno `<li>` */
  highlights: string[];
  /** Věkový rozsah v `.workshop__header` (WorkshopsPage) */
  ageRange?: string;
  /** Cena v `.workshop__price-value` na WorkshopsPage */
  price?: string;
  /** Termíny v `.workshop__dates` na WorkshopsPage */
  dates?: WorkshopDateSlot[];
  accent: "blush" | "blush-deep" | "sky" | "sky-deep" | "lilac" | "lilac-deep";
};

const prvniPomocDates: WorkshopDateSlot[] = [
  {
    day: "4",
    month: "KVĚ",
    time: "od 18:15",
    venueName: "Centrum Rosenbaum",
  },
  {
    day: "7",
    month: "KVĚ",
    time: "od 16:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    day: "16",
    month: "KVĚ",
    time: "od 9:00",
    venueName: "Yogasee Hořovice",
  },
];

const handlingDates: WorkshopDateSlot[] = [
  {
    day: "12",
    month: "KVĚ",
    time: "od 20:00",
    venueName: "Centrum Rosenbaum",
  },
  {
    day: "15",
    month: "KVĚ",
    time: "od 17:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    day: "16",
    month: "KVĚ",
    time: "od 11:00",
    venueName: "Yogasee Hořovice",
  },
];

const prevenceDates: WorkshopDateSlot[] = [
  {
    day: "25",
    month: "KVĚ",
    time: "od 18:15",
    venueName: "Centrum Rosenbaum",
  },
  {
    day: "21",
    month: "KVĚ",
    time: "od 16:00",
    venueName: "Fitcentrum Zdice",
  },
  {
    day: "16",
    month: "KVĚ",
    time: "od 13:00",
    venueName: "Yogasee Hořovice",
  },
];

/** Iconify názvy (sada:id) — mapování podle id workshopu */
export const workshopIconById: Record<string, string> = {
  "prvni-pomoc-u-deti": "fluent:briefcase-medical-24-regular",
  "handling-a-psychomotoricky-vyvoj": "streamline-sharp:health-care-2",
  "psychomotoricky-vyvoj-prevence": "ph:brain",
};

/** Karty na detailní stránce `/workshopy` */
export const workshopsPage: WorkshopPage[] = [
  {
    id: "prvni-pomoc-u-deti",
    title: "První pomoc u dětí",
    highlights: [
      "Specifika dětské první pomoci",
      "Řešení nejčastějších situací",
      "Resuscitace",
      "Dušení",
      "Úrazy",
      "Krvácení",
      "Popáleniny",
    ],
    ageRange: "nejen pro rodiče",
    price: "200 Kč",
    dates: prvniPomocDates,
    accent: "blush-deep",
  },
  {
    id: "handling-a-psychomotoricky-vyvoj",
    title: "Handling a psychomotorický vývoj",
    highlights: [
      "Správná manipulace",
      "Správné polohování",
      "Vývoj krok za krokem",
      "Podpora přirozeného vývoje",
      "Vhodné / nevhodné pomůcky",
      "Kdy vyhledat odborníka",
    ],
    ageRange: "0-6 měsíců",
    price: "200 Kč",
    dates: handlingDates,
    accent: "lilac-deep",
  },
  {
    id: "psychomotoricky-vyvoj-prevence",
    title: "Psychomotorický vývoj & prevence",
    highlights: [
      "Vývoj krok za krokem",
      "Podpora přirozeného vývoje",
      "Vhodné / nevhodné pomůcky",
      "Prevence špatného držení těla",
      "Botičky - kdy a jaké",
      "Valgozita, w-sed, zkřížené syndromy",
      "Kdy vyhledat odborníka",
    ],
    ageRange: "6-12 měsíců",
    price: "200 Kč",
    dates: prevenceDates,
    accent: "sky-deep",
  },
];
