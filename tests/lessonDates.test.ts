import assert from "node:assert/strict";
import test from "node:test";

import {
  findCurrentDateIndex,
  getIsoDateInTimeZone,
  lessonDays,
  lessonTopics,
  validateLessonCalendar,
} from "../src/data/lessonDates.ts";

const mondayDates = lessonDays[0].dates;

test("kalendářová data splňují všechna pravidla", () => {
  assert.doesNotThrow(() => validateLessonCalendar());
});

test("úterní a středeční lekce mají prohozený Podzim a Halloween", () => {
  for (const day of lessonDays.filter(({ id }) => id !== "monday")) {
    const sixthLesson = day.dates.find(({ lesson }) => lesson === 6);
    const seventhLesson = day.dates.find(({ lesson }) => lesson === 7);

    assert.equal(lessonTopics[sixthLesson?.topicLesson ?? 6], "Podzim");
    assert.equal(lessonTopics[seventhLesson?.topicLesson ?? 7], "Halloween");
  }
});

test("před začátkem kurzu vybere první termín", () => {
  assert.equal(findCurrentDateIndex(mondayDates, "2026-08-01"), 0);
});

test("v den lekce vybere přesný termín", () => {
  assert.equal(findCurrentDateIndex(mondayDates, "2026-09-21"), 2);
});

test("mezi lekcemi vybere nejbližší budoucí termín", () => {
  assert.equal(findCurrentDateIndex(mondayDates, "2026-09-19"), 2);
});

test("po skončení kurzu ponechá poslední termín", () => {
  assert.equal(findCurrentDateIndex(mondayDates, "2027-02-01"), mondayDates.length - 1);
});

test("pražské datum respektuje přechod přes půlnoc", () => {
  const utcSundayEvening = new Date("2026-09-20T22:30:00.000Z");
  assert.equal(getIsoDateInTimeZone(utcSundayEvening), "2026-09-21");
});

test("validace odhalí neseřazené nebo duplicitní datum", () => {
  const brokenDays = structuredClone(lessonDays);
  brokenDays[0].dates[1].iso = brokenDays[0].dates[0].iso;
  assert.throws(() => validateLessonCalendar(brokenDays), /chronologicky|vícekrát/);
});
