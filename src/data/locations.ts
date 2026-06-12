export type Location = {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  parking: string;
  mapUrl: string;
  /** WGS84 — used for Google Maps embed pin */
  mapCoords: { lat: number; lng: number };
  accent: "blush" | "sky" | "lilac";
};

export const locations: Location[] = [
  {
    id: "zdice",
    name: "Fitcentrum Zdice",
    street: "Husova 964",
    city: "Zdice",
    zip: "267 51",
    parking: "Parkování je možné na náměstí nad prodejnou Coop.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Husova+964%2C+267+51+Zdice",
    mapCoords: { lat: 49.912799, lng: 13.97766 },
    accent: "blush",
  },
  {
    id: "horovice",
    name: "Yogasee Hořovice",
    street: "Anýžova 449/8",
    city: "Hořovice",
    zip: "268 01",
    parking: "Parkování je možné na náměstí, kousek od studia Yogasee.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogasee+Anýžova+449%2F8+Hořovice",
    mapCoords: { lat: 49.835747, lng: 13.901443 },
    accent: "sky",
  },
];
