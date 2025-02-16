import React, { useState } from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const App = () => {
  const [scannedData, setScannedData] = useState(""); // Store scanned QR data

  const onNewScanResult = async (decodedText) => {
    console.log("Decoded text: ", decodedText);
    setScannedData(decodedText); // Update state with scanned data

    try {
      const parsedData = parseQrData(decodedText); // Parse scanned data

      // Get all collection names inside "class"
      const classCollections = await getCollections("class");

      // Check if the subject exists as a collection inside "class"
      if (classCollections.includes(parsedData.predmet)) {
        // Add data to the correct collection inside "class"
        console.log();
        await setDoc(
          doc(db, "class", parsedData.predmet, "students", parsedData.prezime),
          {
            name: parsedData.name,
            prezime: parsedData.prezime,
            timestamp: parsedData.timestamp,
          }
        );

        console.log(`Data saved to "class/${parsedData.predmet}/students"!`);
      } else {
        console.warn(
          `Collection "${parsedData.predmet}" not found inside "class".`
        );
      }
    } catch (error) {
      console.error("Error saving QR data:", error);
    }
  };

  // Function to parse QR code text into structured data
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

  // Function to get all collections inside "class"
  const getCollections = async (parentCollection) => {
    const dbRef = getFirestore();
    const snapshot = await getDocs(collection(dbRef, parentCollection));
    let collectionNames = [];
    snapshot.forEach((doc) => {
      collectionNames.push(doc.id);
    });
    return collectionNames;
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

      {/* Display scanned QR code data */}
      <div>
        <h3>Scanned Data:</h3>
        <p>{scannedData ? scannedData : "No data scanned yet"}</p>
      </div>
    </div>
  );
};

export default App;
