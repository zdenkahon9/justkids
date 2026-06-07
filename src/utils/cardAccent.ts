/** Maps data `accent` keys to CSS custom property values for card theming. */
const ACCENT_DEEP: Record<string, string> = {
  sky: "var(--color-sky-deep)",
  "sky-deep": "var(--color-sky-deep)",
  lilac: "var(--color-lilac-deep)",
  "lilac-deep": "var(--color-lilac-deep)",
  blush: "var(--color-blush-deep)",
  "blush-deep": "var(--color-blush-deep)",
  cream: "var(--color-coral-deep)",
};

const ACCENT_SOFT: Record<string, string> = {
  sky: "var(--color-sky-soft)",
  "sky-deep": "var(--color-sky-soft)",
  lilac: "var(--color-lilac-soft)",
  "lilac-deep": "var(--color-lilac-soft)",
  blush: "var(--color-blush-soft)",
  "blush-deep": "var(--color-blush-soft)",
  cream: "var(--color-cream-200)",
};

export const cardAccentDeep = (accent: string) =>
  ACCENT_DEEP[accent] ?? "var(--color-blush-deep)";

export const cardAccentSoft = (accent: string) =>
  ACCENT_SOFT[accent] ?? "var(--color-blush-soft)";
