import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import { envConfig } from "./env.config.ts";

const { SITE_URL, ENV_NAME } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  env: envConfig,
  site: SITE_URL ?? "https://justkids.cz",
  integrations: [react(), ENV_NAME === "production" && sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
