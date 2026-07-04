import type { RefObject, TargetedMouseEvent } from "preact";
import { useCallback } from "preact/hooks";
import type { Dispatch, StateUpdater } from "preact/hooks";

import type { DesktopNavHandler, SetOpenDropdownId } from "./dropdowns";

export type MobileNavHandler = (
  event: TargetedMouseEvent<HTMLAnchorElement>,
  href: string,
) => void;

type UseHashNavigationOptions = {
  isMenuOpen: boolean;
  pendingHashRef: RefObject<string | null>;
  setMenuOpen: Dispatch<StateUpdater<boolean>>;
  setOpenDropdownId: SetOpenDropdownId;
};

export const useHashNavigation = ({
  isMenuOpen,
  pendingHashRef,
  setMenuOpen,
  setOpenDropdownId,
}: UseHashNavigationOptions) => {
  const scrollToHash = useCallback((hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    }
  }, []);

  const handleMobileNav = useCallback<MobileNavHandler>(
    (event, href) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);
      const isSamePage = !path || path === window.location.pathname;

      if (!isSamePage) {
        setMenuOpen(false);
        return;
      }

      event.preventDefault();

      if (isMenuOpen) {
        pendingHashRef.current = hash;
        setMenuOpen(false);
      } else {
        scrollToHash(hash);
      }
    },
    [isMenuOpen, pendingHashRef, scrollToHash, setMenuOpen],
  );

  const handleDesktopNav = useCallback<DesktopNavHandler>(
    (event, href, options) => {
      const hashIndex = href.indexOf("#");
      const closeDropdown = options?.closeDropdownAfterClick
        ? () => setOpenDropdownId(null)
        : null;

      if (hashIndex === -1) {
        closeDropdown?.();
        return;
      }

      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);
      const isSamePage = !path || path === window.location.pathname;

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
