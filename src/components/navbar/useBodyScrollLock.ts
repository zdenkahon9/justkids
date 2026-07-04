import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

export const useBodyScrollLock = (
  open: boolean,
  pendingHashRef: RefObject<string | null>,
) => {
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previousStyles = {
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
      html.style.overflow = previousStyles.htmlOverflow;
      html.style.overscrollBehavior = previousStyles.htmlOverscroll;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.overscrollBehavior = previousStyles.bodyOverscroll;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;

      const hash = pendingHashRef.current;
      pendingHashRef.current = null;

      if (hash) {
        // A single animation frame still races the layout after the fixed body is unlocked.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
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
