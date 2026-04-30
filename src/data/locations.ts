export type Location = {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  parking: string;
  mapUrl: string;
  accent: "blush" | "sky" | "lilac";
};

export const locations: Location[] = [
  {
    id: "zdice",
    name: "Fitcentrum Zdice",
    street: "Husova 964",
    city: "Zdice",
    zip: "267 51",
    parking:
      "Parkování je možné na náměstí nad prodejnou Coop. Přístup vede po schodišti mezi potravinami a poštou.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Fitcentrum+Zdice+Husova+964",
    accent: "sky",
  },
  {
    id: "horovice",
    name: "Yogasee Hořovice",
    street: "Anýžova 449/8",
    city: "Hořovice",
    zip: "268 01",
    parking:
      "Parkování je možné na náměstí, kousek od studia Yogasee.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogasee+Anýžova+449%2F8+Hořovice",
    accent: "blush",
  },
];
