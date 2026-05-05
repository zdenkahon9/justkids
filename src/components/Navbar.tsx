import { useEffect, useState, useCallback, useRef } from "react";

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
  { href: "#absolvovane-kurzy", label: "Absolvované kurzy" },
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
  const openRef = useRef(open);
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

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
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
      className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
      data-component="navbar"
    >
      <div className="nav__inner container-x">
        <a
          href="#hero"
          className="nav__brand"
          onClick={(e) => handleNav(e, "#hero")}
          aria-label={`${brand} - na začátek stránky`}
        >
          <img
            src={logoSrc}
            alt=""
            width={48}
            height={48}
            className="nav__logo"
          />
          <span className="nav__brand-text">
            <span className="nav__brand-name">{brand}</span>
            <span className="nav__brand-sub">pohybem k radosti</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Hlavní navigace">
          <ul>
            {links.map((l) =>
              isAboutNavItem(l) ? (
                <li key={l.href} className="nav__dropdown">
                  <button
                    type="button"
                    className="nav__dropdown-trigger"
                    aria-haspopup="true"
                    aria-controls="nav-submenu-o-mne"
                  >
                    <span className="nav__dropdown-trigger-inner">
                      {l.label}
                      <svg
                        className="nav__dropdown-chevron"
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
                  <div className="nav__dropdown-surface">
                    <ul id="nav-submenu-o-mne" className="nav__dropdown-list">
                      {ABOUT_DROPDOWN_LINKS.map((sub) => (
                        <li key={sub.href + sub.label}>
                          <a
                            href={sub.href}
                            onClick={(e) => handleNav(e, sub.href)}
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
          className="btn btn-primary btn-sm nav__cta"
        >
          Rezervace
          <span aria-hidden="true">→</span>
        </a>

        <button
          className="nav__toggle"
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
        className="nav__mobile"
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

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 1.1rem 0;
          transition: background-color 280ms ease, padding 280ms ease, box-shadow 280ms ease;
          background: linear-gradient(
            180deg,
            rgba(255, 249, 244, 0.55) 0%,
            rgba(255, 249, 244, 0.25) 100%
          );
          backdrop-filter: saturate(140%) blur(10px);
          -webkit-backdrop-filter: saturate(140%) blur(10px);
        }

        .nav.is-scrolled {
          background: rgba(255, 249, 244, 0.88);
          backdrop-filter: saturate(150%) blur(14px);
          -webkit-backdrop-filter: saturate(150%) blur(14px);
          padding: 0.55rem 0;
          box-shadow: 0 6px 30px -16px rgba(123, 90, 160, 0.25);
        }

        .nav__inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: 1rem;
        }

        .nav__brand {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          text-decoration: none;
          color: var(--color-ink);
        }

        .nav__logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          transition: width 280ms ease, height 280ms ease, transform 280ms ease;
          box-shadow: 0 8px 22px -8px rgba(236, 47, 142, 0.4);
        }

        .nav.is-scrolled .nav__logo {
          width: 40px;
          height: 40px;
        }

        .nav__brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.05;
        }

        .nav__brand-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.45rem;
          letter-spacing: -0.02em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
          transition: text-shadow 280ms ease;
        }

        .nav.is-scrolled .nav__brand-name {
          text-shadow: none;
        }

        .nav__brand-sub {
          font-family: var(--font-script);
          font-size: 0.95rem;
          color: var(--color-blush-deep);
          margin-top: 2px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
          transition: text-shadow 280ms ease;
        }

        .nav.is-scrolled .nav__brand-sub {
          text-shadow: none;
        }

        .nav__links {
          justify-self: center;
        }

        .nav__links > ul {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav__links > ul > li > a {
          display: inline-block;
          padding: 0.6rem 0.95rem;
          color: var(--color-ink);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 9999px;
          transition: background-color 220ms ease, color 220ms ease;
        }

        /*
          Match <a> nav items: same unitless line-height as body (global.css) + same font-size
          as other nav links, so the pill’s vertical rhythm matches. Only this button rule.
        */
        .nav__links > ul > li > button.nav__dropdown-trigger {
          display: inline-block;
          padding: 0.6rem 0.95rem;
          margin: 0;
          color: var(--color-ink);
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.65;
          text-decoration: none;
          border-radius: 9999px;
          transition: background-color 220ms ease, color 220ms ease;
          appearance: none;
          -webkit-appearance: none;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
          text-align: center;
        }

        .nav__links > ul > li > button.nav__dropdown-trigger:focus-visible {
          outline: 2px solid var(--color-blush-vivid);
          outline-offset: 2px;
        }

        /*
          Same outer box as other nav links; label + chevron use inner inline-flex row.
        */
        .nav__dropdown-trigger-inner {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .nav__links > ul > li > a:hover,
        .nav__links > ul > li > button.nav__dropdown-trigger:hover {
          background: rgba(252, 194, 214, 0.4);
          color: var(--color-blush-vivid);
        }

        .nav__links > ul > li > button.nav__dropdown-trigger:active {
          background: rgba(252, 194, 214, 0.55);
          color: var(--color-blush-deep);
        }

        .nav__dropdown {
          position: relative;
          z-index: 2;
        }

        .nav__dropdown-chevron {
          display: block;
          flex-shrink: 0;
          align-self: center;
          color: var(--color-blush-vivid);
          transform: translateY(0.07em);
          transition: color 220ms ease, transform 220ms ease;
        }

        .nav__dropdown:hover .nav__dropdown-chevron,
        .nav__dropdown:focus-within .nav__dropdown-chevron {
          color: var(--color-blush-deep);
          transform: translateY(0.07em);
        }

        /* Point chevron the other way only while a submenu row is hovered / keyboard-focused */
        .nav__dropdown:has(.nav__dropdown-list a:hover) .nav__dropdown-chevron,
        .nav__dropdown:has(.nav__dropdown-list a:focus-visible) .nav__dropdown-chevron {
          color: var(--color-blush-deep);
          transform: rotate(180deg) translateY(-0.07em);
        }

        /* Hoverable air gap (~12–14px): bridge keeps :hover while moving to the panel */
        .nav__dropdown-surface {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 100%;
          padding-top: 1.4rem;
          min-width: 100%;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 180ms ease, visibility 180ms ease;
        }

        .nav__dropdown:hover .nav__dropdown-surface,
        .nav__dropdown:focus-within .nav__dropdown-surface {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .nav__dropdown-list {
          list-style: none;
          margin: 0;
          padding: 0.4rem;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 0.1rem;
          border-radius: 1.125rem;
          background: rgba(255, 249, 244, 0.96);
          backdrop-filter: saturate(150%) blur(12px);
          -webkit-backdrop-filter: saturate(150%) blur(12px);
          box-shadow: 0 14px 40px -16px rgba(123, 90, 160, 0.32),
            0 0 0 1px rgba(236, 47, 142, 0.1);
        }

        .nav__dropdown-list a {
          display: block;
          padding: 0.6rem 0.95rem;
          color: var(--color-ink);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 1.125rem;
          text-align: center;
          white-space: nowrap;
          transition: background-color 220ms ease, color 220ms ease;
        }

        .nav__dropdown-list a:hover {
          background: rgba(252, 194, 214, 0.4);
          color: var(--color-blush-vivid);
        }

        .nav__dropdown-list a:active {
          background: rgba(252, 194, 214, 0.55);
          color: var(--color-blush-deep);
        }

        .nav__links > ul > li > a:active {
          background: rgba(252, 194, 214, 0.55);
          color: var(--color-blush-deep);
        }

        .nav__cta {
          margin-left: 0;
        }

        .nav__toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          border: 1.5px solid rgba(42, 31, 56, 0.15);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background-color 220ms ease;
        }

        .nav__toggle:hover { background: white; }

        .nav__toggle span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--color-ink);
          border-radius: 2px;
          transition: transform 280ms ease, opacity 220ms ease;
        }

        .nav.is-open .nav__toggle span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav.is-open .nav__toggle span:nth-child(2) { opacity: 0; }
        .nav.is-open .nav__toggle span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .nav__mobile {
          position: fixed;
          left: 0;
          right: 0;
          top: var(--nav-height);
          height: calc(100svh - var(--nav-height));
          background: linear-gradient(170deg, #fff9f4 0%, #ffe1ed 50%, #d6ecfa 100%);
          padding: 0 1.25rem 1.25rem;
          z-index: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .nav.is-scrolled .nav__mobile {
          top: var(--nav-height-scrolled);
          height: calc(100svh - var(--nav-height-scrolled));
        }

        .nav__mobile[hidden] { display: none; }

        .nav__mobile ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          height: 100%;
        }

        .nav__mobile ul li:last-child {
          padding-top: 1rem;
        }

        .nav__mobile li {
          opacity: 0;
          transform: translateY(12px);
          animation: nav-mobile-in 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--i, 0) * 50ms);
        }

        @keyframes nav-mobile-in {
          to { opacity: 1; transform: translateY(0); }
        }

        .nav__mobile a:not(.btn) {
          display: block;
          padding: 0.7rem 1rem;
          font-family: var(--font-display);
          font-size: clamp(1rem, 4.4vw, 1.25rem);
          font-weight: 600;
          color: var(--color-ink);
          text-decoration: none;
          border-bottom: 1px solid rgba(42, 31, 56, 0.08);
        }

        .nav__mobile .btn {
          margin-top: auto;
          width: 100%;
          font-size: 1rem;
          padding: 0.85rem 1.4rem;
        }

        @media (max-width: 880px) {
          .nav__inner {
            padding-inline: 1.5rem;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
          }
          .nav__brand {
            justify-self: start;
            min-width: 0;
          }
          .nav__links,
          .nav__cta {
            display: none;
          }
          .nav__toggle {
            display: inline-flex;
            justify-self: end;
          }
        }

        @media (max-width: 420px) {
          .nav__brand-name { font-size: 1.4rem; }
          .nav__inner { gap: 0.5rem; }
        }

        @media (min-width: 881px) {
          .nav__mobile { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
