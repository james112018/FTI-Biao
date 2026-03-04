import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.GEMINI_API_KEY, // Using the provided key for now, though usually it's a separate Firebase key
  authDomain: "faith-biao.firebaseapp.com",
  projectId: "faith-biao",
  storageBucket: "faith-biao.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
