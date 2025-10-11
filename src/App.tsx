import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import type { SelectedSticker } from "./data/stickers"; // 👈 importar el nuevo tipo

function App() {
  // 👇 ahora el estado guarda SelectedSticker[]
  const [selectedStickers, setSelectedStickers] = useState<SelectedSticker[]>([]);

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
