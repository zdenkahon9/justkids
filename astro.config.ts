import preact from "@astrojs/preact";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { ENV_DEFAULTS, envConfig } from "./env.config.ts";
import { normalizePagePath, pageSeoEntries } from "./src/config/seo.ts";

const loadedEnv = loadEnv("", process.cwd(), "");
const siteUrl = loadedEnv.SITE_URL || ENV_DEFAULTS.SITE_URL;
const envName = loadedEnv.ENV_NAME || ENV_DEFAULTS.ENV_NAME;
const sitemapChangeFrequency = {
  weekly: ChangeFreqEnum.WEEKLY,
  monthly: ChangeFreqEnum.MONTHLY,
} as const;

// https://astro.build/config
export default defineConfig({
  env: envConfig,
  trailingSlash: "never",
  site: siteUrl,
  integrations: [
    preact(),
    icon({
      include: {
        emojione: ["monkey-face"],
        fluent: [
          "briefcase-medical-24-regular",
          "chat-multiple-20-regular",
          "hand-open-heart-20-regular",
          "home-heart-24-regular",
          "info-24-regular",
          "people-24-regular",
        ],
        fxemoji: ["cherryblossom", "rocket"],
        healthicons: ["running-outline"],
        iconamoon: ["arrow-right-2-light"],
        iconoir: ["clean-water"],
        ion: ["sparkles-outline"],
        lineicons: ["calendar-days"],
        "material-symbols-light": ["handshake-outline-rounded"],
        noto: ["seedling"],
        "noto-v1": ["lion"],
        ph: [
          "brain",
          "broom",
          "check-circle-fill",
          "clock",
          "clock-counter-clockwise-fill",
          "envelope-simple",
          "hand-heart-light",
          "map-pin",
          "paint-brush",
          "phone",
          "smiley",
        ],
        raphael: ["quote"],
        solar: ["star-linear"],
        stash: ["shield-duotone"],
        "streamline-sharp": ["health-care-2"],
        twemoji: ["hatching-chick", "pink-heart"],
        wordpress: ["external"],
      },
    }),
    envName === "production" &&
      sitemap({
        filter: (page) =>
          pageSeoEntries.some(({ path }) => path === normalizePagePath(page)),
        serialize(item) {
          const page = pageSeoEntries.find(
            ({ path }) => path === normalizePagePath(item.url),
          );
          if (!page) return undefined;

          return {
            ...item,
            changefreq: sitemapChangeFrequency[page.sitemap.changefreq],
            priority: page.sitemap.priority,
          };
        },
      }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
