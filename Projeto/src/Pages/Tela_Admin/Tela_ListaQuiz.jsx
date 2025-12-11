// Importa o useState para controlar estados internos
import { useState } from "react";

// Importa o componente para cadastrar/editar quizzes
import Tela_Cadastro_Quiz from "../Tela_Cadastro_Quiz/Tela_Cadastro_Quiz";

// Importa estilos do card do quiz
import styles from "./Lista.module.css";

// Importa estilos usados no modal
import stylesModal from "./TelaModal.module.css";

// Hook do React Router para navegar entre rotas
import { useNavigate } from "react-router-dom";


// Componente que exibe cada quiz individualmente na lista
// Recebe como props:
//   quiz → dados do quiz
//   removerQuiz → função para excluir
//   editarQuiz → função para editar
//   adm → booleano (se true, mostra botões de adm; se false, mostra botão "Jogar")
const ListaQuiz = ({ quiz, removerQuiz, editarQuiz, adm}) => {

  // Controla se as perguntas do quiz devem aparecer ou não
  const [verPerguntas, setVerPerguntas] = useState(false);

  // Controla se o modal de edição do quiz está aberto ou fechado
  const [editarQuizAtiva, setEditarQuizAtiva] = useState(false);

  // Permite redirecionar o usuário via código
  const navigate = useNavigate();

  return (
    <div className= {styles.listaQuizContainer}>
      <div className={styles.card}>

        {/* Informações básicas do quiz */}
        <p><strong>Quiz:</strong> {quiz.nome}</p>
        <p><strong>Descrição:</strong> {quiz.descricao}</p>
        <p><strong>Dificuldade:</strong> {quiz.dificuldade}</p>
        <p><strong>Matéria:</strong> {quiz.materia}</p>

        {/* Botão para exibir/ocultar perguntas */}
        <button
          className={styles.btn}
          onClick={() => setVerPerguntas(prev => !prev)}
        >
          {verPerguntas ? "Ocultar perguntas" : "Ver perguntas"}
        </button>

        {/* Se verPerguntas for TRUE, mostra a lista de perguntas */}
        {verPerguntas && (
          <ul className={styles.perguntas}>
            {quiz.perguntas?.map((pergunta, i) => (
              <li key={i}>{pergunta.descricao}</li>
            ))}
          </ul>
        )}

        {/* Caso esteja no modo ADMIN, mostra botões de editar e deletar */}
        {adm && (
          <div className={styles.buttons}>

            {/* Botão deletar quiz */}
            <button
              className={`${styles.btn} ${styles.btnDelete}`}
              onClick={() => removerQuiz(quiz.id)}
            >
              🗑️
            </button>

            {/* Botão abrir modal de edição */}
            <button
              className={styles.btn}
              onClick={() => setEditarQuizAtiva(prev => !prev)}
            >
              ✏️
            </button>

          </div>
        )}

        {/* Modal de edição do quiz — aparece quando editarQuizAtiva = true */}
        {editarQuizAtiva && (
          <div className={stylesModal.backdrop}>
            <div className={stylesModal.modal}>

              {/* Componente que exibe o formulário de edição */}
              <Tela_Cadastro_Quiz
                quizInicial={quiz}          // Dados atuais do quiz
                onClose={() => setEditarQuizAtiva(false)} // Fecha modal
                editar={true}               // Define que é edição
                editarQuiz={editarQuiz}     // Função de editar passada pelo hook
              />

            </div>
          </div>
        )}

        {/* Quando NÃO for admin, mostra apenas o botão "Jogar" */}
        {!adm && (
          <button
            onClick={() => navigate(`/jogo?id=${quiz.id}`)}
            className={styles.btn}
          >
            Jogar
          </button>
        )}

      </div>
    </div>
  );
};

// Exporta o componente
export default ListaQuiz;
