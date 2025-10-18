//==========================================================================
//=========================================

import React, { useState, useRef } from "react";
import type { SelectedSticker } from "../data/stickers";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2"; // 👈 importamos SweetAlert2

type Props = {
  selectedStickers: SelectedSticker[];
};

const CheckoutPage: React.FC<Props> = ({ selectedStickers }) => {
  const [stickers, setStickers] = useState<SelectedSticker[]>(
    selectedStickers.map((s) => ({ ...s, quantity: 1 }))
  );

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const pdfRef = useRef<HTMLDivElement>(null);

  const total = stickers.reduce((acc, s) => acc + s.quantity, 0);

  // cambiar cantidad
  const handleQuantityChange = (code: string, value: number) => {
    setStickers((prev) =>
      prev.map((s) =>
        s.code === code ? { ...s, quantity: value < 1 ? 1 : value } : s
      )
    );
  };

  // 📄 Descargar PDF sin cortar contenido
const handleDownloadPDF = async () => {
  if (!pdfRef.current) return;

  const element = pdfRef.current;

  const opt = {
    margin: 10,
    filename: "compra_stickers.pdf",
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 1.5, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  // 🔹 Esperar que se genere y descargue el PDF
  await html2pdf().from(element).set(opt).save();

  // 🔹 Después de la descarga, mostrar alerta
  Swal.fire({
    title: "✅ PDF con tus Stickers Generado",
    text: "Ahora puedes enviar el PDF al siguiente WhatsApp para finalizar con la compra.",
    icon: "info",
    confirmButtonText: "📲 Enviar por WhatsApp",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // 🔸 AQUÍ defines el número de WhatsApp de tu negocio
      const numeroLimpio = "59177678372"; // 👈 tu número sin el "+"
      const mensaje = encodeURIComponent(
        `Hola 👋, soy ${nombre}. Acabo de realizar mi compra de stickers y descargué el comprobante en PDF.`
      );

      const whatsappURL = `https://wa.me/${numeroLimpio}?text=${mensaje}`;
      window.open(whatsappURL, "_blank");
    }
  });
};



  // ✅ Validar campos antes de finalizar
  const validateForm = (): boolean => {
    if (!nombre.trim()) {
      Swal.fire("⚠️ Campo vacío", "Por favor ingresa tu nombre.", "warning");
      return false;
    }

    if (!/^\d+$/.test(telefono)) {
      Swal.fire(
        "⚠️ Teléfono inválido",
        "El teléfono solo debe contener números.",
        "warning"
      );
      return false;
    }

    if (telefono.length < 8) {
      Swal.fire(
        "⚠️ Teléfono demasiado corto",
        "El teléfono debe tener al menos 8 dígitos.",
        "warning"
      );
      return false;
    }

    return true;
  };

  // ✅ Finalizar compra con validación
  const handleFinishPurchase = () => {
    if (!validateForm()) return;

    Swal.fire({
      title: "🎉 ¡Ya casi esta!",
      text: "Para Terminar con tu compra Descarga tu Comprobante en PFD y sigue los siguientes pasos",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "📥 Descargar comprobante",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDownloadPDF();
      }
    });
  };

  // 🔹 Dividir stickers en páginas de 6
  const stickersPorPagina = 6;
  const paginas = [];
  for (let i = 0; i < stickers.length; i += stickersPorPagina) {
    paginas.push(stickers.slice(i, i + stickersPorPagina));
  }

  return (
    <div className="container-fluid py-5">
      {/* 👇 Estilos para evitar cortes en PDF */}
      <style>
        {`
          .card {
            page-break-inside: avoid;
            break-inside: avoid;
            -webkit-column-break-inside: avoid;
            -moz-column-break-inside: avoid;
            margin-bottom: 20px;
          }

          .pdf-page {
            page-break-after: always;
            break-after: page;
          }

          .pdf-page:last-child {
            page-break-after: auto;
          }
        `}
      </style>

      <div ref={pdfRef} style={{ padding: "20px" }}>
        <h2 className="text-center mb-4">Stickers Seleccionados</h2>

        {/* 🔹 Mostrar stickers paginados de 6 en 6 */}
        {paginas.map((pagina, pageIndex) => (
          <div key={pageIndex} className="pdf-page">
            <div className="row">
              {pagina.map((sticker) => (
                <div
                  className="col-md-4 col-sm-6 mb-4 d-flex align-items-stretch"
                  key={sticker.code}
                >
                  <div className="card h-100 shadow w-100">
                    <img
                      src={`/img/${sticker.img}`}
                      className="card-img-top"
                      alt={sticker.desc}
                    />
                    <div className="card-body text-center">
                      <p>
                        <b>Código:</b> {sticker.code}
                      </p>
                      <p>{sticker.desc}</p>

                      {/* Input cantidad */}
                      <input
                        type="number"
                        min="1"
                        value={sticker.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            sticker.code,
                            parseInt(e.target.value)
                          )
                        }
                        className="form-control w-50 mx-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h4 style={{ marginTop: "20px" }}>Total a pagar: {total} Bs</h4>

        <div className="mt-3">
          <label>Nombre para el envío:</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label>Telefono:</label>
          <input
            type="text"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength={15} // 👈 opcional
          />
        </div>

        {/* 👇 Fecha de compra al final del PDF */}
        <p style={{ marginTop: "40px", fontSize: "12px", textAlign: "right" }}>
          Fecha de compra:{" "}
          {new Date().toLocaleString("es-BO", {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
      </div>

      <div className="text-center mt-4">
        {/* Finalizar compra con alerta */}
        <button className="btn btn-success me-2" onClick={handleFinishPurchase}>
          Finalizar Compra
        </button>

        {/* Descargar directo PDF */}
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Descargar en PDF
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
