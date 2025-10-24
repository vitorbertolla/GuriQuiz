import { auth, googleProvider } from "./firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Login com Google
export const loginComGoogle = async () => {
  try {
    // Login via popup
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const uid = user.uid;

    // Usa o nome do Google como nick
    const nick = user.displayName;

    // Referência ao documento no Firestore
    const userDocRef = doc(db, "usuarios", uid);

    // Verifica se o documento já existe
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      // Cria o documento com nick, email e data de criação
      await setDoc(userDocRef, {
        nick: nick,
        email: user.email,
        criadoEm: new Date()
      });
      console.log("Documento criado no Firestore com o nick do Google:", nick);
    } else {
      console.log("Usuário já existe no Firestore:", userSnapshot.data());
    }

  } catch (error) {
    console.error("Erro ao logar com Google:", error);
    throw error;
  }
};
// Cadastro com email/senha
export async function registrarComEmail(email, senha, nick) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

    // Salva o nick no Firestore vinculado ao UID do usuário
    await setDoc(doc(db, "usuarios", userCredential.user.uid), {
      email,
      nick,
      criadoEm: new Date()
    });

    return userCredential;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}

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
