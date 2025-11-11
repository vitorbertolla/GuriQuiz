import styles from './Tela_Cadastro_Quiz.module.css'
import { useState} from 'react'
import { useQuizzes } from '../../services/crudQuiz';
import { usePerguntas } from "../../services/crudPerguntas";


export default function Tela_CRUD_Quiz() {
    const { perguntas } = usePerguntas();
    const { adicionarQuiz } = useQuizzes()
    const [nomeQuiz, setNomeQuiz] = useState("");
    const [descricaoQuiz, setDescricaoQuiz] = useState("");
    const [dificuldadeQuiz, setDificuldadeQuiz] = useState("");
    const [materiaQuiz, setMateriaQuiz] = useState("");
    const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);

    function alternarPergunta(pergunta) {
        const jaSelecionada = perguntasSelecionadas.some(p => p.id === pergunta.id)
        if (jaSelecionada) {
        setPerguntasSelecionadas(prev => prev.filter(p => p.id !== pergunta.id))
        } else {
        setPerguntasSelecionadas(prev => [...prev, pergunta])
        }
    }

    function submit(e) {
        e.preventDefault()
        if (nomeQuiz.trim() === '' || descricaoQuiz.trim() === '' || !dificuldadeQuiz || !materiaQuiz) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        const dados = {
            nomeQuiz,
            descricaoQuiz,
            dificuldadeQuiz,
            materiaQuiz,
            perguntasSelecionadas

        }
        adicionarQuiz(nomeQuiz, descricaoQuiz, dificuldadeQuiz, materiaQuiz, perguntasSelecionadas)
        console.log("Quiz cadastrado:", dados);
        // Resetar os campos após o cadastro
        setDescricaoQuiz("");
        setDificuldadeQuiz("");
        setMateriaQuiz("");
        setNomeQuiz("");
        setPerguntasSelecionadas([]);
    

    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className={styles.telaMonarQuiz}>
                    <h2>Montar Quiz Pronto</h2>

                    <div className={styles.infoQuiz}>
                        <label>Nome do Quiz:</label>
                        <input value={nomeQuiz} onChange={(e) => setNomeQuiz(e.target.value)} type="text"  placeholder="Ex: Quiz de Programação"/>

                        <label>Descrição:</label>
                        <input value={descricaoQuiz} onChange={(e) => setDescricaoQuiz(e.target.value)} placeholder="Descrição curta do quiz..."></input>
                        
                        <select value={dificuldadeQuiz} onChange={(e) => setDificuldadeQuiz(e.target.value)} name="" id="">
                            <option value="">Selecione a dificuldade</option>
                            <option value="facil">Fácil</option>
                            <option value="medio">Médio</option>
                            <option value="dificil">Difícil</option>
                        </select>

                        <select name="" value={materiaQuiz} onChange={(e) => setMateriaQuiz(e.target.value)} id="">
                            <option value="">Selecione a Matéria</option>
                            <option value="portugues">Português</option>
                            <option value="matematica">Matemática</option>
                            <option value="fisica">Física</option>
                            <option value="conhecimentosGerais">Conhecimentos Gerais</option>
                        </select>
                    </div>

                    <div className={styles.perguntasDisponiveis}>
                        <h3>Perguntas Disponíveis</h3>
                        {perguntas.map((p) => (
                        <div
                            key={p.id}
                            className={`${styles.perguntaItem} ${
                            perguntasSelecionadas.some(sel => sel.id === p.id)
                                ? styles.selecionada
                                : ''
                            }`}
                            onClick={() => alternarPergunta(p)}
                        >
                            <p>{p.descricao}</p>
                            <small>{p.materia} — {p.dificuldade}</small>
                        </div>
                        ))}
                    </div>

                    <div className={styles.quizMontado}>
                        <h3>Perguntas Selecionadas</h3>
                        <ul>
                        {perguntasSelecionadas.map(p => (
                            <li key={p.id}>{p.descricao}</li>
                        ))}
                        </ul>
                    </div>

                    <button type='submit' >Cadastrar Quiz</button>
                </div>
            </form>
        </div>
    )
}