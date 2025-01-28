// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     // appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     apiKey: "AIzaSyCi5Q0uhm_ff2xB_H0W919I_fenzZOE8xo",
//   authDomain: "marketplace-7622b.firebaseapp.com",
//   projectId: "marketplace-7622b",
//   storageBucket: "marketplace-7622b.firebasestorage.app",
//   messagingSenderId: "141505623315",
//   appId: "1:141505623315:web:53be75b1d5ca87b76f16e6"
// };

// // אתחול Firebase
// const app = initializeApp(firebaseConfig);

// // קבלת הפניות לשירותי Firestore ו-Auth
// const db = getFirestore(app);
// const auth = getAuth(app);

// export { db, auth };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error: ", error.message);
}

// Firestore and Auth services
const db = getFirestore(app);
// const auth = getAuth(app);

export { db };



