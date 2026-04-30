export type Rule = {
  id: number;
  title: string;
  detail: string;
};

/**
 * Desatero chování na lekci - 10 jednoduchých pravidel,
 * která pomáhají, aby byly lekce bezpečné a příjemné pro všechny.
 */
export const rules: Rule[] = [
  {
    id: 1,
    title: "Přijďte včas",
    detail: "Ideálně 5 minut před začátkem, ať máte čas se v klidu převléknout.",
  },
  {
    id: 2,
    title: "Zdravé miminko",
    detail: "Pokud má miminko teplotu, rýmu nebo nějaký infekt, nechte ho doma.",
  },
  {
    id: 3,
    title: "Pohodlné oblečení",
    detail: "Sportovní nebo volné oblečení pro vás i miminko, ve kterém se nic nesvírá.",
  },
  {
    id: 4,
    title: "Nazujte se v šatně",
    detail: "Cvičíme bosi nebo v ponožkách s protiskluzem. V hale jsou jen čisté nohy.",
  },
  {
    id: 5,
    title: "Pití a plenku s sebou",
    detail: "Vodu, plenku, podložku a ručník si přineste vlastní.",
  },
  {
    id: 6,
    title: "Vlastní tempo dítěte",
    detail: "Nikdy dítě do ničeho netlačíme. Když se dnes nechce, je to v pořádku.",
  },
  {
    id: 7,
    title: "Bez telefonů",
    detail: "Lekce je čas pro vás a miminko. Telefony zůstávají v kabelce.",
  },
  {
    id: 8,
    title: "Respekt k ostatním",
    detail: "Chováme se k sobě laskavě, navzájem si pomáháme a netísníme se.",
  },
  {
    id: 9,
    title: "Odhláška 24 h předem",
    detail: "Pokud nemůžete přijít, dejte mi prosím vědět den předem, ať lekci využije někdo další.",
  },
  {
    id: 10,
    title: "Užijte si to",
    detail: "Hlavní pravidlo - odložte starosti, hrajte si a buďte tu pro sebe a miminko.",
  },
];
