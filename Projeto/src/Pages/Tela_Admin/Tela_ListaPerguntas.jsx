// Importa o hook useState do React
import { useState } from "react";

// Importa o componente que serve para cadastrar/editar perguntas
import Tela_Cadastro_Pergunta from "../Tela_Cadastro_Pergunta/Tela_Cadastro_Pergunta";

// Importa os estilos principais do card
import styles from "./Lista.module.css";

// Importa estilos exclusivos do modal
import stylesModal from "./TelaModal.module.css";


// Componente que representa cada pergunta listada
// Recebe por props:
//  - pergunta: objeto completo da pergunta
//  - removerPergunta: função para deletar
//  - editarPergunta: função para editar
const ListaPerguntas = ({ pergunta, removerPergunta, editarPergunta }) => {

  // Controla se a janela/modal de edição está aberta ou fechada
  const [editarPerguntaAtiva, setEditarPerguntaAtiva] = useState(false);

  return (
    <div className={styles.card}>

      {/* Informações básicas da pergunta */}
      <p><strong>Pergunta:</strong> {pergunta.descricao}</p>
      <p><strong>Dificuldade:</strong> {pergunta.dificuldade}</p>
      <p><strong>Matéria:</strong> {pergunta.materia}</p>
      
      {/* Lista de alternativas */}
      <p><strong>Alternativas:</strong></p>
      <ul className={styles.perguntas}>
        {pergunta.alternativas?.map((alt, i) => (
          <li key={i}>{alt.letra}: {alt.texto}</li>
        ))}
      </ul>

      {/* Resposta correta */}
      <p><strong>Resposta Correta:</strong> {pergunta.correta}</p>

      {/* Botões de ação (deletar e editar) */}
      <div className={styles.buttons}>

        {/* Botão de excluir */}
        <button
          className={`${styles.btn} ${styles.btnDelete}`}
          onClick={() => removerPergunta(pergunta.id)}
        >
          🗑️
        </button>

        {/* Botão que abre/fecha o modal de edição */}
        <button
          className={styles.btn}
          onClick={() => setEditarPerguntaAtiva(prev => !prev)}
        >
          ✏️
        </button>

      </div>

      {/* Modal de edição — aparece somente se editarPerguntaAtiva for TRUE */}
      {editarPerguntaAtiva && (
        <div className={stylesModal.backdrop}>
          <div className={stylesModal.modal}>

            {/* Componente que exibe o formulário de edição */}
            <Tela_Cadastro_Pergunta
              perguntaInicial={pergunta}         // Dados atuais da pergunta
              onClose={() => setEditarPerguntaAtiva(false)} // Fecha o modal
              editar={true}                      // Diz que o modo é "editar"
              editarPergunta={editarPergunta}    // Função de edição vinda do hook
            />

          </div>
        </div>
      )}

    </div>
  );
};

// Exporta o componente para ser usado em outras telas
export default ListaPerguntas;
