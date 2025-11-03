import {adicionarPergunta} from '../../services/crudPerguntas'
import { useState } from 'react'

// const [listaPerguntas, setListaPerguntas] = useState([])

function addPergunta(pergunta, dificuldade, materia, alternativas, correta) {
    // const novaPergunta = {
    //     pergunta,
    //     dificuldade,
    //     materia
    //   }
    // const atualizadas = [...listaPerguntas, novaPergunta]
    // setListaPerguntas(atualizadas)
// Chama a função do serviço para adicionar ao Firestore
    adicionarPergunta(pergunta, dificuldade, materia, alternativas, correta)



}
export default addPergunta