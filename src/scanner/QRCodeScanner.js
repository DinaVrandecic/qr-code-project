import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = () => {
  const [data, setData] = useState("");
  const scannerRef = useRef("qr-reader");
  // reference for the scanner container

  useEffect(() => {
    // Provjeri da je scannerRef referenca na pravi DOM element
    if (scannerRef.current) {
      const scanner = new Html5QrcodeScanner(scannerRef.current, {
        fps: 10, // Frames per second
        qrbox: 250, // Velicina okvira za skeniranje
      });

      // Pokreni skener
      scanner.render(onScanSuccess, onScanError);

      // Cleanup funkcija koja zaustavlja skener pri unmountu
      return () => {
        scanner
          .clear()
          .then(() => console.log("Scanner stopped."))
          .catch((err) => console.error("Error stopping scanner:", err));
      };
    }
  }, []); // Prazni array osigurava da se useEffect pokreće samo jednom kad je komponenta mountana

  // Funkcija koja se poziva pri uspješnom skeniranju
  function onScanSuccess(decodedText, decodedResult) {
    setData(decodedText); // Postavlja pročitane podatke u stanje
  }

  // Funkcija koja se poziva ako dođe do greške pri skeniranju
  function onScanError(error) {
    console.error(error);
  }

  return (
    <div>
      <h1>QR Scanner</h1>
      <div ref={scannerRef} style={{ width: "100%", height: "100%" }}></div>
      <div>
        <h3>Pročitani podaci:</h3>
        <p>{data ? data : "Nema podataka"}</p>
      </div>
    </div>
  );
};

export default QRCodeScanner;
