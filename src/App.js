import React, { useState } from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDoc,  // Za pojedinačne dokumente
  getDocs,
  getFirestore,
  serverTimestamp,
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
        // Reference to the student document in the correct class
        const studentDocRef = doc(db, "class", parsedData.predmet, "students", parsedData.prezime);
        
        // Check if the student already exists in the "students" collection
        const studentSnapshot = await getDoc(studentDocRef); // getDoc() za pojedinačan dokument

        if (studentSnapshot.exists()) {
          console.log("Student found, updating timestamps...");

          // Add new timestamp to the student's "timestamps" subcollection
          const timestampRef = doc(studentDocRef, "timestamps", `timestamp_${new Date().toISOString()}`);
          await setDoc(timestampRef, {
            timestamp: serverTimestamp(), // Use server timestamp for the exact time
          });

          console.log(`Timestamp successfully added to "class/${parsedData.predmet}/students/${parsedData.prezime}/timestamps"!`);
        } else {
          console.warn("Student does not exist in the database. Creating new student document...");

          // Create new student document if it doesn't exist
          await setDoc(studentDocRef, {
            name: parsedData.name,
            prezime: parsedData.prezime,
          });

          // Add the first timestamp
          const timestampRef = doc(studentDocRef, "timestamps", `timestamp_${new Date().toISOString()}`);
          await setDoc(timestampRef, {
            timestamp: serverTimestamp(),
          });

          console.log(`New student created and timestamp added to "class/${parsedData.predmet}/students/${parsedData.prezime}/timestamps"!`);
        }
      } else {
        console.warn(`Collection "${parsedData.predmet}" not found inside "class".`);
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