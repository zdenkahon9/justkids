import type { NavLink } from "../../config/routes";
import styles from "../Navbar.module.css";
import type { DesktopNavHandler, NavDropdownId, SetOpenDropdownId } from "./dropdowns";
import { getNavDropdown } from "./dropdowns";
import NavDropdown from "./NavDropdown";

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
              label={link.label}
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

export default DesktopNav;
