/**
 * Centrální místo pro úpravy kontaktních údajů a odkazů.
 * Vlastník webu sem zapíše svoje údaje a odkazy na rezervační systém.
 */

export const site = {
  name: "JustKids",
  tagline: "Cvičení s miminky a dětmi",
  description:
    "Cvičení pro miminka a děti od 3 měsíců do 3 let v Hořovicích a ve Zdicích. Hravě, klidně, s láskou. Rezervujte si lekci online.",
  url: "https://justkids.cz",
  ogImage: "/images/logo.png",

  // ⚠️ NAHRAĎ tímto odkazem na rezervační systém (Reservio nebo Reservanto), až bude vybrán
  reservationUrl: "https://www.reservio.com/",

  // Kontaktní údaje
  contact: {
    email: "info@justkids.cz",
    phone: "+420 000 000 000",
    instructorName: "Zdenka Honzalová",
  },

  // Sociální sítě - nahraď reálnými odkazy
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export type SiteConfig = typeof site;
