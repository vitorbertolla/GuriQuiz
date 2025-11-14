import ListaPerguntas from "./Tela_ListaPerguntas";
import ListaQuiz from "./Tela_ListaQuiz";  
import { usePerguntas } from "../../services/crudPerguntas";
import { useQuizzes } from "../../services/crudQuiz";
import { useState } from "react";

export default function Tela_Admin() {
  const { perguntas, removerPergunta, editarPergunta } = usePerguntas();
  const { quizzes, removerQuiz, editarQuiz } = useQuizzes();
  const [crudPergunta, setCrudPergunta] = useState(false);
  const [crudQuiz, setCrudQuiz] = useState(false);

  return (
    <div>
      <h1>Tela ADMIN</h1>
      <button onClick={() => {
        setCrudQuiz(prev => !prev)
        setCrudPergunta(false)
      } }>Crud Quiz</button>
      <button onClick={() =>{
        setCrudQuiz(false)
        setCrudPergunta(prev => !prev)
      }}>Crud pergunta</button>

      {crudPergunta && (
        <>
          <h1>Perguntas cadastradas</h1>
          {perguntas.map((p) => (
            <ListaPerguntas
              key={p.id}
              pergunta={p}
              removerPergunta={removerPergunta}
              editarPergunta={editarPergunta}
            />
          ))}
        </>
      )}

      {crudQuiz && (
        <>
          <h1>Quizzes Cadastrados</h1>
          {quizzes.map((q) => (
            <ListaQuiz
              key={q.id}
              quiz={q}
              removerQuiz={removerQuiz}
              editarQuiz={editarQuiz}
            />
          ))}
        </>
      )}
    </div>
  );
}