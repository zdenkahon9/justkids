import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Navbar.module.css";

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  links: NavLink[];
  mobileLinks?: NavLink[];
  reservationUrl: string;
  logoSrc: string;
  brand: string;
};

/** Desktop submenu under „O mně“ — same section anchors as elsewhere on the site */
const ABOUT_DROPDOWN_LINKS: NavLink[] = [
  { href: "#o-mne", label: "Kdo jsem" },
  { href: "#recenze", label: "Recenze" },
];

const isAboutNavItem = (l: NavLink) =>
  l.href === "#o-mne" && l.label === "O mně";

const Navbar = ({
  links,
  mobileLinks,
  reservationUrl,
  logoSrc,
  brand,
}: NavbarProps) => {
  const mobileItems = mobileLinks ?? links;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lockAboutDropdown, setLockAboutDropdown] = useState(false);
  const openRef = useRef(open);
  const aboutDropdownRef = useRef<HTMLLIElement | null>(null);
  openRef.current = open;

  // Sticky / shrink on scroll (Omnifood-like)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      window.scrollTo(0, scrollY);
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

  // Keep dropdown locked after submenu click while pointer still hovers the dropdown
  useEffect(() => {
    if (!lockAboutDropdown) return;
    const onPointerMove = () => {
      const dropdownEl = aboutDropdownRef.current;
      if (!dropdownEl) return;
      if (!dropdownEl.matches(":hover")) {
        setLockAboutDropdown(false);
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [lockAboutDropdown]);

  const handleNav = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      options?: { closeDropdownAfterClick?: boolean },
    ) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      if (options?.closeDropdownAfterClick) {
        setLockAboutDropdown(true);
      }
      const menuWasOpen = openRef.current;
      setOpen(false);
      const scrollToTarget = () => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
        }
      };
      // Mobile: scroll-lock cleanup does window.scrollTo(previousY) and would undo an immediate scrollIntoView
      if (menuWasOpen) {
        setTimeout(scrollToTarget, 0);
      } else {
        scrollToTarget();
      }
    },
    [],
  );

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.isScrolled : ""} ${open ? styles.isOpen : ""}`}
      data-component="navbar"
    >
      <div className={`${styles.navInner} container-x`}>
        <a
          href="#hero"
          className={styles.navBrand}
          onClick={(e) => handleNav(e, "#hero")}
          aria-label={`${brand} - na začátek stránky`}
        >
          <img
            src={logoSrc}
            alt=""
            width={48}
            height={48}
            className={styles.navLogo}
          />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{brand}</span>
            <span className={styles.brandSub}>pohybem k radosti</span>
          </span>
        </a>

        <nav className={styles.navLinks} aria-label="Hlavní navigace">
          <ul>
            {links.map((l) =>
              isAboutNavItem(l) ? (
                <li
                  key={l.href}
                  ref={aboutDropdownRef}
                  className={`${styles.dropdown} ${lockAboutDropdown ? styles.dropdownLocked : ""}`}
                >
                  <button
                    type="button"
                    className={styles.dropdownTrigger}
                    aria-haspopup="true"
                    aria-controls="nav-submenu-o-mne"
                  >
                    <span className={styles.dropdownTriggerInner}>
                      {l.label}
                      <svg
                        className={styles.dropdownChevron}
                        width="12"
                        height="12"
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
                    <ul id="nav-submenu-o-mne" className={styles.dropdownList}>
                      {ABOUT_DROPDOWN_LINKS.map((sub) => (
                        <li key={sub.href + sub.label}>
                          <a
                            href={sub.href}
                            onClick={(e) =>
                              handleNav(e, sub.href, {
                                closeDropdownAfterClick: true,
                              })
                            }
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              ),
            )}
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
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
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
