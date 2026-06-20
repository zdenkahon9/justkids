import { workshops, type Workshop } from "./WorkshopsHome";

export type WorkshopsPageMeta = {
  /** Id sekce — kotva pro odkaz `/#workshopy` i scroll-margin */
  sectionId: string;
  /** Meta description pro <head> detailní stránky */
  pageDescription: string;
  /** Podnadpis v intro `.section-subtitle` na detailní stránce */
  subtitle: string;
  /** Popisek nad cenou v `.workshop__price-label` */
  priceLabel: string;
  /** Nadpis sekce termínů v `.workshop__terms-label` */
  termsLabel: string;
  /** Popisek volných míst v `.workshop__date-spots` */
  spotsLabel: string;
  /** Text tlačítka v `.workshops-page__cta` */
  signupLabel: string;
};

export const workshopsPageMeta: WorkshopsPageMeta = {
  sectionId: "workshopy",
  pageDescription:
    "Praktické workshopy pro rodiče – první pomoc u dětí, handling a psychomotorický vývoj miminek. Dopřejte svému dítěti ten nejlepší start do života.",
  subtitle: "Dopřejte svému miminku ten nejlepší start do života.",
  priceLabel: "Cena workshopu",
  termsLabel: "Nejbližší termíny",
  spotsLabel: "Volná místa:",
  signupLabel: "Přihlásit se na workshop",
};

/** Karty na detailní stránce — sdílí stejná data jako homepage */
export const workshopsPage: Workshop[] = workshops;
