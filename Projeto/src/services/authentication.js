import { auth, db } from "./firebaseConfig";
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore";

// Criar provider do Google
const googleProvider = new GoogleAuthProvider();

// Função para obter a referência do documento do usuário
export const getUserDocRef = (uid) => {
  return doc(db, "usuarios", uid);
};

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
    const userDocRef = getUserDocRef(uid);

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
};

// Login com email/senha
export const loginComEmail = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
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

