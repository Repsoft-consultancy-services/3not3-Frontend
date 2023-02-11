// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyClZbYLU4AcwRvc39RoA0dEsV5agTuufPI",
  authDomain: "not3-336514.firebaseapp.com",
  databaseURL:
    "https://not3-336514-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "not3-336514",
  storageBucket: "not3-336514.appspot.com",
  messagingSenderId: "1090023688383",
  appId: "1:1090023688383:web:a6e2a08ccf6452614d5e0a",
  measurementId: "G-3EFJTV2BB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
