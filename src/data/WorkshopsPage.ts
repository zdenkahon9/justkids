import { workshops, type Workshop } from "./WorkshopsHome";

export type WorkshopsPageMeta = {
  /** Id sekce — kotva pro odkaz `/#workshopy` i scroll-margin */
  sectionId: string;
  /** Podnadpis v intro `.section-subtitle` na detailní stránce */
  subtitle: string;
  /** Popisek nad cenou v `.workshop__price-label` */
  priceLabel: string;
  /** Výchozí cena v `.workshop__price-value`, když workshop nemá vlastní */
  defaultPrice: string;
  /** Nadpis sekce termínů v `.workshop__terms-label` */
  termsLabel: string;
  /** Popisek volných míst v `.workshop__date-spots` */
  spotsLabel: string;
  /** Text tlačítka v `.workshops-page__cta` */
  signupLabel: string;
  /** Text pilulky „Zobrazit všechny termíny“ nad mřížkou */
  showAllDatesLabel: string;
  /** Id sekce všech termínů pod mřížkou workshopů */
  allDatesSectionId: string;
  /** Nadpis sekce všech termínů — první část před `.section-title-accent` */
  allDatesTitle: string;
  /** Zvýrazněná část nadpisu v `.section-title-accent` */
  allDatesTitleAccent: string;
};

export const workshopsPageMeta: WorkshopsPageMeta = {
  sectionId: "workshopy",
  subtitle:
    "Získejte jistotu v péči o své miminko.\nPraktické informace a dovednosti, které využijete v každodenní péči o své miminko.",
  priceLabel: "Cena workshopu",
  defaultPrice: "200 Kč",
  termsLabel: "Nejbližší termíny",
  spotsLabel: "Volná místa:",
  signupLabel: "Přihlásit se na workshop",
  showAllDatesLabel: "Zobrazit všechny termíny",
  allDatesSectionId: "vsechny-terminy",
  allDatesTitle: "Všechny",
  allDatesTitleAccent: "termíny",
};

/** Karty na detailní stránce — sdílí stejná data jako homepage */
export const workshopsPage: Workshop[] = workshops;
