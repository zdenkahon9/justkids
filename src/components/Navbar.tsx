import { useEffect, useState, useCallback } from "react";

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  links: NavLink[];
  reservationUrl: string;
  logoSrc: string;
  brand: string;
};

const Navbar = ({ links, reservationUrl, logoSrc, brand }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Sticky / shrink on scroll (Omnifood-like)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  }, []);

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
          <img src={logoSrc} alt="" width={48} height={48} className="nav__logo" />
          <span className="nav__brand-text">
            <span className="nav__brand-name">{brand}</span>
            <span className="nav__brand-sub">pohybem k radosti</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Hlavní navigace">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm nav__cta">
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
          {links.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ ["--i" as string]: links.length }}>
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
          transition: background-color 280ms ease, padding 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .nav.is-scrolled {
          background: rgba(255, 249, 244, 0.85);
          backdrop-filter: saturate(150%) blur(14px);
          -webkit-backdrop-filter: saturate(150%) blur(14px);
          padding: 0.55rem 0;
          box-shadow: 0 6px 30px -16px rgba(123, 90, 160, 0.25);
          border-bottom-color: rgba(212, 191, 245, 0.4);
        }

        .nav__inner {
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
        }

        .nav__brand-sub {
          font-family: var(--font-script);
          font-size: 0.95rem;
          color: var(--color-blush-deep);
          margin-top: 2px;
        }

        .nav__links {
          justify-self: center;
        }

        .nav__links ul {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav__links a {
          display: inline-block;
          padding: 0.6rem 0.95rem;
          color: var(--color-ink);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-radius: 9999px;
          transition: background-color 220ms ease, color 220ms ease;
        }

        .nav__links a:hover {
          background: rgba(252, 194, 214, 0.4);
          color: var(--color-blush-vivid);
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
          inset: 0;
          top: 72px;
          background: linear-gradient(170deg, #fff9f4 0%, #ffe1ed 50%, #d6ecfa 100%);
          padding: 2.5rem 1.5rem;
          z-index: 49;
          overflow-y: auto;
        }

        .nav__mobile[hidden] { display: none; }

        .nav__mobile ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav__mobile li {
          opacity: 0;
          transform: translateY(12px);
          animation: nav-mobile-in 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--i, 0) * 60ms);
        }

        @keyframes nav-mobile-in {
          to { opacity: 1; transform: translateY(0); }
        }

        .nav__mobile a:not(.btn) {
          display: block;
          padding: 1rem 1.25rem;
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--color-ink);
          text-decoration: none;
          border-bottom: 1px solid rgba(42, 31, 56, 0.08);
        }

        .nav__mobile .btn {
          margin-top: 1.5rem;
          width: 100%;
          font-size: 1.1rem;
          padding: 1.1rem 1.6rem;
        }

        @media (max-width: 880px) {
          .nav__links, .nav__cta { display: none; }
          .nav__toggle { display: inline-flex; }
        }

        @media (min-width: 881px) {
          .nav__mobile { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
