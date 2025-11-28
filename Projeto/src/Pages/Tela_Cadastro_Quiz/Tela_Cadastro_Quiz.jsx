import styles from './Tela_Cadastro_Quiz.module.css'
import { useState} from 'react'
import { useQuizzes } from '../../services/crudQuiz';
import { usePerguntas } from "../../services/crudPerguntas";
import SelectMateria from '../Componentes/SelectMateria.jsx'
import SelectDificuldade from '../Componentes/SelectDificuldade.jsx'
import { Link } from 'react-router-dom';


export default function Tela_CRUD_Quiz({editar = false,quizInicial = null,onClose,adicionarQuiz: adicionarQuizProp,editarQuiz: editarQuizProp})  {
    const {perguntas}  = usePerguntas();
    const hooks = useQuizzes()
    const adicionarQuiz = adicionarQuizProp || hooks.adicionarQuiz;
    const editarQuiz = editarQuizProp || hooks.editarQuiz;
    const [nomeQuiz, setNomeQuiz] = useState(quizInicial?.nome || "");
    const [descricaoQuiz, setDescricaoQuiz] = useState(quizInicial?.descricao || "");
    const [dificuldadeQuiz, setDificuldadeQuiz] = useState(quizInicial?.dificuldade || "");
    const [materiaQuiz, setMateriaQuiz] = useState(quizInicial?.materia || "");
    const [perguntasSelecionadas, setPerguntasSelecionadas] = useState(quizInicial?.perguntas || []);

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
        if (nomeQuiz.trim() === '' || descricaoQuiz.trim() === '' || !dificuldadeQuiz || !materiaQuiz || perguntasSelecionadas.length === 0) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        const dados = {
        nome: nomeQuiz,
        descricao: descricaoQuiz,
        dificuldade: dificuldadeQuiz,
        materia: materiaQuiz,
        perguntas: perguntasSelecionadas
        };  
        if(editar && quizInicial){
            // Lógica para editar o quiz existente
            editarQuiz(quizInicial.id, dados)
            alert("Quiz editado");
        }else{
            adicionarQuiz(dados.nome,dados.descricao,dados.dificuldade,dados.materia,dados.perguntas);
            alert("Quiz cadastrado:", dados);
        }
       
        onClose?.()
        // Resetar os campos após o cadastro
        setDescricaoQuiz("");
        setDificuldadeQuiz("");
        setMateriaQuiz("");
        setNomeQuiz("");
        setPerguntasSelecionadas([]);
    

    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                <div className={styles.telaMonarQuiz}>
                    <Link to="/menu">
                        {!editar && (<button><img className={styles['exit-button']} src="/images/botaoExit.png" alt="" ></img></button>)}
                    </Link>
                    <h2>{editar? "editar quiz" : "cadastro de quiz"}</h2>

                    <div className={styles.infoQuiz}>
                        <div>
                            <label>Nome do Quiz:</label>
                            <input value={nomeQuiz} onChange={(e) => setNomeQuiz(e.target.value)} type="text"  placeholder="Ex: Quiz de Prog"/>
                        </div>

                        <div>
                            <label>Descrição:</label>
                            <input value={descricaoQuiz} onChange={(e) => setDescricaoQuiz(e.target.value)} placeholder="Descrição curta"/>
                        </div>

                        <div>
                            <label>Dificuldade:</label>
                            <SelectDificuldade
                                className={`${styles['tela-cadastro-pergunta__select']} ${styles['tela-cadastro-pergunta__select--dificuldade']}`}
                                dificuldade={dificuldadeQuiz}
                                setDificuldade={setDificuldadeQuiz}
                            />
                        </div>

                        <div>
                            <label>Matéria:</label>
                            <SelectMateria
                                className={`${styles['tela-cadastro-pergunta__select']} ${styles['tela-cadastro-pergunta__select--materia']}`}
                                materia={materiaQuiz}
                                setMateria={setMateriaQuiz}
                            />
                        </div>
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


                    {editar && (
                        <button onClick={onClose}>Cancelar edição</button>
                    )}
                    <button  className={styles.btnQuiz} type='submit' >{editar? "salvar alterações" : "cadastrar quiz"}</button>
                
                </div>
            </form>
        </div>
    )
}