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
