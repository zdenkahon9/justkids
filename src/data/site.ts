/**
 * Centrální místo pro úpravy kontaktních údajů a odkazů.
 * Vlastník webu sem zapíše svoje údaje a odkazy na rezervační systém.
 */

export const site = {
  name: "JustKids",
  tagline: "pohybem k radosti",
  url: "https://justkids.cz",
  ogImage: "/og-image.jpg",
  ogImageAlt: "JustKids – Pohybem k radosti",

  // ⚠️ NAHRAĎ tímto odkazem na rezervační systém (Reservio nebo Reservanto), až bude vybrán
  // reservationUrl: "https://www.reservio.com/",

  // Odkaz na přihlašovací Google formulář (tlačítka „Přihláška“ v navigaci)
  signupFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdlOtohR3h9nuEMzEfoGYKpwgP9PWaQWJiikB_oXtQYvNat-w/viewform",

  // Kontaktní údaje
  contact: {
    email: "info@justkids.cz",
    phone: "+420 731 818 841",
    instructorName: "Mgr. Aneta Justychová",
  },

  // Veřejné údaje ověřené v živnostenském rejstříku dne 6. 10. 2026
  business: {
    name: "Mgr. Aneta Justychová",
    registrationNumber: "07312709",
    registeredOffice: "Havlíčkova 866, 267 51 Zdice",
    register:
      "Fyzická osoba zapsaná v živnostenském rejstříku; příslušný úřad: Městský úřad Beroun",
    isVatPayer: false,
  },

  // Sociální sítě
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61564479295700",
    facebookReviews: "https://www.facebook.com/profile.php?id=61564479295700&sk=reviews",
    instagram: "https://www.instagram.com/justkids.cz/",
  },
} as const;
