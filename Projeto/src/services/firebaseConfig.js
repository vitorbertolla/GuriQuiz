// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyWG93w0QyuiMa5Uew5J5p0TS6Gdqj8-I",
  authDomain: "guriquiz.firebaseapp.com",
  projectId: "guriquiz",
  storageBucket: "guriquiz.firebasestorage.app",
  messagingSenderId: "82218144105",
  appId: "1:82218144105:web:7e1d256734224f0bba6df8"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação
export const auth = getAuth(app);

// Provedor do Google
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

