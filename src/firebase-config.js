import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Vaša Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyCM9ESQyuSKzuDMV_vQ0vA9keoHjfEQOkU",
  authDomain: "qrcode-63444.firebaseapp.com",
  databaseURL:
    "https://qrcode-63444-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qrcode-63444",
  storageBucket: "qrcode-63444.firebasestorage.app",
  messagingSenderId: "288016518567",
  appId: "1:288016518567:web:7f019a353e7a81289c7a82",
};

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Vaša Firebase konfiguracija

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// console.log(firebaseConfig);
// // Inicijalizacija Firebase aplikacije
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };
