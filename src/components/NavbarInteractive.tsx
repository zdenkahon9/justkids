import { Fragment } from "preact";
import type { ComponentChildren, TargetedMouseEvent } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import { ROUTES, type NavLink } from "../config/routes";
import styles from "./Navbar.module.css";

type NavbarProps = {
  links: readonly NavLink[];
  mobileLinks?: readonly NavLink[];
  reservationUrl: string;
  brand: string;
  children: ComponentChildren;
  logoHref?: string;
  /** Podstránky bez hero — plné pozadí a stín od začátku */
  variant?: "default" | "solid";
};

/** Desktop submenu under „O mně“ — same section anchors as elsewhere on the site */
const ABOUT_DROPDOWN_LINKS: NavLink[] = [
  { href: ROUTES.home.about, label: "Kdo jsem" },
  { href: ROUTES.reviews._, label: "Recenze" },
];

/** Desktop submenu under „Další akce“ */
const EVENTS_DROPDOWN_LINKS: NavLink[] = [
  { href: ROUTES.workshops._, label: "Workshopy" },
  { href: ROUTES.home.camps, label: "Kempy" },
];

/** Desktop submenu under „Cvičení pro děti“ */
const EXERCISE_DROPDOWN_LINKS: NavLink[] = [
  { href: ROUTES.ageGroups._, label: "Věkové kategorie" },
  { href: ROUTES.home.locations, label: "Kde cvičíme" },
];

type NavDropdownId = "o-mne" | "cviceni-pro-deti" | "dalsi-akce";

const NAV_DROPDOWNS: Record<
  NavDropdownId,
  { match: (l: NavLink) => boolean; links: NavLink[] }
> = {
  "o-mne": {
    match: (l) => l.label === "O mně" && l.href === ROUTES.home.about,
    links: ABOUT_DROPDOWN_LINKS,
  },
  "cviceni-pro-deti": {
    match: (l) => l.label === "Cvičení pro děti",
    links: EXERCISE_DROPDOWN_LINKS,
  },
  "dalsi-akce": {
    match: (l) => l.label === "Další akce",
    links: EVENTS_DROPDOWN_LINKS,
  },
};

const getSubmenuLinks = (dropdownId: NavDropdownId) => NAV_DROPDOWNS[dropdownId].links;

const getNavDropdownId = (l: NavLink): NavDropdownId | null => {
  for (const [id, config] of Object.entries(NAV_DROPDOWNS) as [
    NavDropdownId,
    (typeof NAV_DROPDOWNS)[NavDropdownId],
  ][]) {
    if (config.match(l)) return id;
  }
  return null;
};

/** Subscribe to scroll changes while the Navbar island is mounted. */
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/**
 * Starts from the same value during SSR and hydration, then reads the live browser
 * state after mount to avoid a hydration mismatch.
 */
const useScrolledNav = (variant: NavbarProps["variant"]) => {
  const getSnapshot = useCallback(
    () =>
      variant === "solid" ||
      window.scrollY > 60 ||
      document.documentElement.dataset.workshopsHomeArrival === "true" ||
      document.documentElement.dataset.ageHomeArrival === "true",
    [variant],
  );

  const [scrolled, setScrolled] = useState(variant === "solid");

  useEffect(() => {
    const updateScrolled = () => setScrolled(getSnapshot());
    updateScrolled();
    return subscribeScroll(updateScrolled);
  }, [getSnapshot]);

  return scrolled;
};

const Navbar = ({
  links,
  mobileLinks,
  reservationUrl,
  brand,
  children,
  logoHref = ROUTES.home.hero,
  variant = "default",
}: NavbarProps) => {
  const mobileItems = mobileLinks ?? links;
  const scrolled = useScrolledNav(variant);
  const [open, setOpen] = useState(false);
  const [lockedDropdown, setLockedDropdown] = useState<NavDropdownId | null>(null);
  const openRef = useRef(open);
  /** Hash to scroll to after mobile menu unlock — avoids restore scroll overwriting anchor nav */
  const pendingHashRef = useRef<string | null>(null);
  const dropdownRefs = useRef<Partial<Record<NavDropdownId, HTMLLIElement>>>({});
  openRef.current = open;

  // Lock page scroll when mobile menu is open (html + body; fixed + scrollY for iOS Safari)
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;

      const hash = pendingHashRef.current;
      pendingHashRef.current = null;

      if (hash) {
        // Wait for fixed-body unlock before scrolling — single rAF was still racing layout
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const el = document.querySelector(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", hash);
            }
          });
        });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    }
  }, []);

  /** Mobile menu — same-page # anchors; unlock body before scroll when menu was open */
  const handleMobileNav = useCallback(
    (e: TargetedMouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;

      const hash = href.slice(hashIdx);
      const pathPart = href.slice(0, hashIdx);
      const isSamePage = !pathPart || pathPart === window.location.pathname;

      if (!isSamePage) {
        setOpen(false);
        return;
      }

      e.preventDefault();

      if (openRef.current) {
        pendingHashRef.current = hash;
        setOpen(false);
      } else {
        scrollToHash(hash);
      }
    },
    [scrollToHash],
  );

  /** Desktop nav + dropdown submenu — page links, /# anchors, dropdown lock */
  const handleDesktopNav = useCallback(
    (
      e: TargetedMouseEvent<HTMLAnchorElement>,
      href: string,
      options?: {
        closeDropdownAfterClick?: boolean;
        dropdownId?: NavDropdownId;
      },
    ) => {
      const hashIdx = href.indexOf("#");
      const closeDropdown =
        options?.closeDropdownAfterClick && options.dropdownId
          ? () => setLockedDropdown(options.dropdownId!)
          : null;

      if (hashIdx === -1) {
        closeDropdown?.();
        return;
      }

      const hash = href.slice(hashIdx);
      const pathPart = href.slice(0, hashIdx);
      const isSamePage = !pathPart || pathPart === window.location.pathname;

      if (!isSamePage) {
        closeDropdown?.();
        return;
      }

      e.preventDefault();
      closeDropdown?.();
      scrollToHash(hash);
    },
    [scrollToHash],
  );

  const showSolidNav = variant === "solid" || scrolled;

  return (
    <header
      className={`${styles.nav} ${showSolidNav ? styles.isScrolled : ""} ${open ? styles.isOpen : ""}`}
      data-component="navbar"
    >
      <div className={`${styles.navInner} container-x`}>
        <a
          href={logoHref}
          className={styles.navBrand}
          onClick={(e) => handleMobileNav(e, logoHref)}
          aria-label={`${brand} - na začátek stránky`}
        >
          <span className={styles.navLogo}>{children}</span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{brand}</span>
            {/* <span className={styles.brandSub}>pohybem k radosti</span> */}
          </span>
        </a>

        <nav className={styles.navLinks} aria-label="Hlavní navigace">
          <ul>
            {links.map((l) => {
              const dropdownId = getNavDropdownId(l);
              if (dropdownId) {
                const submenuLinks = getSubmenuLinks(dropdownId);
                return (
                  <li
                    key={l.href + l.label}
                    ref={(el) => {
                      if (el) dropdownRefs.current[dropdownId] = el;
                    }}
                    className={`${styles.dropdown} ${lockedDropdown === dropdownId ? styles.dropdownLocked : ""}`}
                    onMouseLeave={() => {
                      if (lockedDropdown === dropdownId) setLockedDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      className={styles.dropdownTrigger}
                      aria-haspopup="true"
                      aria-controls={`nav-submenu-${dropdownId}`}
                      onMouseDown={() => {
                        if (lockedDropdown === dropdownId) setLockedDropdown(null);
                      }}
                    >
                      <span className={styles.dropdownTriggerInner}>
                        {l.label}
                        <svg
                          className={styles.dropdownChevron}
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 4.25L6 7.75L9.5 4.25"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <div className={styles.dropdownSurface}>
                      <ul
                        id={`nav-submenu-${dropdownId}`}
                        className={styles.dropdownList}
                      >
                        {submenuLinks.map((sub, i) => (
                          <Fragment key={sub.href + sub.label}>
                            {i > 0 ? (
                              <hr className={styles.dropdownDivider} aria-hidden="true" />
                            ) : null}
                            <li>
                              <a
                                href={sub.href}
                                onClick={(e) =>
                                  handleDesktopNav(e, sub.href, {
                                    closeDropdownAfterClick: true,
                                    dropdownId,
                                  })
                                }
                              >
                                {sub.label}
                              </a>
                            </li>
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={l.href + l.label}>
                  <a href={l.href} onClick={(e) => handleDesktopNav(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary btn-sm ${styles.navCta}`}
        >
          Rezervace
          <span aria-hidden="true">→</span>
        </a>

        <button
          className={styles.navToggle}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={styles.navMobile}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <ul>
          {mobileItems.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={(e) => handleMobileNav(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ ["--i" as string]: mobileItems.length }}>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Rezervace
              <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
