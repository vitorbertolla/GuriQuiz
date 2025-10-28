import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const adicionarPergunta = async (pergunta, dificuldade, materia) => {
  try {
    await addDoc(collection(db, "perguntas"), {
      pergunta: pergunta,
      materia: materia,
      dificuldade: dificuldade
    });
    console.log("Pergunta adicionado com sucesso!");
  } catch (erro) {
    console.error("Erro ao adicionar:", erro);
  }
}