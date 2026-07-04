import type { RefObject, TargetedKeyboardEvent } from "preact";
import { useEffect, useRef } from "preact/hooks";

import type { NavLink } from "../../config/routes";
import styles from "../Navbar.module.css";
import type { MobileNavHandler } from "./useHashNavigation";

type MobileMenuProps = {
  items: readonly NavLink[];
  onClose: () => void;
  onNavigate: MobileNavHandler;
  open: boolean;
  reservationUrl: string;
  toggleRef: RefObject<HTMLButtonElement>;
};

const MobileMenu = ({
  items,
  onClose,
  onNavigate,
  open,
  reservationUrl,
  toggleRef,
}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      menuRef.current?.focus({ preventScroll: true });
      return;
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleRef.current?.focus();
    }
  }, [open, toggleRef]);

  const trapFocus = (event: TargetedKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusableLinks = Array.from(
      menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
    );
    const firstLink = focusableLinks[0];
    const lastLink = focusableLinks.at(-1);

    if (!firstLink || !lastLink) return;

    if (
      event.shiftKey &&
      (document.activeElement === menuRef.current || document.activeElement === firstLink)
    ) {
      event.preventDefault();
      lastLink.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      firstLink.focus();
    }
  };

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className={styles.navMobile}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      hidden={!open}
      onKeyDown={trapFocus}
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
};

export default MobileMenu;
