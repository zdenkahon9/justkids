type LessonEntry = readonly [iso: string, status: number | string];

export type LessonDate = {
  iso: string;
  shortDate: string;
  fullDate: string;
  lesson?: number;
  note?: string;
};

export type LessonDay = {
  id: string;
  label: string;
  abbreviation: string;
  accent: string;
  location: string;
  dates: LessonDate[];
};

const PRAGUE_TIME_ZONE = "Europe/Prague";

const formatDate = (iso: string, includeYear = false) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day}. ${month}.${includeYear ? ` ${year}` : ""}`;
};

const createDates = (entries: readonly LessonEntry[]): LessonDate[] =>
  entries.map(([iso, status]) => ({
    iso,
    shortDate: formatDate(iso),
    fullDate: formatDate(iso, true),
    ...(typeof status === "number" ? { lesson: status } : { note: status }),
  }));

export const lessonTopics: Record<number, string> = {
  1: "Úvodní hodina",
  2: "Smysly – sluch",
  3: "Smysly – chuť",
  4: "Smysly – hmat",
  5: "Smysly – zrak, čich",
  6: "Halloween",
  7: "Podzim",
  8: "Dopravní prostředky – kolo",
  9: "Lodě",
  10: "Letadlo",
  11: "Auta",
  12: "Andělé a čertíci",
  13: "Vánoce",
  14: "Zima",
  15: "Barvy",
  16: "Ukončení semestru",
};

export const lessonIcons: Record<number, string | string[]> = {
  1: "solar:star-linear",
  2: "streamline:ear-hearing",
  3: "emojione-monotone:tongue",
  4: "ion:hand-left-outline",
  5: "ph:eye-fill",
  6: "mdi:halloween",
  7: "emojione-monotone:maple-leaf",
  8: "fluent:vehicle-bicycle-16-regular",
  9: "streamline-plump:sail-ship",
  10: "ph:airplane-takeoff",
  11: "fluent:vehicle-car-profile-16-regular",
  12: ["hugeicons:angel", "fluent-emoji-high-contrast:smiling-face-with-horns"],
  13: "roentgen:christmas-tree",
  14: "ph:snowflake",
  15: "ion:color-palette-outline",
  16: "fluent-mdl2:trophy",
};

export const lessonDays: LessonDay[] = [
  {
    id: "monday",
    label: "Pondělí",
    abbreviation: "Po",
    accent: "blush",
    location: "Zdice",
    dates: createDates([
      ["2026-09-07", 1],
      ["2026-09-14", 2],
      ["2026-09-21", 3],
      ["2026-09-28", "Státní svátek – necvičí se"],
      ["2026-10-05", 4],
      ["2026-10-12", 5],
      ["2026-10-19", 6],
      ["2026-10-26", "Volno – necvičí se"],
      ["2026-11-02", 7],
      ["2026-11-09", 8],
      ["2026-11-16", 9],
      ["2026-11-23", 10],
      ["2026-11-30", 11],
      ["2026-12-07", 12],
      ["2026-12-14", 13],
      ["2026-12-21", "Vánoční volno – necvičí se"],
      ["2026-12-28", "Vánoční volno – necvičí se"],
      ["2027-01-04", 14],
      ["2027-01-11", 15],
      ["2027-01-18", 16],
    ]),
  },
  {
    id: "tuesday",
    label: "Úterý",
    abbreviation: "Út",
    accent: "lilac",
    location: "Zdice",
    dates: createDates([
      ["2026-09-08", 1],
      ["2026-09-15", 2],
      ["2026-09-22", 3],
      ["2026-09-29", 4],
      ["2026-10-06", 5],
      ["2026-10-13", 6],
      ["2026-10-20", 7],
      ["2026-10-27", "Volno – necvičí se"],
      ["2026-11-03", 8],
      ["2026-11-10", 9],
      ["2026-11-17", "Státní svátek – necvičí se"],
      ["2026-11-24", 10],
      ["2026-12-01", 11],
      ["2026-12-08", 12],
      ["2026-12-15", 13],
      ["2026-12-22", "Vánoční volno – necvičí se"],
      ["2026-12-29", "Vánoční volno – necvičí se"],
      ["2027-01-05", 14],
      ["2027-01-12", 15],
      ["2027-01-19", 16],
    ]),
  },
  {
    id: "wednesday",
    label: "Středa",
    abbreviation: "St",
    accent: "sky",
    location: "Hořovice",
    dates: createDates([
      ["2026-09-09", 1],
      ["2026-09-16", 2],
      ["2026-09-23", 3],
      ["2026-09-30", 4],
      ["2026-10-07", 5],
      ["2026-10-14", 6],
      ["2026-10-21", 7],
      ["2026-10-28", "Státní svátek – necvičí se"],
      ["2026-11-04", 8],
      ["2026-11-11", 9],
      ["2026-11-18", "Volno – necvičí se"],
      ["2026-11-25", 10],
      ["2026-12-02", 11],
      ["2026-12-09", 12],
      ["2026-12-16", 13],
      ["2026-12-23", "Vánoční volno – necvičí se"],
      ["2026-12-30", "Vánoční volno – necvičí se"],
      ["2027-01-06", 14],
      ["2027-01-13", 15],
      ["2027-01-20", 16],
    ]),
  },
];

export const getIsoDateInTimeZone = (date = new Date(), timeZone = PRAGUE_TIME_ZONE) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

export const findCurrentDateIndex = (
  dates: readonly Pick<LessonDate, "iso">[],
  todayIso: string,
) => {
  const upcomingIndex = dates.findIndex(({ iso }) => iso >= todayIso);
  return upcomingIndex === -1 ? Math.max(0, dates.length - 1) : upcomingIndex;
};

export const validateLessonCalendar = (
  days: readonly LessonDay[] = lessonDays,
  topics: Readonly<Record<number, string>> = lessonTopics,
  icons: Readonly<Record<number, string | string[]>> = lessonIcons,
) => {
  const expectedLessons = Array.from({ length: 16 }, (_, index) => index + 1);
  const allDates = new Set<string>();

  for (const day of days) {
    const lessons = day.dates.flatMap(({ lesson }) =>
      lesson === undefined ? [] : [lesson],
    );
    if (lessons.join(",") !== expectedLessons.join(",")) {
      throw new Error(`${day.label}: lekce musí postupovat přesně od 1 do 16.`);
    }

    day.dates.forEach((date, index) => {
      if (index > 0 && day.dates[index - 1].iso >= date.iso) {
        throw new Error(`${day.label}: termíny nejsou chronologicky seřazené.`);
      }
      if (allDates.has(date.iso)) {
        throw new Error(`Datum ${date.iso} je v kalendáři uvedené vícekrát.`);
      }
      allDates.add(date.iso);

      const hasLesson = date.lesson !== undefined;
      const hasNote = Boolean(date.note?.trim());
      if (hasLesson === hasNote) {
        throw new Error(`${day.label} ${date.iso}: vyplňte lekci, nebo poznámku.`);
      }
    });
  }

  expectedLessons.forEach((lesson) => {
    if (!topics[lesson]?.trim()) throw new Error(`${lesson}. lekce nemá téma.`);
    const configuredIcons = Array.isArray(icons[lesson])
      ? icons[lesson]
      : [icons[lesson]];
    if (configuredIcons.length === 0 || configuredIcons.some((icon) => !icon?.trim())) {
      throw new Error(`${lesson}. lekce nemá platnou ikonu.`);
    }
  });
};

validateLessonCalendar();
