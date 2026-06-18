import reviewsData from "./reviews.json";

export type Review = {
  id: string;
  author: string;
  childAge?: string;
  text: string;
  accent: "blush" | "sky" | "lilac";
  rating?: number;
};

export const reviews: Review[] = reviewsData as Review[];

export type ReviewsPageMeta = {
  title: string;
  titleAccent: string;
  pageDescription: string;
};

export const reviewsPageMeta: ReviewsPageMeta = {
  title: "Recenze",
  titleAccent: "od rodičů",
  pageDescription:
    "Skutečné zkušenosti rodičů, kteří s námi absolvovali lekce cvičení a plavání.",
};
