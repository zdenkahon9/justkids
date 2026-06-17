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
