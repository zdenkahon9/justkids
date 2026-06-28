import type { APIRoute } from "astro";

import { ENV } from "@/config/env";
import { site } from "@/data/site";

const toLink = (title: string, path: string, description: string, origin: URL) =>
  `- [${title}](${new URL(path, origin).href}): ${description}`;

export const GET: APIRoute = ({ site: astroSite }) => {
  if (!ENV.IS_PRODUCTION) return new Response(null, { status: 404 });
  if (!astroSite) throw new Error("Astro.site is not set");

  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    "## Pages",
    [
      toLink("Domů", "/", "Cvičení pro miminka a děti od 3 měsíců do 9 let.", astroSite),
      toLink(
        "Věkové kategorie",
        "/vekove-kategorie",
        "Skupiny dle věku dítěte.",
        astroSite,
      ),
      toLink("Workshopy", "/workshopy", "Termíny workshopů a táborů.", astroSite),
      toLink("Recenze", "/recenze", "Recenze od rodičů.", astroSite),
    ].join("\n"),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
