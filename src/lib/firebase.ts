import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo9kqY6QdQL7MM_hF9CPkqxSKvLJJfBmw",
  authDomain: "faith-biao.firebaseapp.com",
  projectId: "faith-biao",
  storageBucket: "faith-biao.firebasestorage.app",
  messagingSenderId: "671472456115",
  appId: "1:671472456115:web:675678503d277c30327bc6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
