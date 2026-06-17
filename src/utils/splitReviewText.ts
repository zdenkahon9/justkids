export type ReviewTextPart = {
  emoji: boolean;
  value: string;
};

const emojiSegment =
  /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;

/** Rozdělí text recenze na běžný text a emoji (kvůli font-style: italic). */
export function splitReviewText(text: string): ReviewTextPart[] {
  const parts: ReviewTextPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(emojiSegment)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push({ emoji: false, value: text.slice(lastIndex, start) });
    }
    parts.push({ emoji: true, value: match[0] });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ emoji: false, value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ emoji: false, value: text }];
}
