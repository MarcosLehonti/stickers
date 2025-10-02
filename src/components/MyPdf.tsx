import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import type { Sticker } from "../data/stickers";

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
});

const MyPdf: React.FC<{ stickers: Sticker[]; nombre: string; total: number }> = ({ stickers, nombre, total }) => {
  const fechaCompra = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>Fecha de compra: {fechaCompra}</Text>
        <Text style={styles.text}>Nombre de envío: {nombre}</Text>
        <Text style={styles.text}>Total a pagar: {total} Bs</Text>

        {stickers.map((sticker, index) => (
          <Text key={index} style={styles.text}>
            {sticker.code} - {sticker.desc}
          </Text>
        ))}
      </Page>
    </Document>
  );
};

export default MyPdf;
