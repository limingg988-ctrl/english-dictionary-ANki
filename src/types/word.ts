import type { Timestamp } from "firebase/firestore";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface WordDoc {
  id: string;
  word: string;
  pos?: string;
  ipa?: string;
  selected_meaning?: string;
  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: Timestamp;
  lastReviewedAt?: Timestamp;
  createdAt?: Timestamp;
}
