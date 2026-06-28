import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { ENV_DEFAULTS, envConfig } from "./env.config.ts";

const loadedEnv = loadEnv("", process.cwd(), "");
const siteUrl = loadedEnv.SITE_URL || ENV_DEFAULTS.SITE_URL;
const envName = loadedEnv.ENV_NAME || ENV_DEFAULTS.ENV_NAME;

// https://astro.build/config
export default defineConfig({
  env: envConfig,
  site: siteUrl,
  integrations: [
    react(),
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
    envName === "production" && sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
