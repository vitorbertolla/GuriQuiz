import { useState } from "react";
import Tela_Cadastro_Quiz from "../Tela_Cadastro_Quiz/Tela_Cadastro_Quiz";

const ListaQuiz = ({ quiz, removerQuiz, editarQuiz}) => {
    const [verPerguntas, setVerPerguntas] = useState(false);
    const [editarQuizAtiva, setEditarQuizAtiva] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <p><strong>Quiz:</strong> {quiz.nome}</p>
        <p><strong>Descrição:</strong>{quiz.descricao}</p>
        <p><strong>Dificuldade:</strong> {quiz.dificuldade}</p>
        <p><strong>Matéria:</strong> {quiz.materia}</p>
        <button onClick={() => setVerPerguntas(prev=>!prev)}>{verPerguntas? "ocultar perguntas" : "ver perguntas"}</button>
        {verPerguntas && (
                <ul>
                    {quiz.perguntas && quiz.perguntas.map((pergunta, i) => (
                        <li key={i}>
                            {pergunta.descricao}
                        </li>
                    ))}
                </ul>)}
        <button onClick={() => removerQuiz(quiz.id)}>🗑️ </button>
        <button onClick={() => setEditarQuizAtiva(prev => !prev)}>✏️ </button>
        {editarQuizAtiva && (
        <Tela_Cadastro_Quiz
            quizInicial={quiz}
            onClose={() => setEditarQuizAtiva(false)}
            editar={true}
            editarQuiz={editarQuiz}
                
        />)}


    </div>

  );
};

export default ListaQuiz;
