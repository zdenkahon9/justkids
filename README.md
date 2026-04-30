# JustKids

> Cvičení s miminky a dětmi v Hořovicích a ve Zdicích.

Statický web postavený v **Astro + React + TypeScript**. Mobile-first, rychlý, SEO-friendly.

---

## Spuštění projektu

```bash
# 1) Instalace závislostí
npm install

# 2) Lokální vývoj (http://localhost:4321)
npm run dev

# 3) Produkční build
npm run build

# 4) Náhled produkčního buildu
npm run preview
```

---

## Struktura projektu

```
justkids/
├── public/                # statické soubory (favicon, obrázky, robots.txt)
│   ├── images/            # logo a pozadí
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/            # interní obrázky pro Astro
│   ├── components/        # malé znovupoužitelné komponenty
│   │   ├── Navbar.tsx     # interaktivní (React) - sticky + mobile menu
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Courses.astro
│   │   ├── AgeGroups.astro
│   │   ├── Locations.astro
│   │   ├── Gallery.astro
│   │   ├── Pricing.astro
│   │   ├── News.astro
│   │   ├── CtaBanner.astro
│   │   └── Footer.astro
│   ├── data/              # ⭐ tady se upravuje obsah
│   │   ├── site.ts        # kontakt, sociální sítě, REZERVAČNÍ ODKAZ
│   │   ├── news.ts        # novinky (cards)
│   │   ├── ageGroups.ts   # věkové skupiny
│   │   ├── locations.ts   # 2 lokace + parkování
│   │   ├── pricing.ts     # ceník
│   │   └── courses.ts     # absolvované kurzy
│   ├── layouts/
│   │   └── BaseLayout.astro  # SEO meta, OG, schema.org
│   ├── pages/
│   │   └── index.astro    # jediná stránka (single-page)
│   └── styles/
│       └── global.css     # design tokens + globální styly
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Jak upravovat obsah

Veškerý obsah je v souborech `src/data/*.ts`. Není potřeba sahat do komponent.

### 📰 Přidání novinky

Otevři `src/data/news.ts` a přidej novou položku **na začátek** pole `news`:

```ts
export const news: NewsItem[] = [
  {
    title: "Název novinky",
    date: "2026-05-01",                 // formát YYYY-MM-DD
    text: "Krátký popis (1-3 věty).",
    link: {                             // volitelné
      href: "#rezervace",
      label: "Rezervovat místo",
    },
  },
  // ...starší novinky
];
```

Novinky se na webu **automaticky řadí od nejnovější**.
Pokud chceš novinku skrýt, jednoduše ji smaž nebo zakomentuj.

### 🔗 Změna rezervačního odkazu

Až bude vybrán rezervační systém (Reservio nebo Reservanto), uprav `src/data/site.ts`:

```ts
export const site = {
  // ...
  reservationUrl: "https://www.reservio.com/justkids/booking", // ← TADY
  // ...
};
```

Tlačítka "Rezervovat" v Hero, Navbaru, Ceníku i CTA banneru pak automaticky odkazují tam.

### 📞 Kontakt

V `src/data/site.ts`:

```ts
contact: {
  email: "info@justkids.cz",
  phone: "+420 000 000 000",
  instructorName: "Zdenka Honzalová",
},
social: {
  facebook: "https://www.facebook.com/tvoje-stranka",
  instagram: "https://www.instagram.com/tvuj-profil",
},
```

### 📍 Lokace a parkování

V `src/data/locations.ts` můžeš upravit adresy nebo informace o parkování.

### 💰 Ceník

V `src/data/pricing.ts`. Vlajka "Nejoblíbenější" se zobrazuje u tarifu, který má `highlight: true`.

### 📚 Absolvované kurzy

V `src/data/courses.ts`.

### 👶 Věkové skupiny

V `src/data/ageGroups.ts`. Skupina označená `optional: true` zobrazí badge "volitelné".

---

## SEO

- **Meta tagy** (title, description, OG, Twitter Card) v `src/layouts/BaseLayout.astro`
- **Schema.org LocalBusiness** se generuje automaticky z `site.ts` a `locations.ts`
- **Sitemap** se generuje při buildu (`@astrojs/sitemap`)
- **robots.txt** je v `public/robots.txt`
- **Canonical URL** pro jistotu nastavena v base layoutu

Po nasazení nezapomeň v `astro.config.mjs` nastavit reálnou doménu (`site: "https://justkids.cz"`).

---

## Přístupnost (a11y)

- Sémantické HTML landmarky (`<header>`, `<main>`, `<footer>`, `<section>`)
- Skip-link na začátek hlavního obsahu
- Logická hierarchie nadpisů (jeden `<h1>` v Hero, dále `<h2>` na sekce)
- Klávesová navigace + viditelné focus stavy
- Respektuje `prefers-reduced-motion` (vypne animace)

---

## Cookies / Analytics

Web zatím **neobsahuje žádné trackery ani analytics**, takže není potřeba ani cookie banner.

Až budeš přidávat analytics (Google Analytics, Plausible…), nezapomeň přidat i cookie lištu (např. cookieconsent.com nebo vlastní řešení) a aktualizovat tento README.

---

## Obrázky

- Logo: `public/images/logo.png`
- Pozadí: `public/images/pozadi.png`

**❗ Pro ochranu soukromí dětí (GDPR) na webu nejsou žádné reálné fotky dětí.**
Místo toho se používají vlastní SVG ilustrace v sekci `Gallery.astro` a portrét v `About.astro`.

---

## Nasazení

Web lze nasadit kamkoli, kde chodí statické HTML:

- **Netlify** (přetáhnout složku `dist/` po `npm run build`)
- **Vercel** (`vercel deploy`)
- **GitHub Pages** (s GitHub Actions)
- **Vlastní hosting** (nahrát `dist/` přes FTP)

---

## Technologie

- [Astro](https://astro.build) 5
- [React](https://react.dev) 19 (jen pro interaktivní Navbar)
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS v4](https://tailwindcss.com)
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
