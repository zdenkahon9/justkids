import type { TargetedMouseEvent } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

import { ROUTES, type NavLink } from "../../config/routes";

export type NavDropdownId = "o-mne" | "cviceni-pro-deti" | "dalsi-akce";

export type NavDropdownConfig = {
  id: NavDropdownId;
  match: (link: NavLink) => boolean;
  links: readonly NavLink[];
};

export type SetOpenDropdownId = Dispatch<StateUpdater<NavDropdownId | null>>;

export type DesktopNavHandler = (
  event: TargetedMouseEvent<HTMLAnchorElement>,
  href: string,
  options?: { closeDropdownAfterClick?: boolean },
) => void;

const NAV_DROPDOWNS = [
  {
    id: "o-mne",
    match: (link) => link.label === "O mně" && link.href === ROUTES.home.about,
    links: [
      { href: ROUTES.home.about, label: "Kdo jsem" },
      { href: ROUTES.reviews._, label: "Recenze" },
    ],
  },
  {
    id: "cviceni-pro-deti",
    match: (link) => link.label === "Cvičení pro děti",
    links: [
      { href: ROUTES.ageGroups._, label: "Věkové kategorie" },
      { href: ROUTES.home.locations, label: "Kde cvičíme" },
    ],
  },
  {
    id: "dalsi-akce",
    match: (link) => link.label === "Další akce",
    links: [
      { href: ROUTES.workshops._, label: "Workshopy" },
      { href: ROUTES.home.camps, label: "Kempy" },
    ],
  },
] as const satisfies readonly NavDropdownConfig[];

export const getNavDropdown = (link: NavLink): NavDropdownConfig | undefined =>
  NAV_DROPDOWNS.find((dropdown) => dropdown.match(link));
