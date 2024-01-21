// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDLI8hNi82R1eca6jidyc_5Zs1E7hmadCs",
  authDomain: "todotest-658ac.firebaseapp.com",
  projectId: "todotest-658ac",
  storageBucket: "todotest-658ac.appspot.com",
  messagingSenderId: "673669259112",
  appId: "1:673669259112:web:ea8e54717236916c0e80dd",
  measurementId: "G-QPCFKQ67S0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);