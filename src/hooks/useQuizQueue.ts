import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { WordDoc } from "../types/word";

export function useQuizQueue(queueSize = 50) {
  const [words, setWords] = useState<WordDoc[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDueWords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, "words"),
        where("nextReviewDate", "<=", now),
        orderBy("nextReviewDate", "asc"),
        limit(queueSize)
      );

      const snap = await getDocs(q);
      const next = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<WordDoc, "id">) }));
      setWords(next);
      setIndex(0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load words");
    } finally {
      setLoading(false);
    }
  }, [queueSize]);

  useEffect(() => {
    void loadDueWords();
  }, [loadDueWords]);

  const currentWord = useMemo(() => words[index] ?? null, [words, index]);

  return {
    words,
    index,
    setIndex,
    currentWord,
    loading,
    error,
    reload: loadDueWords,
    isDone: !loading && words.length > 0 && index >= words.length
  };
}
