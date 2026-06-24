import type { WorkshopDateSlot } from "../data/WorkshopsHome";

const monthOrder: Record<string, number> = {
  LED: 1,
  UNO: 2,
  BRE: 3,
  DUB: 4,
  KVE: 5,
  KVĚ: 5,
  CER: 6,
  ČER: 6,
  CVC: 7,
  SRP: 8,
  ZAR: 9,
  ZÁŘ: 9,
  RIJ: 10,
  ŘIJ: 10,
  LIS: 11,
  PRO: 12,
};

const parseTime = (time: string) => {
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  return Number.parseInt(match[1], 10) * 60 + Number.parseInt(match[2], 10);
};

/** Termíny vzestupně: měsíc → den → čas */
export const sortWorkshopDates = <T extends WorkshopDateSlot>(dates: T[]): T[] =>
  [...dates].sort((a, b) => {
    const monthA = monthOrder[a.month.toUpperCase()] ?? 99;
    const monthB = monthOrder[b.month.toUpperCase()] ?? 99;
    if (monthA !== monthB) return monthA - monthB;

    const dayA = Number.parseInt(a.day, 10);
    const dayB = Number.parseInt(b.day, 10);
    if (dayA !== dayB) return dayA - dayB;

    return parseTime(a.time) - parseTime(b.time);
  });
