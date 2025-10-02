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

import React, { useState, useRef } from "react";
import type { Sticker } from "../data/stickers";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  selectedStickers: Sticker[];
};

const CheckoutPage: React.FC<Props> = ({ selectedStickers }) => {
  const [nombre, setNombre] = useState("");
  const total = selectedStickers.length * 1; // 1 Bs por sticker

  // Referencia al contenido que exportaremos
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    // 📉 Reducir resolución del canvas
    const canvas = await html2canvas(element, { scale: 1 });
    // 📉 Exportar como JPEG con compresión 50%
    const imgData = canvas.toDataURL("image/jpeg", 0.5);

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Márgenes para que no quede pegado a la derecha
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 10;

    if (imgHeight < pageHeight) {
      pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
    } else {
      let y = position;
      while (y < imgHeight) {
        pdf.addImage(imgData, "JPEG", margin, y * -1 + position, imgWidth, imgHeight);
        y += pageHeight;
        if (y < imgHeight) pdf.addPage();
      }
    }

    // --- Agregar fecha al final del PDF ---
    const fecha = new Date().toLocaleString("es-BO", {
      dateStyle: "full",
      timeStyle: "short",
    });
    pdf.setFontSize(10);
    pdf.text(`Fecha de compra: ${fecha}`, margin, pageHeight - 10);

    pdf.save("compra_stickers.pdf");
  };

  return (
    <div className="container-fluid py-5">
      <div ref={pdfRef} style={{ padding: "20px" }}>
        <h2 className="text-center mb-4">Stickers Seleccionados</h2>

        <div className="row">
          {selectedStickers.map((sticker) => (
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
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success me-2">Finalizar Compra</button>
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Descargar en PDF
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
