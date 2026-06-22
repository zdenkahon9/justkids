import { locations } from "./locations";

export type ScheduleMeta = {
  sectionId: string;
  title: string;
  titleAccent: string;
};

export type ScheduleSlot = {
  time: string;
  activities: string[];
};

export type ScheduleDay = {
  label?: string;
  slots: ScheduleSlot[];
};

export type ScheduleLocation = {
  id: string;
  label: string;
  accentClass: string;
  accent: "blush-deep" | "lilac-deep" | "sky-deep";
  /** Same soft token as active pill background and timeline axis */
  accentSoft: "blush-soft" | "lilac-soft" | "sky-soft";
  venue: {
    city: string;
    street: string;
    address: string;
    mapUrl: string;
  };
  days: ScheduleDay[];
};

export const scheduleMeta: ScheduleMeta = {
  sectionId: "rozvrh-lekci",
  title: "Rozvrh",
  titleAccent: "lekcí",
};

/** Layout tokens for the vertical timeline axis — even px values only */
export const scheduleLayout = {
  axisColumn: "16px",
  axisWidth: "1px",
  dotSize: "10px",
  rowHeight: "26px",
  timeColumn: "68px",
  axisToTimeGap: "14px",
  timeToActivityGap: "32px",
} as const;

export const formatScheduleActivities = (activities: string[]) =>
  activities.join(", ").toUpperCase();

const SCHEDULE_ACCENT_SOFT_VARS: Record<
  ScheduleLocation["accentSoft"],
  string
> = {
  "blush-soft": "var(--color-blush-soft)",
  "lilac-soft": "var(--color-lilac-soft)",
  "sky-soft": "var(--color-sky-soft)",
};

export const scheduleAccentSoftVar = (soft: ScheduleLocation["accentSoft"]) =>
  SCHEDULE_ACCENT_SOFT_VARS[soft];

const venueFor = (
  id: string,
  fallbackCity: string,
  fallbackAddress: string,
  fallbackMapUrl?: string,
) => {
  const location = locations.find((item) => item.id === id);
  if (!location) {
    const [street = fallbackAddress, city = fallbackCity] = fallbackAddress
      .split(",")
      .map((part) => part.trim());

    return {
      city: city || fallbackCity,
      street: street || fallbackAddress,
      address: fallbackAddress,
      mapUrl:
        fallbackMapUrl ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackAddress)}`,
    };
  }

  return {
    city: location.city,
    street: location.street,
    address: `${location.street}, ${location.city}`,
    mapUrl: location.mapUrl,
  };
};

export const scheduleLocations: ScheduleLocation[] = [
  {
    id: "zdice",
    label: "Zdice",
    accentClass: "schedule__pill-third--zdice",
    accent: "blush-deep",
    accentSoft: "blush-soft",
    venue: venueFor("zdice", "Zdice", "Husova 964, Zdice"),
    days: [
      {
        label: "Pondělí",
        slots: [
          { time: "9:00", activities: ["MINI"] },
          { time: "10:00", activities: ["MOVE"] },
          { time: "11:00", activities: ["ACTIVE"] },
          { time: "12:00", activities: ["BABY"] },
        ],
      },
      {
        label: "Úterý",
        slots: [
          { time: "15:30", activities: ["FIT"] },
          { time: "16:30", activities: ["PRO"] },
        ],
      },
    ],
  },
  {
    id: "horovice",
    label: "Hořovice",
    accentClass: "schedule__pill-third--horovice",
    accent: "lilac-deep",
    accentSoft: "lilac-soft",
    venue: venueFor("horovice", "Hořovice", "Anýžova 449/8, Hořovice"),
    days: [
      {
        label: "Středa",
        slots: [
          { time: "9:00", activities: ["MOVE"] },
          { time: "10:00", activities: ["ACTIVE"] },
          { time: "11:00", activities: ["BABY"] },
        ],
      },
    ],
  },
  {
    id: "broumy",
    label: "Broumy",
    accentClass: "schedule__pill-third--broumy",
    accent: "sky-deep",
    accentSoft: "sky-soft",
    venue: venueFor("broumy", "Broumy", "Broumy"),
    days: [
      {
        label: "Čtvrtek",
        slots: [
          { time: "13:30", activities: ["BABY", "MINI"] },
          { time: "14:30", activities: ["MOVE", "ACTIVE"] },
        ],
      },
    ],
  },
];
