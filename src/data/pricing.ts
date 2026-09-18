import { ROUTE_IDS } from "../config/routes";

export type PricingMeta = {
  sectionId: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  siblingDiscountTitle: string;
  siblingDiscount: string;
  insuranceContributionTitle: string;
  insuranceContributionText: string;
};

export type CourseStart = {
  location: string;
  date: string;
  dateTime: string;
};

type PricingTextPart = {
  text: string;
  emphasis?: boolean;
};

type PricingCourseBase = {
  id: "with-parents" | "without-parents";
  title: string;
  groups: string[];
  accent: "blush" | "sky";
  replacementTitle: string;
  replacementText: PricingTextPart[];
};

type PricingCourseVariant = {
  title: string;
  ageRange: string;
  coursePriceCzk: number;
  lessonCount: number;
  lessonCountLabel: string;
};

type PricingSingleCourse = PricingCourseBase & {
  coursePriceCzk: number;
  lessonCount: number;
  lessonCountLabel?: string;
  pricePerLessonCzk?: number;
  variants?: never;
};

type PricingVariantCourse = PricingCourseBase & {
  variants: PricingCourseVariant[];
  coursePriceCzk?: never;
  lessonCount?: never;
  lessonCountLabel?: never;
  pricePerLessonCzk?: never;
};

export type PricingCourse = PricingSingleCourse | PricingVariantCourse;

export const pricingMeta: PricingMeta = {
  sectionId: ROUTE_IDS.ageGroups.pricing,
  eyebrow: "Kurzy od září 2026",
  title: "Ceník a",
  titleAccent: "praktické informace",
  siblingDiscountTitle: "10 % sleva pro sourozence",
  siblingDiscount: "Při přihlášení sourozenců má druhé dítě 10% slevu.",
  insuranceContributionTitle: "Příspěvek zdravotní pojišťovny",
  insuranceContributionText:
    "Na kurz můžete využít příspěvek na pohybové aktivity dětí v rámci preventivních programů zdravotních pojišťoven.",
};

export const courseStarts: CourseStart[] = [
  { location: "Zdice", date: "7. 9. 2026", dateTime: "2026-09-07" },
  { location: "Hořovice", date: "9. 9. 2026", dateTime: "2026-09-09" },
  {
    location: "Zdice – Pro (6-9 let)",
    date: "6. 10. 2026",
    dateTime: "2026-10-06",
  },
];

export const pricingCourses: PricingCourse[] = [
  {
    id: "with-parents",
    title: "Cvičení s rodiči",
    groups: ["Baby", "Mini", "Move", "Active"],
    accent: "blush",
    coursePriceCzk: 2880,
    lessonCount: 16,
    pricePerLessonCzk: 180,
    replacementTitle: "Náhrady lekcí",
    replacementText: [
      // { text: "Náhrady je možné vybrat na " },
      // { text: "paralelním", emphasis: true },
      // { text: " " },
      // { text: "kurzu", emphasis: true },
      // { text: " ve " },
      // { text: "Zdicích,", emphasis: true },
      // { text: " " },
      // { text: "Hořovicích", emphasis: true },
      // { text: " nebo " },
      // { text: "Broumech.", emphasis: true },
      { text: "Náhrady je možné vybrat na " },
      { text: "paralelním", emphasis: true },
      { text: " " },
      { text: "kurzu", emphasis: true },
      { text: " ve " },
      { text: "Zdicích", emphasis: true },
      { text: " nebo v " },
      { text: "Hořovicích.", emphasis: true },
    ],
  },
  {
    id: "without-parents",
    title: "Cvičení bez rodičů",
    groups: ["Fit", "Pro"],
    accent: "sky",
    variants: [
      {
        title: "Fit",
        ageRange: "3–6 let",
        coursePriceCzk: 2880,
        lessonCount: 16,
        lessonCountLabel: "16 lekcí + 2 náhrady",
      },
      {
        title: "Pro",
        ageRange: "6–9 let",
        coursePriceCzk: 2400,
        lessonCount: 12,
        lessonCountLabel: "12 lekcí + 2 náhrady",
      },
    ],
    replacementTitle: "Náhrady lekcí",
    replacementText: [
      { text: "Náhrada bude probíhat formou " },
      { text: "dvou venkovních lekcí navíc.", emphasis: true },
    ],
  },
];
