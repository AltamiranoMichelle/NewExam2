import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfUAiyzTjXhCrrcaSQxNdtW2-QD0SRsuQ",
  authDomain: "examen2-2f07b.firebaseapp.com",
  projectId: "examen2-2f07b",
  storageBucket: "examen2-2f07b.firebasestorage.app",
  messagingSenderId: "183163721920",
  appId: "1:183163721920:web:41209735cf15edfd50b525"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);