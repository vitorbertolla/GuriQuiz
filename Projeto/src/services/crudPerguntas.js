import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore"; 
export function usePerguntas() {
  const [perguntas, setPerguntas] = useState([]);

  const carregarPerguntas = async () => {
    const querySnapshot = await getDocs(collection(db, "perguntas"));
    const lista = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setPerguntas(lista);
  };

  useEffect(() => {
    carregarPerguntas();
  }, []);

  const adicionarPergunta = async (descricao, dificuldade, materia, alternativas, correta) => {
    await addDoc(collection(db, "perguntas"), {
      descricao,
      dificuldade,
      materia,
      alternativas,
      correta,
    });
    carregarPerguntas();
  };

  const editarPergunta = async (id, novosDados) => {
    const ref = doc(db, "perguntas", id);
    await updateDoc(ref, novosDados);
    carregarPerguntas();
  };

  const removerPergunta = async (id) => {
    const ref = doc(db, "perguntas", id);
    await deleteDoc(ref);
    carregarPerguntas();
  };

  return { perguntas, adicionarPergunta, editarPergunta, removerPergunta };
}
