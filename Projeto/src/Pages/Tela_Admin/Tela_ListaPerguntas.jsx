import { useState } from "react";
import Tela_Cadastro_Pergunta from "../Tela_Cadastro_Pergunta/Tela_Cadastro_Pergunta";
import styles from "./Lista.module.css";
import stylesModal from "./TelaModal.module.css";

const ListaPerguntas = ({ pergunta, removerPergunta, editarPergunta }) => {
  const [editarPerguntaAtiva, setEditarPerguntaAtiva] = useState(false);

  return (
    <div className={styles.card}>
      <p><strong>Pergunta:</strong> {pergunta.descricao}</p>
      <p><strong>Dificuldade:</strong> {pergunta.dificuldade}</p>
      <p><strong>Matéria:</strong> {pergunta.materia}</p>
      
      <p><strong>Alternativas:</strong></p>
      <ul className={styles.perguntas}>
        {pergunta.alternativas?.map((alt, i) => (
          <li key={i}>{alt.letra}: {alt.texto}</li>
        ))}
      </ul>

      <p><strong>Resposta Correta:</strong> {pergunta.correta}</p>

      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => removerPergunta(pergunta.id)}>🗑️</button>
        <button className={styles.btn} onClick={() => setEditarPerguntaAtiva(prev => !prev)}>✏️</button>
      </div>

    {editarPerguntaAtiva && (
      <div className={stylesModal.backdrop}>
        <div className={stylesModal.modal}>
          <Tela_Cadastro_Pergunta
            perguntaInicial={pergunta}
            onClose={() => setEditarPerguntaAtiva(false)}
            editar={true}
            editarPergunta={editarPergunta}
          />
        </div>
      </div>
    )}
    </div>
  );
};

export default ListaPerguntas;
