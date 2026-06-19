import { workshops, type Workshop } from "./WorkshopsHome";

export type WorkshopsPageMeta = {
  /** Id sekce — kotva pro odkaz `/#workshopy` i scroll-margin */
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  /** Meta description pro <head> detailní stránky */
  pageDescription: string;
};

export const workshopsPageMeta: WorkshopsPageMeta = {
  sectionId: "workshopy",
  eyebrow: "Další akce",
  title: "Workshopy",
  titleAccent: "pro rodiče",
  subtitle:
    "Praktické workshopy pro rodiče miminek a malých dětí. Dopřejte svému miminku ten nejlepší start do života.",
  pageDescription:
    "Praktické workshopy pro rodiče – první pomoc u dětí, handling a psychomotorický vývoj miminek. Dopřejte svému dítěti ten nejlepší start do života.",
};

/** Karty na detailní stránce — sdílí stejná data jako homepage */
export const workshopsPage: Workshop[] = workshops;
