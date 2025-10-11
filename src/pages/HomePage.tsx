import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";  // 👈 importamos
import type { Sticker, SelectedSticker } from "../data/stickers"; 
import { stickers } from "../data/stickers";     

type Props = {
  selectedStickers: SelectedSticker[];
  setSelectedStickers: React.Dispatch<React.SetStateAction<SelectedSticker[]>>;
};

const HomePage: React.FC<Props> = ({ selectedStickers, setSelectedStickers }) => {
  const navigate = useNavigate();

  // ✅ Cargar stickers guardados en localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("stickersSeleccionados");
    if (stored) {
      setSelectedStickers(JSON.parse(stored));
    }
  }, [setSelectedStickers]);

  // ✅ Guardar los stickers seleccionados cada vez que cambian
  useEffect(() => {
    localStorage.setItem("stickersSeleccionados", JSON.stringify(selectedStickers));
  }, [selectedStickers]);

  const handleSelect = (sticker: Sticker, e: React.MouseEvent<HTMLButtonElement>) => {
    const exists = selectedStickers.find((s) => s.code === sticker.code);

    if (exists) {
      // si ya está → lo quitamos
      setSelectedStickers(selectedStickers.filter((s) => s.code !== sticker.code));
    } else {
      // si no está → lo agregamos con cantidad = 1
      setSelectedStickers([...selectedStickers, { ...sticker, quantity: 1 }]);

      // 🎉 lanzar estrellitas SOLO al seleccionar
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { 
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight 
        },
        shapes: ["star"], // 👈 salen como estrellitas
        colors: ["#ff0", "#ff69b4", "#00f", "#0f0"],
      });
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <div className="container-fluid py-5">
        <h1 className="text-center mb-4">Catálogo de Stickers</h1>
        <div className="row">
          {stickers.map((sticker) => {
            const isSelected = selectedStickers.some((s) => s.code === sticker.code);

            return (
              <div className="col-md-4 col-sm-6 mb-4" key={sticker.code}>
                <div className="card h-100 shadow">
                  <img
                    src={`/img/${sticker.img}`}
                    className="card-img-top"
                    alt={sticker.desc}
                  />
                  <div className="card-body text-center">
                    <p className="card-text">{sticker.desc}</p>
                    <button
                      className={`btn ${isSelected ? "btn-warning" : "btn-primary"}`}
                      onClick={(e) => handleSelect(sticker, e)} // 👈 paso el evento
                    >
                      {isSelected ? "Deseleccionar" : "Seleccionar"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedStickers.length > 0 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-success"
              onClick={() => navigate("/checkout")}
            >
              Comprar Stickers Seleccionados ({selectedStickers.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
