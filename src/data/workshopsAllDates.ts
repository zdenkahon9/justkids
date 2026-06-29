import { workshopsPage, type WorkshopPage } from "./workshopsPage";

export type WorkshopsAllDatesMeta = {
  /** Id sekce — kotva pro odkaz z WorkshopsPage i scroll-margin */
  sectionId: string;
  /** Nadpis sekce — první část před `.section-title-accent` */
  title: string;
  /** Zvýrazněná část nadpisu v `.section-title-accent` */
  titleAccent: string;
};

export const workshopsAllDatesMeta: WorkshopsAllDatesMeta = {
  sectionId: "vsechny-terminy",
  title: "Všechny",
  titleAccent: "termíny",
};

export type WorkshopAllDates = Pick<WorkshopPage, "id" | "title" | "accent" | "dates">;

/** Workshopy s termíny pro sekci WorkshopsAllDates */
export const workshopsAllDates: WorkshopAllDates[] = workshopsPage.map(
  ({ id, title, accent, dates }) => ({ id, title, accent, dates }),
);
