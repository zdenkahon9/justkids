export type Review = {
  id: string;
  author: string;
  childAge: string;
  text: string;
  accent: "blush" | "sky" | "lilac";
  rating?: number;
};

export const reviews: Review[] = [
  {
    id: "1",
    author: "Bára",
    childAge: "miminko 8 měsíců",
    text:
      "Lekce u Zdenky jsou pro nás ostrůvkem klidu. Malá si zacvičí, já si oddychnu a po hodině jdeme domů spokojené.",
    accent: "blush",
    rating: 5,
  },
  {
    id: "2",
    author: "Petra",
    childAge: "holčička 1,5 roku",
    text:
      "Perfektní přístup k dětem i rodičům. Žádný stres, žádné srovnávání. Doporučuji každé mamince, která hledá hravé cvičení.",
    accent: "sky",
    rating: 5,
  },
  {
    id: "3",
    author: "Tereza",
    childAge: "kluk 2 roky",
    text:
      "Konečně cvičení, kam jdeme s radostí oba. Synek se těší a já si užívám klidnou atmosféru a moudré rady.",
    accent: "lilac",
    rating: 5,
  },
];
