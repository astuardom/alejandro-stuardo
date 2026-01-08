import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbtFGhrRYKREkEuV1wWgc1VTFrsstllV4",
  authDomain: "fir-9b640.firebaseapp.com",
  projectId: "fir-9b640",
  storageBucket: "fir-9b640.firebasestorage.app",
  messagingSenderId: "633324162007",
  appId: "1:633324162007:web:6379ed58043d180c8b1992",
};

// Asegurar una sola instancia de la App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Servicios
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, db, googleProvider };