import { useState } from "react";
import Tela_Cadastro_Quiz from "../Tela_Cadastro_Quiz/Tela_Cadastro_Quiz";
import { Link } from "react-router-dom";
import styles from "./Lista.module.css";
import stylesModal from "./TelaModal.module.css";


const ListaQuiz = ({ quiz, removerQuiz, editarQuiz, adm}) => {
  const [verPerguntas, setVerPerguntas] = useState(false);
  const [editarQuizAtiva, setEditarQuizAtiva] = useState(false);

  return (
    <div className={styles.card}>
      <p><strong>Quiz:</strong> {quiz.nome}</p>
      <p><strong>Descrição:</strong> {quiz.descricao}</p>
      <p><strong>Dificuldade:</strong> {quiz.dificuldade}</p>
      <p><strong>Matéria:</strong> {quiz.materia}</p>

      <button className={styles.btn} onClick={() => setVerPerguntas(prev=>!prev)}>
        {verPerguntas ? "Ocultar perguntas" : "Ver perguntas"}
      </button>

      {verPerguntas && (
        <ul className={styles.perguntas}>
          {quiz.perguntas?.map((pergunta, i) => (
            <li key={i}>{pergunta.descricao}</li>
          ))}
        </ul>
      )}

      {adm && (
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => removerQuiz(quiz.id)}>🗑️</button>
          <button className={styles.btn} onClick={() => setEditarQuizAtiva(prev => !prev)}>✏️</button>
        </div>
      )}

      {editarQuizAtiva && (
          <div className={stylesModal.backdrop}>
            <div className={stylesModal.modal}>
              <Tela_Cadastro_Quiz
                quizInicial={quiz}
                onClose={() => setEditarQuizAtiva(false)}
                editar={true}
                editarQuiz={editarQuiz}
              />
          </div>
        </div>
            )}

      {!adm && (
        <Link to="/jogo">
          <button className={styles.btn}>
            Jogar
          </button>
        </Link>
      )}
    </div>
  );
};

export default ListaQuiz;
