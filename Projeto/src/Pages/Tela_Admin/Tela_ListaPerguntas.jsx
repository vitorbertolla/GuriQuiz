import { useState, useEffect } from "react";
import styles from './Tela_Admin.module.css';
import Tela_Cadastro_Pergunta from "../Tela_Cadastro_Pergunta/Tela_Cadastro_Pergunta";


const ListaPerguntas = ({ pergunta, removerPergunta, editarPergunta }) => {
  const [editarPerguntaAtiva, setEditarPerguntaAtiva] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <p><strong>Pergunta:</strong> {pergunta.descricao}</p>
      <p><strong>Dificuldade:</strong> {pergunta.dificuldade}</p>
      <p><strong>Matéria:</strong> {pergunta.materia}</p>
      <p><strong>Alternativas:</strong></p>
        <ul>
          {pergunta.alternativas && pergunta.alternativas.map((alt, i) => (
            <li key={i}>
              {alt.letra}: {alt.texto}
            </li>
          ))}
        </ul>
      <p><strong>Resposta Correta:</strong> {pergunta.correta}</p>
      <button onClick={() => removerPergunta(pergunta.id)}>🗑️ </button>
      <button onClick={() => setEditarPerguntaAtiva(prev => !prev)}>✏️ </button>
      {editarPerguntaAtiva && (
        <Tela_Cadastro_Pergunta
          perguntaInicial={pergunta}
          onClose={() => setEditarPerguntaAtiva(false)}
          editar={true}
        />
      )}
    </div>

  );
};

export default ListaPerguntas;
