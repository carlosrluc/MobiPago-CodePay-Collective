// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcVLaFIs_Z9H3CyCaWO_LOm51pUniWKOw",
  authDomain: "mobipago-prueba.firebaseapp.com",
  projectId: "mobipago-prueba",
  storageBucket: "mobipago-prueba.firebasestorage.app",
  messagingSenderId: "124133281727",
  appId: "1:124133281727:web:2aae82436035e94d651b0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { app, db };