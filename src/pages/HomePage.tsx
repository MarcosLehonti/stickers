import React from "react";
import { useNavigate } from "react-router-dom";
import type { Sticker } from "../data/stickers"; 
import { stickers } from "../data/stickers";     

type Props = {
  selectedStickers: Sticker[];
  setSelectedStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
};

const HomePage: React.FC<Props> = ({ selectedStickers, setSelectedStickers }) => {
  const navigate = useNavigate();

  const handleSelect = (sticker: Sticker) => {
    if (!selectedStickers.find((s) => s.code === sticker.code)) {
      setSelectedStickers([...selectedStickers, sticker]);
    } else {
      // Si ya está seleccionado y vuelve a hacer click → lo quitamos
      setSelectedStickers(selectedStickers.filter((s) => s.code !== sticker.code));
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
                      onClick={() => handleSelect(sticker)}
                    >
                      {isSelected ? "Seleccionado" : "Seleccionar"}
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
              Adquirir ({selectedStickers.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
