import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Function to create configuration for the scanner
const createConfig = (props) => ({
  fps: props.fps || 10,
  qrbox: props.qrbox || 250,
  aspectRatio: props.aspectRatio || undefined,
  disableFlip: props.disableFlip || false,
});

const Html5QrcodePlugin = (props) => {
  const scannerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const startScanning = async () => {
      // Request camera access each time the component mounts
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop()); // Stop all active video streams

        if (!props.qrCodeSuccessCallback) {
          throw new Error("qrCodeSuccessCallback is required.");
        }

        const config = createConfig(props);
        const html5QrcodeScanner = new Html5QrcodeScanner(
          qrcodeRegionId,
          config,
          props.verbose || false
        );

        console.log("Initializing QR scanner...");
        await html5QrcodeScanner.render(
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback
        );
        return html5QrcodeScanner;
      } catch (error) {
        console.error("Camera permission denied or unavailable: ", error);
      }
    };

    const initScanner = async () => {
      if (isMounted.current) {
        scannerRef.current = await startScanning();
      }
    };

    initScanner();

    // Cleanup function to properly stop the scanner
    return () => {
      isMounted.current = false;
      const clearScanner = async () => {
        try {
          if (scannerRef.current) await scannerRef.current.clear();
          console.log("Scanner stopped and cleaned up.");
        } catch (error) {
          console.error("Failed to clear scanner: ", error);
        }
      };
      clearScanner();
    };
  }, [props]);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
