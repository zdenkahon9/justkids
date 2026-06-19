import { workshops, type Workshop } from "./WorkshopsHome";

export type WorkshopsPageMeta = {
  /** Id sekce — kotva pro odkaz `/#workshopy` i scroll-margin */
  sectionId: string;
  /** Meta description pro <head> detailní stránky */
  pageDescription: string;
};

export const workshopsPageMeta: WorkshopsPageMeta = {
  sectionId: "workshopy",
  pageDescription:
    "Praktické workshopy pro rodiče – první pomoc u dětí, handling a psychomotorický vývoj miminek. Dopřejte svému dítěti ten nejlepší start do života.",
};

/** Karty na detailní stránce — sdílí stejná data jako homepage */
export const workshopsPage: Workshop[] = workshops;
