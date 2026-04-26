import { useMemo, useState } from "react";
import { useQuizQueue } from "../hooks/useQuizQueue";

function statusLabel(interval: number): "Perfect" | "So-so" | "Not Yet" {
  if (interval >= 14) return "Perfect";
  if (interval >= 3) return "So-so";
  return "Not Yet";
}

export function LibraryPage() {
  const [q, setQ] = useState("");
  const { words, loading, error } = useQuizQueue(200);

  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    return words.filter((w) => {
      const body = `${w.word} ${w.selected_meaning ?? ""}`.toLowerCase();
      return body.includes(lower);
    });
  }, [q, words]);

  if (loading) return <p>Loading library...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section style={{ color: "white", maxWidth: 980, margin: "0 auto" }}>
      <h2>Vocabulary Library</h2>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search words, definitions..."
        style={{ width: "100%", maxWidth: 360, marginBottom: 16, padding: 8 }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {filtered.map((w) => (
          <article key={w.id} style={{ border: "1px solid #333", borderRadius: 12, padding: 12, background: "#111827" }}>
            <h3 style={{ margin: 0 }}>{w.word}</h3>
            <p style={{ marginTop: 4, opacity: 0.9 }}>{w.selected_meaning ?? "No definition selected"}</p>
            <small>Status: {statusLabel(w.interval)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
