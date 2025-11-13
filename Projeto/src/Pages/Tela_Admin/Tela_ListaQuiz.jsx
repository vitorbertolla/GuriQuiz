import { useState } from "react";

const ListaQuiz = ({ quiz, removerQuiz }) => {
    const [verPerguntas, setVerPerguntas] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <p><strong>Quiz:</strong> {quiz.nome}</p>
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
    </div>

  );
};

export default ListaQuiz;
