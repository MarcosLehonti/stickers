//import React, { useState } from "react";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import type { Sticker } from "./data/stickers";

function App() {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage selectedStickers={selectedStickers} setSelectedStickers={setSelectedStickers} />}
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
