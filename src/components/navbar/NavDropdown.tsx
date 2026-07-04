import { useRef } from "preact/hooks";

import styles from "../Navbar.module.css";
import type {
  DesktopNavHandler,
  NavDropdownConfig,
  NavDropdownId,
  SetOpenDropdownId,
} from "./dropdowns";

type NavDropdownProps = {
  config: NavDropdownConfig;
  label: string;
  onNavigate: DesktopNavHandler;
  openDropdownId: NavDropdownId | null;
  setOpenDropdownId: SetOpenDropdownId;
};

const NavDropdown = ({
  config,
  label,
  onNavigate,
  openDropdownId,
  setOpenDropdownId,
}: NavDropdownProps) => {
  const dropdownId = config.id;
  const isOpen = openDropdownId === dropdownId;
  const clickArmedRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDropdown = () => setOpenDropdownId(dropdownId);
  const closeDropdown = () => {
    setOpenDropdownId((current) => (current === dropdownId ? null : current));
  };
  const resetAndCloseDropdown = () => {
    clickArmedRef.current = false;
    closeDropdown();
  };

  const handleTriggerClick = () => {
    if (clickArmedRef.current && isOpen) {
      clickArmedRef.current = false;
      closeDropdown();
      return;
    }

    clickArmedRef.current = true;
    openDropdown();
  };

  return (
    <li
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={openDropdown}
      onMouseLeave={resetAndCloseDropdown}
      onFocusIn={openDropdown}
      onFocusOut={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          resetAndCloseDropdown();
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !isOpen) return;

        event.preventDefault();
        event.stopPropagation();
        triggerRef.current?.focus();
        resetAndCloseDropdown();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.dropdownTrigger}
        aria-haspopup="true"
        aria-controls={`nav-submenu-${dropdownId}`}
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
      >
        <span className={styles.dropdownTriggerInner}>
          {label}
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
          {config.links.map((link, index) => (
            <li
              key={link.href + link.label}
              className={index > 0 ? styles.dropdownItemDivided : undefined}
            >
              <a
                href={link.href}
                onClick={(event) =>
                  onNavigate(event, link.href, { closeDropdownAfterClick: true })
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NavDropdown;
