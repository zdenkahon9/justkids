import type { ComponentChildren } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import { ROUTES, type NavLink } from "../../config/routes";
import styles from "../Navbar.module.css";
import DesktopNav from "./DesktopNav";
import type { NavDropdownId } from "./dropdowns";
import MobileMenu from "./MobileMenu";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useHashNavigation } from "./useHashNavigation";

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

const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/** Uses an SSR-safe initial value, then reads the live browser state after hydration. */
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<NavDropdownId | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  /** Hash to scroll to after mobile menu unlock so scroll restoration cannot override it. */
  const pendingHashRef = useRef<string | null>(null);

  useBodyScrollLock(menuOpen, pendingHashRef);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setOpenDropdownId(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const { handleDesktopNav, handleMobileNav } = useHashNavigation({
    isMenuOpen: menuOpen,
    pendingHashRef,
    setMenuOpen,
    setOpenDropdownId,
  });

  const showSolidNav = variant === "solid" || scrolled;

  return (
    <header
      className={`${styles.nav} ${showSolidNav ? styles.isScrolled : ""} ${menuOpen ? styles.isOpen : ""}`}
      data-component="navbar"
    >
      <div className={`${styles.navInner} container-x`}>
        <a
          href={logoHref}
          className={styles.navBrand}
          onClick={(event) => handleMobileNav(event, logoHref)}
          aria-label={`${brand} - na začátek stránky`}
        >
          <span className={styles.navLogo}>{children}</span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{brand}</span>
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
          ref={menuToggleRef}
          className={styles.navToggle}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <MobileMenu
        items={mobileItems}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleMobileNav}
        open={menuOpen}
        reservationUrl={reservationUrl}
        toggleRef={menuToggleRef}
      />
    </header>
  );
};

export default NavbarInteractive;
