export default function Tela_Admin() {
    const [perguntaEditando, setEditando] = useState('')
    const [perguntas, SetPerguntas] = useState([])  
    
    const addPergunta = (descricao, dificuldade, materia, alternativas) => {
    if (perguntaEditando) {
        const atualizadas = Perguntas.map((pergunta) =>
        pergunta.id === despesaEditando.id
            ? { ...pergunta, descricao, dificuldade, materia, alternativas }
            : pergunta
        )
        SetPerguntas(atualizadas)
        salvarListaNoLocalStorage(atualizadas)
        setEditando('')
    } else {
        const novaPergunta = {
        id,
        descricao,
        dificuldade,
        materia,
        alternativas
        }
        const atualizadas = [...Perguntas, novaPergunta]
        SetPerguntas(atualizadas)
        salvarListaNoLocalStorage(atualizadas)
    }
    }

    const editarPergunta = (id) => {
        const d = perguntas.find((pergunta) => pergunta.id === id)
        if (d) setEditando(d)
      }
      
      const removePergunta = (id) => {
        const atualizadas = perguntas.filter((pergunta) => pergunta.id !== id)
        SetPerguntas(atualizadas)
        salvarListaNoLocalStorage(atualizadas)
      }
    return (
        <div>
            {perguntas.map((pergunta) => (
                <ListaPerguntas
                key={pergunta.id}
                pergunta={pergunta}
                removePergunta={removePergunta}
                editarPergunta={editarPergunta}
                />
                ))}
        </div>
    )
}