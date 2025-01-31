import React from "react";
import Html5QrcodePlugin from "./scanner/Html5QrcodePlugin";

const App = () => {
  const onNewScanResult = (decodedText) => {
    console.log("Decoded text: ", decodedText);
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
    </div>
  );
};

export default App;
