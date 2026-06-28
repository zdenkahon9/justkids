import type { APIRoute } from "astro";

import { ENV } from "@/config/env";
import { defaultSeo, pageSeoEntries } from "@/config/seo";

const toLink = (title: string, path: string, description: string, origin: URL) =>
  `- [${title}](${new URL(path, origin).href}): ${description}`;

export const GET: APIRoute = ({ site: astroSite }) => {
  if (!ENV.IS_PRODUCTION) return new Response(null, { status: 404 });
  if (!astroSite) throw new Error("Astro.site is not set");

  const body = [
    `# ${defaultSeo.baseTitle}`,
    `> ${defaultSeo.metaDescription}`,
    "## Pages",
    pageSeoEntries
      .map(({ llmsTitle, path, description }) =>
        toLink(llmsTitle, path, description, astroSite),
      )
      .join("\n"),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
