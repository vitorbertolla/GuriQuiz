import ListaPerguntas from "./Tela_ListaPerguntas";
import { usePerguntas } from "../../services/crudPerguntas";
import { useState } from "react";
import Tela_CRUD_Quiz from "../Tela_Cadastro_Quiz/Tela_Cadastro_Quiz";

export default function Tela_Admin() {
  const { perguntas, removerPergunta, editarPergunta } = usePerguntas();
  const [crudPergunta, setCrudPergunta] = useState(false);
  const [crudQuiz, setCrudQuiz] = useState(false);

  return (
    <div>
      <h1>Tela ADMIN</h1>
      <button onClick={() => setCrudQuiz(prev => !prev)}>Crud Quiz</button>
      <button onClick={() => setCrudPergunta(prev => !prev)}>Crud pergunta</button>
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
        <Tela_CRUD_Quiz />
      )}
    </div>
  );
}