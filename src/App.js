import React, { useState } from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

const App = () => {
  const [scannedData, setScannedData] = useState("");

  const onNewScanResult = async (decodedText) => {
    console.log("📸 Skener očitao:", decodedText);
    setScannedData(decodedText);

    try {
      const parsedData = parseQrData(decodedText);
      console.log("📊 Parsirani podaci:", parsedData);

      const predmet = parsedData.predmet; // Preuzimamo predmet iz QR koda
      if (!predmet) {
        console.warn("⚠️ QR kod ne sadrži predmet!");
        return;
      }

      const studentDocRef = doc(db, "class", predmet, "students", parsedData.prezime);
      const studentSnapshot = await getDoc(studentDocRef);

      if (!studentSnapshot.exists()) {
        console.warn(`⚠️ Student ${parsedData.prezime} nije pronađen u ${predmet}, kreiram novi...`);
        await setDoc(studentDocRef, {
          name: parsedData.name,
          prezime: parsedData.prezime,
          timestamps: [] // Kreiramo prazan niz za timestampove
        });
        console.log("✅ Novi student kreiran:", parsedData.prezime);
      }

      // ✅ Dodavanje timestamp-a zajedno s predmetom
      await updateDoc(studentDocRef, {
        timestamps: arrayUnion({
          predmet: predmet,
          timestamp: new Date().toISOString()
        })
      });

      console.log(`✅ Timestamp dodat za ${parsedData.prezime} u predmetu ${predmet}`);
    } catch (error) {
      console.error("⛔ Greška pri spremanju QR podataka:", error);
    }
  };

  const parseQrData = (text) => {
    const dataParts = text.split(", ");
    let parsed = {};
    dataParts.forEach((part) => {
      const [key, value] = part.split(": ");
      if (key && value) {
        parsed[key.toLowerCase()] = value;
      }
    });
    return parsed;
  };

  return (
    <div className="App">
      <h1>QR Scanner</h1>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeErrorCallback={(error) => console.error("QR Error: ", error)}
      />
      <div>
        <h3>Scanned Data:</h3>
        <p>{scannedData ? scannedData : "No data scanned yet"}</p>
      </div>
    </div>
  );
};

export default App;
