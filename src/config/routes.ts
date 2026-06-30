const withHash = <TPath extends string, TId extends string>(path: TPath, id: TId) =>
  `${path}#${id}` as const;

export const ROUTE_IDS = {
  home: {
    hero: "hero",
    about: "o-mne",
    ageGroups: "vekove-kategorie",
    locations: "lokace",
    workshops: "workshopy",
    camps: "kempy",
    rules: "provozni-rad",
    contact: "kontakt",
  },
  ageGroups: {
    page: "vekove-skupiny",
    withParents: "s-rodici",
    withoutParents: "bez-rodicu",
    schedule: "rozvrh-lekci",
  },
  workshops: {
    page: "workshopy",
    allDates: "vsechny-terminy",
  },
} as const;

const HOME = "/" as const;
const AGE_GROUPS = "/vekove-kategorie" as const;
const WORKSHOPS = "/workshopy" as const;
const REVIEWS = "/recenze" as const;

export const ROUTES = {
  home: {
    _: HOME,
    hero: withHash(HOME, ROUTE_IDS.home.hero),
    about: withHash(HOME, ROUTE_IDS.home.about),
    ageGroups: withHash(HOME, ROUTE_IDS.home.ageGroups),
    locations: withHash(HOME, ROUTE_IDS.home.locations),
    workshops: withHash(HOME, ROUTE_IDS.home.workshops),
    camps: withHash(HOME, ROUTE_IDS.home.camps),
    rules: withHash(HOME, ROUTE_IDS.home.rules),
    contact: withHash(HOME, ROUTE_IDS.home.contact),
  },
  ageGroups: {
    _: AGE_GROUPS,
    withParents: withHash(AGE_GROUPS, ROUTE_IDS.ageGroups.withParents),
    withoutParents: withHash(AGE_GROUPS, ROUTE_IDS.ageGroups.withoutParents),
    schedule: withHash(AGE_GROUPS, ROUTE_IDS.ageGroups.schedule),
  },
  workshops: {
    _: WORKSHOPS,
    allDates: withHash(WORKSHOPS, ROUTE_IDS.workshops.allDates),
    detail: (id: string) => withHash(WORKSHOPS, id),
  },
  reviews: {
    _: REVIEWS,
  },
} as const;

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS = {
  primary: [
    { href: ROUTES.home.about, label: "O mně" },
    { href: ROUTES.home.ageGroups, label: "Cvičení pro děti" },
    { href: ROUTES.home.workshops, label: "Další akce" },
    { href: ROUTES.home.rules, label: "Provozní řád" },
    { href: ROUTES.home.contact, label: "Kontakt" },
  ],
  mobile: [
    { href: ROUTES.home.about, label: "O mně" },
    { href: ROUTES.ageGroups._, label: "Věkové kategorie" },
    { href: ROUTES.home.locations, label: "Kde cvičíme" },
    { href: ROUTES.workshops._, label: "Workshopy" },
    { href: ROUTES.home.camps, label: "Kempy & výjezdy" },
    { href: ROUTES.reviews._, label: "Recenze" },
    { href: ROUTES.home.rules, label: "Provozní řád" },
    { href: ROUTES.home.contact, label: "Kontakt" },
  ],
  footer: [
    { href: ROUTES.home.about, label: "O mně" },
    { href: ROUTES.ageGroups._, label: "Věkové kategorie" },
    { href: ROUTES.home.locations, label: "Kde cvičíme" },
    { href: ROUTES.workshops._, label: "Workshopy" },
    { href: ROUTES.home.camps, label: "Kempy & výjezdy" },
    { href: ROUTES.reviews._, label: "Recenze" },
    { href: ROUTES.home.rules, label: "Provozní řád" },
  ],
} as const satisfies Record<string, readonly NavLink[]>;
