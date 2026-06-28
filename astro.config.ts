import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { envConfig } from "./env.config.ts";

const { SITE_URL, ENV_NAME } = loadEnv("", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  env: envConfig,
  site: SITE_URL ?? "https://dev.justkids.cz",
  integrations: [react(), icon(), ENV_NAME === "production" && sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
