import reviewsData from "./reviews.json";

export type ReviewUser = {
  id: string;
  name: string;
  profileUrl: string | null;
  profilePic: string;
};

export type ReviewPageAdLibrary = {
  id: string;
  pamv_comms_data: null;
};

export type Review = {
  facebookUrl: string;
  id: string;
  legacyId: string;
  user: ReviewUser;
  date: string;
  url: string;
  isRecommended: boolean;
  text: string;
  likesCount: number;
  commentsCount: number;
  facebookId: string;
  pageName: string;
  pageAdLibrary: ReviewPageAdLibrary;
  inputUrl: string;
  accent: "blush" | "sky" | "lilac";
  rating?: number;
};

type RawReview = Omit<Review, "accent" | "rating">;

const accents: Review["accent"][] = ["blush", "sky", "lilac"];

export const reviews: Review[] = (reviewsData as RawReview[]).map((review, index) => ({
  ...review,
  accent: accents[index % accents.length],
  ...(review.isRecommended ? { rating: 5 } : {}),
}));

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
