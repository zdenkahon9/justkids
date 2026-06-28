import { site } from "../data/site";

export const defaultSeo = {
  baseTitle: site.name,
  pageTitle: (title: string) => `${title} | ${defaultSeo.baseTitle}` as const,
  metaDescription:
    "Cvičení pro miminka a děti od 3 měsíců do 9 let. Podporujeme zdravý pohybový vývoj dětí hravou formou, bez stresu a ve vlastním tempu. Těšíme se na vás ve Zdicích, Hořovicích a Broumech.",
  ogImage: site.ogImage,
} as const;

type PageSeo = {
  path: `/${string}`;
  title: string;
  description: string;
  llmsTitle: string;
  sitemap: {
    changefreq: "weekly" | "monthly";
    priority: number;
  };
};

export const pageSeo = {
  home: {
    path: "/",
    title: "Pohybem k radosti",
    description: defaultSeo.metaDescription,
    llmsTitle: "Domů",
    sitemap: { changefreq: "weekly", priority: 1 },
  },
  ageGroups: {
    path: "/vekove-kategorie",
    title: "Věkové kategorie",
    description:
      "Přehled věkových kategorií JustKids pro miminka a děti od 3 měsíců do 9 let. Nabízíme cvičení s rodiči pro děti od 3 měsíců do 3,5 let a cvičení bez rodičů pro děti od 3 do 9 let. Každá věková kategorie má vlastní náplň cvičení přizpůsobenou věku i tempu dítěte.",
    llmsTitle: "Věkové kategorie",
    sitemap: { changefreq: "monthly", priority: 0.9 },
  },
  workshops: {
    path: "/workshopy",
    title: "Workshopy pro rodiče",
    description:
      "Praktické workshopy nejen pro rodiče – první pomoc u dětí, handling a psychomotorický vývoj miminek. Dopřejte svému dítěti ten nejlepší start do života.",
    llmsTitle: "Workshopy",
    sitemap: { changefreq: "weekly", priority: 0.8 },
  },
  reviews: {
    path: "/recenze",
    title: "Recenze od rodičů",
    description: "Recenze a zkušenosti rodičů s cvičením pro miminka a děti v JustKids.",
    llmsTitle: "Recenze",
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
} as const satisfies Record<string, PageSeo>;

export const pageSeoEntries = Object.values(pageSeo);

export const normalizePagePath = (url: string | URL) => {
  const pathname = new URL(url, site.url).pathname.replace(/\/$/, "");
  return pathname || "/";
};
