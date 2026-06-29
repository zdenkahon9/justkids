import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";

import { locations } from "../data/locations";

const MAP_WIDTH = 326;
const MAP_HEIGHT = 224;
const MAP_SCALE = 2;
const mapsDirectory = fileURLToPath(new URL("../assets/maps/", import.meta.url));

const staticMapUrl = (apiKey: string, lat: number, lng: number) => {
  const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
  url.searchParams.set("center", `${lat},${lng}`);
  url.searchParams.set("zoom", "16");
  url.searchParams.set("size", `${MAP_WIDTH}x${MAP_HEIGHT}`);
  url.searchParams.set("scale", String(MAP_SCALE));
  url.searchParams.set("maptype", "roadmap");
  url.searchParams.set("language", "cs");
  url.searchParams.set("markers", `color:red|${lat},${lng}`);
  url.searchParams.set("key", apiKey);
  return url;
};

const fetchMap = async (apiKey: string, location: (typeof locations)[number]) => {
  const response = await fetch(
    staticMapUrl(apiKey, location.mapCoords.lat, location.mapCoords.lng),
  );

  if (!response.ok) {
    throw new Error(
      `Google Maps Static API returned ${response.status} for location "${location.id}".`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(
      `Google Maps Static API returned an unexpected response for location "${location.id}".`,
    );
  }

  const outputPath = join(mapsDirectory, `${location.id}.png`);
  const temporaryPath = `${outputPath}.tmp`;
  await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()));
  await rename(temporaryPath, outputPath);
};

const reportGeneratedMaps = (logger: AstroIntegrationLogger) => {
  logger.info(
    `Generated ${locations.length} retina location maps (${MAP_WIDTH * MAP_SCALE}x${MAP_HEIGHT * MAP_SCALE}px).`,
  );
};

export const staticLocationMaps = (apiKey: string): AstroIntegration => ({
  name: "static-location-maps",
  hooks: {
    "astro:config:setup": async ({ command, logger }) => {
      if (command !== "build" && command !== "dev") return;

      if (!apiKey) {
        throw new Error(
          "GOOGLE_MAPS_STATIC_API_KEY is required to generate location maps.",
        );
      }

      await mkdir(mapsDirectory, { recursive: true });
      await Promise.all(locations.map((location) => fetchMap(apiKey, location)));
      reportGeneratedMaps(logger);
    },
  },
});
