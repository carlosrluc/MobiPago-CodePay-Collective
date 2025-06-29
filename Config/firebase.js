import { getAuth } from "firebase/auth"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcVLaFIs_Z9H3CyCaWO_LOm51pUniWKOw",
  authDomain: "mobipago-prueba.firebaseapp.com",
  projectId: "mobipago-prueba",
  storageBucket: "mobipago-prueba.firebasestorage.app",
  messagingSenderId: "124133281727",
  appId: "1:124133281727:web:364288c0d7f2f81c651b0a",
  measurementId: "G-3B75D39GBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
