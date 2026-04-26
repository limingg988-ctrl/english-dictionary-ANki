import type { CSSProperties } from "react";
import { useFastReview } from "../hooks/useFastReview";
import { useQuizQueue } from "../hooks/useQuizQueue";
import type { Rating } from "../types/word";

const buttonStyle: CSSProperties = {
  minHeight: 56,
  minWidth: 56,
  borderRadius: 12,
  border: "1px solid #444",
  background: "#1f2937",
  color: "white",
  fontSize: 18,
  cursor: "pointer"
};

export function QuizPage() {
  const { currentWord, setIndex, loading, error, isDone, reload, words, index } = useQuizQueue();
  const { submitRating } = useFastReview(() => setIndex((v) => v + 1));

  if (loading) return <p>Loading due words...</p>;
  if (error) return <p>Error: {error}</p>;

  if (isDone || !currentWord) {
    return (
      <section>
        <h2>All due words reviewed 🎉</h2>
        <button onClick={() => void reload()}>Reload queue</button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", color: "white" }}>
      <p>
        Progress: {index + 1} / {words.length}
      </p>
      <h1 style={{ fontSize: 48, marginBottom: 4 }}>{currentWord.word}</h1>
      <p style={{ opacity: 0.85, marginTop: 0 }}>{currentWord.pos ?? "Unknown"}</p>
      {currentWord.selected_meaning ? <p>{currentWord.selected_meaning}</p> : <p>No selected meaning yet.</p>}

      <p style={{ marginTop: 24, opacity: 0.7 }}>Rate your proficiency</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            style={buttonStyle}
            onClick={() => submitRating(currentWord, v as Rating)}
            aria-label={`rate-${v}`}
          >
            {v}
          </button>
        ))}
      </div>
    </section>
  );
}
