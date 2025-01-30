import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBIrTMBeRVwEaT-K7v2V5_Lgb-DSBiF3-8",
//   authDomain: "quiz-generator-76a7c.firebaseapp.com",
//   projectId: "quiz-generator-76a7c",
//   storageBucket: "quiz-generator-76a7c.firebasestorage.app",
//   messagingSenderId: "550707939647",
//   appId: "1:550707939647:web:f174efeb76f2ba45d72b8a",
//   measurementId: "G-GW9HE4NLEG",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;
