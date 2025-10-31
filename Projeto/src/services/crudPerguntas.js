import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const adicionarPergunta = async (pergunta, dificuldade, materia, alternativas, correta) => {
  try {
    await addDoc(collection(db, "perguntas"), {
      pergunta: pergunta,
      materia: materia,
      dificuldade: dificuldade,
      alternativas: alternativas,
      correta: correta
    });
    console.log("Pergunta adicionado com sucesso!");
  } catch (erro) {
    console.error("Erro ao adicionar:", erro);
  }
}