const ListaPerguntas = ({perguntas, removePergunta, editarPergunta}) => {
    return(
        <div>
            <div>
              <p>Pergunta: {perguntas.descricao}</p>
              <p>Dificuldade: {perguntas.dificuldade}</p>
              <p>Matéria: {perguntas.id}</p>
              <p>Alternativas: {perguntas.alternativas}</p>
            </div>
            <div>        
              <button onClick={() => removePergunta(perguntas.id)} className="apagar">X</button>
              <button onClick={() => editarPergunta(perguntas.id)} className="editar">Editar</button>
            </div>
        </div>
    )
  }
  export default ListaPerguntas 