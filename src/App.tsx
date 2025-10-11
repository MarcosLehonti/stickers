import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import type { SelectedSticker } from "./data/stickers";

function App() {
  const [selectedStickers, setSelectedStickers] = useState<SelectedSticker[]>(() => {
    // 👇 Leer desde localStorage al iniciar
    const saved = localStorage.getItem("stickersSeleccionados");
    return saved ? JSON.parse(saved) : [];
  });

  // 👇 Guardar automáticamente cada vez que cambie el estado
  useEffect(() => {
    localStorage.setItem("stickersSeleccionados", JSON.stringify(selectedStickers));
  }, [selectedStickers]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              selectedStickers={selectedStickers}
              setSelectedStickers={setSelectedStickers}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage selectedStickers={selectedStickers} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
