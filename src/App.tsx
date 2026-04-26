import { Link, Route, Routes } from "react-router-dom";
import { LibraryPage } from "./pages/LibraryPage";
import { QuizPage } from "./pages/QuizPage";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: 16 }}>
      <nav style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <Link to="/" style={{ color: "#c084fc" }}>Train</Link>
        <Link to="/library" style={{ color: "#c084fc" }}>Library</Link>
      </nav>

      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </div>
  );
}
