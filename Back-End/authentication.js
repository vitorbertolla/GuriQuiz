import { auth, googleProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

// Login com Google
export const loginComGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Erro ao logar com Google:", error);
  }
};

// Cadastro com email/senha
export const registrarComEmail = async (email, senha) => {
  try {
    await createUserWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    console.error("Erro ao registrar:", error);
  }
};

// Login com email/senha
export const loginComEmail = async (email, senha) => {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    console.error("Erro ao logar:", error);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error);
  }
};
