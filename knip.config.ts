import type { KnipConfig } from "knip";

export default {
  astro: {
    config: ["astro.config.{js,cjs,mjs,ts,mts}"],
    entry: [
      "src/pages/**/*.{astro,mdx,ts}",
      "!src/pages/**/_*",
      "!src/pages/**/_*/**",
      "scripts/fetch-reviews.mjs",
    ],
    project: ["src/**/*"],
  },
  // Astro Icon discovers installed collections dynamically from package.json.
  ignoreDependencies: ["^@iconify-json/"],
} satisfies KnipConfig;
