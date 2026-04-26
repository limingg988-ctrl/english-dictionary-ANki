import type { Rating } from "../types/word";

export interface Sm2Input {
  repetitions: number;
  interval: number;
  easeFactor: number;
  now?: Date;
}

export interface Sm2Result {
  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: Date;
}

const MIN_EASE_FACTOR = 1.3;

export function mapRatingToQuality(rating: Rating, useFourScale = false): number {
  if (!useFourScale) return rating;
  const map: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 2, 3: 4, 4: 5 };
  return map[Math.min(4, rating) as 1 | 2 | 3 | 4];
}

export function applySm2(input: Sm2Input, rating: Rating, useFourScale = false): Sm2Result {
  const now = input.now ?? new Date();
  const quality = mapRatingToQuality(rating, useFourScale);

  let repetitions = input.repetitions;
  let interval = input.interval;
  let easeFactor = input.easeFactor || 2.5;

  easeFactor += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.max(1, Math.round(interval * easeFactor));
  }

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return { repetitions, interval, easeFactor, nextReviewDate };
}
