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

export type PricingTextPart = {
  text: string;
  emphasis?: boolean;
};

export type PricingCourse = {
  id: "with-parents" | "without-parents";
  title: string;
  groups: string[];
  accent: "blush" | "sky";
  coursePriceCzk: number;
  lessonCount: number;
  pricePerLessonCzk?: number;
  replacementTitle: string;
  replacementText: PricingTextPart[];
};

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
  { location: "Hořovice", date: "7. 9. 2026", dateTime: "2026-09-07" },
  { location: "Broumy", date: "17. 9. 2026", dateTime: "2026-09-17" },
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
      { text: "Náhrady je možné vybrat na " },
      { text: "paralelním", emphasis: true },
      { text: " " },
      { text: "kurzu", emphasis: true },
      { text: " ve " },
      { text: "Zdicích", emphasis: true },
      { text: ", " },
      { text: "Hořovicích", emphasis: true },
      { text: " nebo " },
      { text: "Broumech", emphasis: true },
      { text: "." },
    ],
  },
  {
    id: "without-parents",
    title: "Cvičení bez rodičů",
    groups: ["Fit", "Pro"],
    accent: "sky",
    coursePriceCzk: 2880,
    lessonCount: 16,
    replacementTitle: "Náhrady lekcí",
    replacementText: [
      { text: "Zameškané lekce " },
      { text: "není možné", emphasis: true },
      { text: " " },
      { text: "nahradit", emphasis: true },
      { text: ". Hradí se " },
      { text: "celý kurz", emphasis: true },
      { text: ", nikoliv jednotlivé lekce." },
    ],
  },
];
