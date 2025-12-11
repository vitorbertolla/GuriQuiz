// Importa o arquivo de estilos desta tela
import styles from "./Tela_Admin.module.css";

// Importa o componente que lista perguntas
import ListaPerguntas from "./Tela_ListaPerguntas";

// Importa o componente que lista quizzes
import ListaQuiz from "./Tela_ListaQuiz";  

// Importa funções de CRUD (listar, editar, remover) das perguntas
import { usePerguntas } from "../../services/crudPerguntas";

// Importa funções de CRUD dos quizzes
import { useQuizzes } from "../../services/crudQuiz";

// Hook do React para controlar estados
import { useState } from "react";

// Importa o componente de busca e a função que filtra perguntas
import {SearchP, searchPergunta} from "../Componentes/Search.jsx";

export default function Tela_Admin() {

  // Desestrutura dados e funções do hook de perguntas:
  // "perguntas" = lista de perguntas vindas do banco
  // "removerPergunta" = função para deletar
  // "editarPergunta" = função para editar
  const { perguntas, removerPergunta, editarPergunta } = usePerguntas();

  // Mesma lógica para quizzes
  const { quizzes, removerQuiz, editarQuiz } = useQuizzes();

  // Estado que controla se o CRUD de perguntas está aberto
  const [crudPergunta, setCrudPergunta] = useState(false);

  // Estado que controla se o CRUD de quizzes está aberto
  const [crudQuiz, setCrudQuiz] = useState(false);

  // Estado da barra de busca das perguntas
  const [perguntasSearch, setPerguntaSearch] = useState("")


  return (
    <div className={styles.container}>

      {/* Título principal da tela */}
      <h1 className={styles.titulo}>Painel Administrativo</h1>

      {/* Botões superiores que alternam entre CRUD Quiz e CRUD Perguntas */}
      <div className={styles.botoesTopo}>

        {/* Botão que ativa/desativa o CRUD de Quiz */}
        <button className={styles.btnToggle} onClick={() => {
          setCrudQuiz(prev => !prev)    // alterna o estado atual de CRUD de quiz
          setCrudPergunta(false)        // fecha o CRUD de perguntas
        }}>
          CRUD Quiz
        </button>

        {/* Botão que ativa/desativa o CRUD de Perguntas */}
        <button className={styles.btnToggle} onClick={() =>{
          setCrudQuiz(false)            // fecha o CRUD de quiz
          setCrudPergunta(prev => !prev) // alterna o estado do CRUD de perguntas
        }}>
          CRUD Perguntas
        </button>
      </div>

      {/* Se crudPergunta for TRUE, mostra o CRUD de perguntas */}
      {crudPergunta && (
        <>
          <h2>Perguntas Cadastradas</h2>

          {/* Componente de busca */}
          <SearchP 
            quizzesPergunta={perguntasSearch}
            setPerguntasSearch={setPerguntaSearch}
          />

          {/* Container das cartas */}
          <div className={styles.cardContainer}>

            {/* Lista filtrada de perguntas usando searchPergunta */}
            {searchPergunta(perguntasSearch, perguntas).map((p) => (
              <ListaPerguntas
                key={p.id}                 // chave única do React
                pergunta={p}               // conteúdo da pergunta
                removerPergunta={removerPergunta}
                editarPergunta={editarPergunta}
              />
            ))}
          </div>
        </>
      )}

      {/* Se crudQuiz for TRUE, mostra o CRUD de quizzes */}
      {crudQuiz && (
        <>
          <h2>Quizzes Cadastrados</h2>

          <div className={styles.cardContainer}>

            {/* Lista de quizzes vinda do banco */}
            {quizzes.map((q) => (
              <ListaQuiz
                key={q.id}           // chave única
                quiz={q}             // conteúdo do quiz
                adm={true}           // modo admin, ativa botões extras
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
