import React, { useState } from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";

const App = () => {
  const [scannedData, setScannedData] = useState(""); // Store scanned QR data

  const onNewScanResult = (decodedText) => {
    console.log("Decoded text: ", decodedText);
    setScannedData(decodedText); // Update state with scanned data
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
