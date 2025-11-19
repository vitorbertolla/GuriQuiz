import styles from "./Tela_Admin.module.css";
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
    <div className={styles.container}>
      <h1 className={styles.titulo}>Painel Administrativo</h1>

      <div className={styles.botoesTopo}>
        <button className={styles.btnToggle} onClick={() => {
          setCrudQuiz(prev => !prev)
          setCrudPergunta(false)
        }}>
          CRUD Quiz
        </button>

        <button className={styles.btnToggle} onClick={() =>{
          setCrudQuiz(false)
          setCrudPergunta(prev => !prev)
        }}>
          CRUD Perguntas
        </button>
      </div>

      {crudPergunta && (
        <>
          <h2>Perguntas Cadastradas</h2>
          <div className={styles.cardContainer}>
            {perguntas.map((p) => (
              <ListaPerguntas
                key={p.id}
                pergunta={p}
                removerPergunta={removerPergunta}
                editarPergunta={editarPergunta}
              />
            ))}
          </div>
        </>
      )}

      {crudQuiz && (
        <>
          <h2>Quizzes Cadastrados</h2>
          <div className={styles.cardContainer}>
            {quizzes.map((q) => (
              <ListaQuiz
                key={q.id}
                quiz={q}
                adm={true}
                removerQuiz={removerQuiz}
                editarQuiz={editarQuiz}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
