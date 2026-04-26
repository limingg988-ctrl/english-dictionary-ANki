import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { applySm2 } from "../lib/srs";
import type { Rating, WordDoc } from "../types/word";

export function useFastReview(onAdvance: () => void, useFourScale = false) {
  const submitRating = (word: WordDoc | null, rating: Rating) => {
    if (!word) return;

    const next = applySm2(
      {
        repetitions: word.repetitions ?? 0,
        interval: word.interval ?? 0,
        easeFactor: word.easeFactor ?? 2.5
      },
      rating,
      useFourScale
    );

    // Fast transition: move UI first, persist in background.
    onAdvance();

    void updateDoc(doc(db, "words", word.id), {
      repetitions: next.repetitions,
      interval: next.interval,
      easeFactor: next.easeFactor,
      nextReviewDate: Timestamp.fromDate(next.nextReviewDate),
      lastReviewedAt: serverTimestamp()
    }).catch((error: unknown) => {
      console.error("Failed to persist review result", error);
    });
  };

  return { submitRating };
}
