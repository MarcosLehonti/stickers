// import React, { useState, useRef } from "react";
// import type { Sticker } from "../data/stickers";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// type Props = {
//   selectedStickers: Sticker[];
// };

// const CheckoutPage: React.FC<Props> = ({ selectedStickers }) => {
//   const [nombre, setNombre] = useState("");
//   const total = selectedStickers.length * 1; // 1 Bs por sticker

//   // Referencia al contenido que exportaremos
//   const pdfRef = useRef<HTMLDivElement>(null);

//   const handleDownloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const element = pdfRef.current;
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     // Márgenes para que no quede pegado a la derecha
//     const margin = 10;
//     const imgWidth = pageWidth - margin * 2;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 10;

//     if (imgHeight < pageHeight) {
//       pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
//     } else {
//       let y = position;
//       while (y < imgHeight) {
//         pdf.addImage(imgData, "PNG", margin, y * -1 + position, imgWidth, imgHeight);
//         y += pageHeight;
//         if (y < imgHeight) pdf.addPage();
//       }
//     }

//     // --- Agregar fecha al final del PDF ---
//     const fecha = new Date().toLocaleString("es-BO", {
//       dateStyle: "full",
//       timeStyle: "short",
//     });
//     pdf.setFontSize(10);
//     pdf.text(`Fecha de compra: ${fecha}`, margin, pageHeight - 10);

//     pdf.save("compra_stickers.pdf");
//   };

//   return (
//     <div className="container-fluid py-5">
//       <div ref={pdfRef} style={{ padding: "20px" }}>
//         <h2 className="text-center mb-4">Stickers Seleccionados</h2>

//         <div className="row">
//           {selectedStickers.map((sticker) => (
//             <div className="col-md-4 col-sm-6 mb-4" key={sticker.code}>
//               <div className="card h-100 shadow">
//                 <img
//                   src={`/img/${sticker.img}`}
//                   className="card-img-top"
//                   alt={sticker.desc}
//                 />
//                 <div className="card-body text-center">
//                   <p><b>Código:</b> {sticker.code}</p>
//                   <p>{sticker.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h4 style={{ marginTop: "20px" }}>Total a pagar: {total} Bs</h4>

//         <div className="mt-3">
//           <label>Nombre para el envío:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="text-center mt-4">
//         <button className="btn btn-success me-2">Finalizar Compra</button>
//         <button className="btn btn-primary" onClick={handleDownloadPDF}>
//           Descargar en PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

//================================================================================
//================================================================================
//================================================================================

// import React, { useState, useRef } from "react";
// import type { Sticker } from "../data/stickers";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// type Props = {
//   selectedStickers: Sticker[];
// };

// const CheckoutPage: React.FC<Props> = ({ selectedStickers }) => {
//   const [nombre, setNombre] = useState("");
//   const total = selectedStickers.length * 1; // 1 Bs por sticker

//   // Referencia al contenido que exportaremos
//   const pdfRef = useRef<HTMLDivElement>(null);

//   const handleDownloadPDF = async () => {
//     if (!pdfRef.current) return;

//     const element = pdfRef.current;

//     // 📉 Reducir resolución del canvas
//     const canvas = await html2canvas(element, { scale: 1 });
//     // 📉 Exportar como JPEG con compresión 50%
//     const imgData = canvas.toDataURL("image/jpeg", 0.5);

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     // Márgenes para que no quede pegado a la derecha
//     const margin = 10;
//     const imgWidth = pageWidth - margin * 2;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 10;

//     if (imgHeight < pageHeight) {
//       pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
//     } else {
//       let y = position;
//       while (y < imgHeight) {
//         pdf.addImage(imgData, "JPEG", margin, y * -1 + position, imgWidth, imgHeight);
//         y += pageHeight;
//         if (y < imgHeight) pdf.addPage();
//       }
//     }

//     // --- Agregar fecha al final del PDF ---
//     const fecha = new Date().toLocaleString("es-BO", {
//       dateStyle: "full",
//       timeStyle: "short",
//     });
//     pdf.setFontSize(10);
//     pdf.text(`Fecha de compra: ${fecha}`, margin, pageHeight - 10);

//     pdf.save("compra_stickers.pdf");
//   };

//   return (
//     <div className="container-fluid py-5">
//       <div ref={pdfRef} style={{ padding: "20px" }}>
//         <h2 className="text-center mb-4">Stickers Seleccionados</h2>

//         <div className="row">
//           {selectedStickers.map((sticker) => (
//             <div className="col-md-4 col-sm-6 mb-4" key={sticker.code}>
//               <div className="card h-100 shadow">
//                 <img
//                   src={`/img/${sticker.img}`}
//                   className="card-img-top"
//                   alt={sticker.desc}
//                 />
//                 <div className="card-body text-center">
//                   <p>
//                     <b>Código:</b> {sticker.code}
//                   </p>
//                   <p>{sticker.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h4 style={{ marginTop: "20px" }}>Total a pagar: {total} Bs</h4>

//         <div className="mt-3">
//           <label>Nombre para el envío:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="text-center mt-4">
//         <button className="btn btn-success me-2">Finalizar Compra</button>
//         <button className="btn btn-primary" onClick={handleDownloadPDF}>
//           Descargar en PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

//==========================================================================
//==========================================================================
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
  const handleDownloadPDF = () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    const opt = {
      margin: 10,
      filename: "compra_stickers.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
    };

    html2pdf().from(element).set(opt).save();
  };

  // ✅ Validar campos antes de finalizar
  const validateForm = (): boolean => {
    if (!nombre.trim()) {
      Swal.fire("⚠️ Campo vacío", "Por favor ingresa tu nombre.", "warning");
      return false;
    }

    if (!/^\d+$/.test(telefono)) {
      Swal.fire("⚠️ Teléfono inválido", "El teléfono solo debe contener números.", "warning");
      return false;
    }

    if (telefono.length < 8) {
      Swal.fire("⚠️ Teléfono demasiado corto", "El teléfono debe tener al menos 8 dígitos.", "warning");
      return false;
    }

    return true;
  };

  // ✅ Finalizar compra con validación
  const handleFinishPurchase = () => {
    if (!validateForm()) return;

    Swal.fire({
      title: "🎉 ¡Compra exitosa!",
      text: "Tu compra se ha realizado con éxito. ¿Quieres descargar tu comprobante?",
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

  return (
    <div className="container-fluid py-5">
      <div ref={pdfRef} style={{ padding: "20px" }}>
        <h2 className="text-center mb-4">Stickers Seleccionados</h2>

        <div className="row">
          {stickers.map((sticker) => (
            <div className="col-md-4 col-sm-6 mb-4" key={sticker.code}>
              <div className="card h-100 shadow">
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
            maxLength={15} // 👈 opcional, para no poner más de 15 dígitos
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
