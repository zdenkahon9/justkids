import { Fragment } from "preact";
import type { ComponentChildren, RefObject, TargetedMouseEvent } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { Dispatch, StateUpdater } from "preact/hooks";

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

type NavDropdownId = "o-mne" | "cviceni-pro-deti" | "dalsi-akce";

type NavDropdownConfig = {
  id: NavDropdownId;
  match: (link: NavLink) => boolean;
  links: readonly NavLink[];
};

const NAV_DROPDOWNS = [
  {
    id: "o-mne",
    match: (l) => l.label === "O mně" && l.href === ROUTES.home.about,
    links: [
      { href: ROUTES.home.about, label: "Kdo jsem" },
      { href: ROUTES.reviews._, label: "Recenze" },
    ],
  },
  {
    id: "cviceni-pro-deti",
    match: (l) => l.label === "Cvičení pro děti",
    links: [
      { href: ROUTES.ageGroups._, label: "Věkové kategorie" },
      { href: ROUTES.home.locations, label: "Kde cvičíme" },
    ],
  },
  {
    id: "dalsi-akce",
    match: (l) => l.label === "Další akce",
    links: [
      { href: ROUTES.workshops._, label: "Workshopy" },
      { href: ROUTES.home.camps, label: "Kempy" },
    ],
  },
] as const satisfies readonly NavDropdownConfig[];

const getNavDropdown = (link: NavLink): NavDropdownConfig | undefined =>
  NAV_DROPDOWNS.find((dropdown) => dropdown.match(link));

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

type SetOpen = Dispatch<StateUpdater<boolean>>;
type SetOpenDropdownId = Dispatch<StateUpdater<NavDropdownId | null>>;

type DesktopNavOptions = {
  closeDropdownAfterClick?: boolean;
  dropdownId?: NavDropdownId;
};

type MobileNavHandler = (
  event: TargetedMouseEvent<HTMLAnchorElement>,
  href: string,
) => void;

type DesktopNavHandler = (
  event: TargetedMouseEvent<HTMLAnchorElement>,
  href: string,
  options?: DesktopNavOptions,
) => void;

const useBodyScrollLock = (open: boolean, pendingHashRef: RefObject<string | null>) => {
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

    // Fixed body plus the saved scroll position keeps the page stable in iOS Safari.
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
        // A single animation frame still races the layout after the fixed body is unlocked.
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
  }, [open, pendingHashRef]);
};

type UseHashNavigationOptions = {
  openRef: RefObject<boolean>;
  pendingHashRef: RefObject<string | null>;
  setOpen: SetOpen;
  setOpenDropdownId: SetOpenDropdownId;
};

const useHashNavigation = ({
  openRef,
  pendingHashRef,
  setOpen,
  setOpenDropdownId,
}: UseHashNavigationOptions) => {
  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    }
  }, []);

  const handleMobileNav = useCallback<MobileNavHandler>(
    (event, href) => {
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;

      const hash = href.slice(hashIdx);
      const pathPart = href.slice(0, hashIdx);
      const isSamePage = !pathPart || pathPart === window.location.pathname;

      if (!isSamePage) {
        setOpen(false);
        return;
      }

      event.preventDefault();

      if (openRef.current) {
        pendingHashRef.current = hash;
        setOpen(false);
      } else {
        scrollToHash(hash);
      }
    },
    [openRef, pendingHashRef, scrollToHash, setOpen],
  );

  const handleDesktopNav = useCallback<DesktopNavHandler>(
    (event, href, options) => {
      const hashIdx = href.indexOf("#");
      const closeDropdown =
        options?.closeDropdownAfterClick && options.dropdownId
          ? () => setOpenDropdownId(null)
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

      event.preventDefault();
      closeDropdown?.();
      scrollToHash(hash);
    },
    [scrollToHash, setOpenDropdownId],
  );

  return { handleDesktopNav, handleMobileNav };
};

type NavDropdownProps = {
  config: NavDropdownConfig;
  link: NavLink;
  onNavigate: DesktopNavHandler;
  openDropdownId: NavDropdownId | null;
  setOpenDropdownId: SetOpenDropdownId;
};

const NavDropdown = ({
  config,
  link,
  onNavigate,
  openDropdownId,
  setOpenDropdownId,
}: NavDropdownProps) => {
  const dropdownId = config.id;
  const isOpen = openDropdownId === dropdownId;

  const closeDropdown = () => {
    setOpenDropdownId((current) => (current === dropdownId ? null : current));
  };

  return (
    <li
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={() => setOpenDropdownId(dropdownId)}
      onMouseLeave={closeDropdown}
      onFocusIn={() => setOpenDropdownId(dropdownId)}
      onFocusOut={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          closeDropdown();
        }
      }}
    >
      <button
        type="button"
        className={styles.dropdownTrigger}
        aria-haspopup="true"
        aria-controls={`nav-submenu-${dropdownId}`}
        aria-expanded={isOpen}
      >
        <span className={styles.dropdownTriggerInner}>
          {link.label}
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
        <ul id={`nav-submenu-${dropdownId}`} className={styles.dropdownList}>
          {config.links.map((sub, index) => (
            <Fragment key={sub.href + sub.label}>
              {index > 0 ? (
                <hr className={styles.dropdownDivider} aria-hidden="true" />
              ) : null}
              <li>
                <a
                  href={sub.href}
                  onClick={(event) =>
                    onNavigate(event, sub.href, {
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
};

type DesktopNavProps = {
  links: readonly NavLink[];
  onNavigate: DesktopNavHandler;
  openDropdownId: NavDropdownId | null;
  setOpenDropdownId: SetOpenDropdownId;
};

const DesktopNav = ({
  links,
  onNavigate,
  openDropdownId,
  setOpenDropdownId,
}: DesktopNavProps) => (
  <nav className={styles.navLinks} aria-label="Hlavní navigace">
    <ul>
      {links.map((link) => {
        const dropdown = getNavDropdown(link);
        if (dropdown) {
          return (
            <NavDropdown
              key={link.href + link.label}
              config={dropdown}
              link={link}
              onNavigate={onNavigate}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          );
        }

        return (
          <li key={link.href + link.label}>
            <a href={link.href} onClick={(event) => onNavigate(event, link.href)}>
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

type MobileMenuProps = {
  items: readonly NavLink[];
  onClose: () => void;
  onNavigate: MobileNavHandler;
  open: boolean;
  reservationUrl: string;
};

const MobileMenu = ({
  items,
  onClose,
  onNavigate,
  open,
  reservationUrl,
}: MobileMenuProps) => (
  <div
    id="mobile-menu"
    className={styles.navMobile}
    role="dialog"
    aria-modal="true"
    aria-label="Menu"
    hidden={!open}
  >
    <ul>
      {items.map((link, index) => (
        <li key={link.href} style={{ ["--i" as string]: index }}>
          <a href={link.href} onClick={(event) => onNavigate(event, link.href)}>
            {link.label}
          </a>
        </li>
      ))}
      <li style={{ ["--i" as string]: items.length }}>
        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={onClose}
        >
          Rezervace
          <span aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  </div>
);

const NavbarInteractive = ({
  links,
  mobileLinks,
  reservationUrl,
  brand,
  children,
  logoHref = ROUTES.home._,
  variant = "default",
}: NavbarProps) => {
  const mobileItems = mobileLinks ?? links;
  const scrolled = useScrolledNav(variant);
  const [open, setOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<NavDropdownId | null>(null);
  const openRef = useRef(open);
  /** Hash to scroll to after mobile menu unlock so scroll restoration cannot override it. */
  const pendingHashRef = useRef<string | null>(null);
  openRef.current = open;

  useBodyScrollLock(open, pendingHashRef);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { handleDesktopNav, handleMobileNav } = useHashNavigation({
    openRef,
    pendingHashRef,
    setOpen,
    setOpenDropdownId,
  });

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

        <DesktopNav
          links={links}
          onNavigate={handleDesktopNav}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />

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

      <MobileMenu
        items={mobileItems}
        onClose={() => setOpen(false)}
        onNavigate={handleMobileNav}
        open={open}
        reservationUrl={reservationUrl}
      />
    </header>
  );
};

export default NavbarInteractive;
