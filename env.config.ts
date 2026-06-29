import type { AstroUserConfig } from "astro";
import { envField } from "astro/config";

export const ENV_DEFAULTS = {
  SITE_URL: "https://dev.justkids.cz",
  ENV_NAME: "staging",
  PUBLIC_UMAMI_SITE_ID: crypto.randomUUID(),
  PUBLIC_UMAMI_SHARE_URL: "https://cloud.umami.is",
  GOOGLE_MAPS_STATIC_API_KEY: "",
} as const;

export const envConfig = {
  schema: {
    SITE_URL: envField.string({
      context: "server",
      access: "public",
      default: ENV_DEFAULTS.SITE_URL,
    }),
    ENV_NAME: envField.string({
      context: "server",
      access: "public",
      default: ENV_DEFAULTS.ENV_NAME,
    }),
    PUBLIC_UMAMI_SITE_ID: envField.string({
      context: "client",
      access: "public",
      default: ENV_DEFAULTS.PUBLIC_UMAMI_SITE_ID,
    }),
    PUBLIC_UMAMI_SHARE_URL: envField.string({
      context: "client",
      access: "public",
      default: ENV_DEFAULTS.PUBLIC_UMAMI_SHARE_URL,
    }),
    GOOGLE_MAPS_STATIC_API_KEY: envField.string({
      context: "server",
      access: "public",
      default: ENV_DEFAULTS.GOOGLE_MAPS_STATIC_API_KEY,
    }),
  },
} as const satisfies AstroUserConfig["env"];
