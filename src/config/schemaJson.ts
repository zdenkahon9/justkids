import { locations } from "../data/locations";
import { site } from "../data/site";
import { defaultSeo } from "./seo";

const CONTEXT = { "@context": "https://schema.org" } as const;

const IDS = {
  website: "website",
  business: "business",
} as const;

type EntityId = (typeof IDS)[keyof typeof IDS];

type Crumb = {
  name: string;
  path: string;
};

const createId = (id: EntityId, siteUrl: URL) => `${siteUrl.origin}#${id}` as const;

export const createWebsiteSchema = (siteUrl: URL) =>
  ({
    ...CONTEXT,
    "@type": "WebSite",
    "@id": createId(IDS.website, siteUrl),
    name: site.name,
    description: defaultSeo.metaDescription,
    url: siteUrl,
    inLanguage: "cs",
    publisher: { "@id": createId(IDS.business, siteUrl) },
  }) as const;

export const createLocalBusinessSchema = (siteUrl: URL) =>
  ({
    ...CONTEXT,
    "@type": "LocalBusiness",
    "@id": createId(IDS.business, siteUrl),
    name: site.name,
    description: defaultSeo.metaDescription,
    url: siteUrl,
    image: new URL(site.ogImage, siteUrl),
    telephone: site.contact.phone,
    email: site.contact.email,
    sameAs: [site.social.facebook, site.social.instagram],
    address: locations.map((location) => ({
      "@type": "PostalAddress" as const,
      streetAddress: location.street,
      addressLocality: location.city,
      postalCode: location.zip,
      addressCountry: "CZ",
    })),
    areaServed: ["Zdice", "Hořovice", "Beroun", "Středočeský kraj"],
    audience: {
      "@type": "Audience",
      audienceType: "rodiče s dětmi 3 měsíce - 3 roky",
    },
  }) as const;

export const createBreadcrumbSchema = (siteUrl: URL, crumbs: readonly Crumb[]) =>
  ({
    ...CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, siteUrl).toString(),
    })),
  }) as const;
