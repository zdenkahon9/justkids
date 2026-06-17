/**
 * Stáhne recenze z Apify datasetu a zapíše je do src/data/reviews.json
 *
 * Použití: npm run fetch-reviews
 * Potřebuje v .env: APIFY_API_TOKEN, APIFY_DATASET_ID
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outputPath = join(root, "src/data/reviews.json");

const token = process.env.APIFY_API_TOKEN;
const datasetId = process.env.APIFY_DATASET_ID;
const maxReviews = Number(process.env.APIFY_REVIEWS_LIMIT ?? "0");

const accents = ["blush", "sky", "lilac"];
const pageSize = 1000;

if (!token) {
  console.error("Chybí APIFY_API_TOKEN v souboru .env");
  process.exit(1);
}

if (!datasetId) {
  console.error("Chybí APIFY_DATASET_ID v souboru .env");
  process.exit(1);
}

/** @param {string} url */
function authorFromFacebookUrl(url) {
  try {
    const pathname = new URL(url).pathname.replace(/^\//, "");
    const slug = pathname.split("/").find(Boolean);
    if (slug && slug !== "profile.php") {
      return slug.replace(/\./g, " ");
    }
  } catch {
    // neplatná URL
  }
  return null;
}

/** @param {Record<string, unknown>} item */
function mapApifyReview(item, index) {
  const text = String(item.text ?? "").trim();
  if (!text) return null;

  const author =
    [item.userName, item.name, item.reviewerName, item.author]
      .map((v) => (typeof v === "string" ? v.trim() : ""))
      .find(Boolean) ??
    authorFromFacebookUrl(String(item.facebookUrl ?? "")) ??
    "Rodič";

  const dateRaw = item.date ?? item.createdAt ?? item.timestamp;
  let childAge = "Recenze z Facebooku";

  if (typeof dateRaw === "string" || typeof dateRaw === "number") {
    const parsed = new Date(dateRaw);
    if (!Number.isNaN(parsed.getTime())) {
      childAge = parsed.toLocaleDateString("cs-CZ", {
        month: "long",
        year: "numeric",
      });
    }
  }

  const id =
    (typeof item.id === "string" && item.id) ||
    `${index}-${String(dateRaw ?? text.slice(0, 24))}`;

  return {
    id,
    author,
    childAge,
    text,
    accent: accents[index % accents.length],
    ...(item.isRecommended === true ? { rating: 5 } : {}),
  };
}

/** @returns {Promise<Record<string, unknown>[]>} */
async function fetchAllDatasetItems() {
  /** @type {Record<string, unknown>[]} */
  const allItems = [];
  let offset = 0;

  while (true) {
    const url = new URL(
      `https://api.apify.com/v2/datasets/${datasetId}/items`,
    );
    url.searchParams.set("format", "json");
    url.searchParams.set("clean", "true");
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("limit", String(pageSize));

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Apify API chyba ${response.status}: ${body}`);
      process.exit(1);
    }

    /** @type {Record<string, unknown>[]} */
    const page = await response.json();
    if (page.length === 0) break;

    allItems.push(...page);
    offset += page.length;

    if (maxReviews > 0 && allItems.length >= maxReviews) {
      return allItems.slice(0, maxReviews);
    }

    if (page.length < pageSize) break;
  }

  return allItems;
}

const items = await fetchAllDatasetItems();

const reviews = items
  .map((item, index) => mapApifyReview(item, index))
  .filter(Boolean);

if (reviews.length === 0) {
  console.error("Dataset neobsahuje žádné recenze s textem.");
  process.exit(1);
}

writeFileSync(outputPath, `${JSON.stringify(reviews, null, 2)}\n`, "utf8");

console.log(`Uloženo ${reviews.length} recenzí do src/data/reviews.json`);
