import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  // 🔄 Carrega todos os quizzes do Firestore
  const carregarQuizzes = async () => {
    const querySnapshot = await getDocs(collection(db, "quizzes"));
    const lista = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setQuizzes(lista);
  };

  useEffect(() => {
    carregarQuizzes();
  }, []);

  // ➕ Adiciona um novo quiz
  const adicionarQuiz = async (nome, descricao, dificuldade, materia, perguntasSelecionadas) => {
    await addDoc(collection(db, "quizzes"), {
      nome,
      descricao,
      dificuldade,
      materia,
      perguntas: perguntasSelecionadas, // Array de IDs ou objetos de perguntas
      criadoEm: new Date(),
    });
    carregarQuizzes();
  };

  // ✏️ Edita um quiz existente
  const editarQuiz = async (id, novosDados) => {
    const ref = doc(db, "quizzes", id);
    await updateDoc(ref, novosDados);
    carregarQuizzes();
  };

  // 🗑️ Remove um quiz
  const removerQuiz = async (id) => {
    const ref = doc(db, "quizzes", id);
    await deleteDoc(ref);
    carregarQuizzes();
  };

  return { quizzes, adicionarQuiz, editarQuiz, removerQuiz };
}
