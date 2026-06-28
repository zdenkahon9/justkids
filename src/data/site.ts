import logo from "../assets/images/logo.png";

/**
 * Centrální místo pro úpravy kontaktních údajů a odkazů.
 * Vlastník webu sem zapíše svoje údaje a odkazy na rezervační systém.
 */

export const site = {
  name: "JustKids",
  tagline: "pohybem k radosti",
  url: "https://justkids.cz",
  ogImage: logo.src,

  // ⚠️ NAHRAĎ tímto odkazem na rezervační systém (Reservio nebo Reservanto), až bude vybrán
  // reservationUrl: "https://www.reservio.com/",

  // Odkaz na přihlašovací Google formulář (tlačítka „Rezervace“ v navigaci)
  signupFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdlOtohR3h9nuEMzEfoGYKpwgP9PWaQWJiikB_oXtQYvNat-w/viewform",

  // Kontaktní údaje
  contact: {
    email: "info@justkids.cz",
    phone: "+420 731 818 841",
    instructorName: "Mgr. Aneta Justychová",
  },

  // Sociální sítě
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61564479295700",
    facebookReviews: "https://www.facebook.com/profile.php?id=61564479295700&sk=reviews",
    instagram: "https://www.instagram.com/justkids.cz/",
  },
} as const;
