import styles from './Tela_Cadastro_Quiz.module.css'
import { useState} from 'react'
import { useQuizzes } from '../../services/crudQuiz';
import { usePerguntas } from "../../services/crudPerguntas";
import SelectMateria from '../Componentes/SelectMateria.jsx'
import SelectDificuldade from '../Componentes/SelectDificuldade.jsx'
import { Link } from 'react-router-dom';
import {SearchP, searchPergunta} from "../Componentes/Search.jsx";

// Componente usado tanto para cadastrar quanto editar um Quiz
export default function Tela_CRUD_Quiz({
    editar = false,            // Define se a tela está no modo edição
    quizInicial = null,        // Dados iniciais do quiz ao editar
    onClose,                   // Função chamada ao fechar/cancelar
    adicionarQuiz: adicionarQuizProp,  // Caso venha uma função externa
    editarQuiz: editarQuizProp         // Caso venha uma função externa
})  {

    // Hook que fornece todas as perguntas cadastradas
    const { perguntas } = usePerguntas();

    // Hook que fornece funções de CRUD de quiz
    const hooks = useQuizzes();

    // Se a função vier por props, usa ela, senão usa a do hook
    const adicionarQuiz = adicionarQuizProp || hooks.adicionarQuiz;
    const editarQuiz = editarQuizProp || hooks.editarQuiz;

    // Estados iniciais — se estiver editando, carrega valores do quizInicial
    const [nomeQuiz, setNomeQuiz] = useState(quizInicial?.nome || "");
    const [descricaoQuiz, setDescricaoQuiz] = useState(quizInicial?.descricao || "");
    const [dificuldadeQuiz, setDificuldadeQuiz] = useState(quizInicial?.dificuldade || "");
    const [materiaQuiz, setMateriaQuiz] = useState(quizInicial?.materia || "");
    const [perguntasSelecionadas, setPerguntasSelecionadas] =
        useState(quizInicial?.perguntas || []);
    const [perguntasSearch, setPerguntaSearch] = useState("");

    // Adiciona/remove pergunta ao clicar
    function alternarPergunta(pergunta) {
        const jaSelecionada = perguntasSelecionadas.some(p => p.id === pergunta.id);

        if (jaSelecionada) {
            // Remove se já estiver selecionada
            setPerguntasSelecionadas(prev => prev.filter(p => p.id !== pergunta.id));
        } else {
            // Adiciona se não estiver selecionada
            setPerguntasSelecionadas(prev => [...prev, pergunta]);
        }
    }

    // Envio do formulário
    function submit(e) {
        e.preventDefault(); // Evita reload da página

        // Validação simples
        if (
            nomeQuiz.trim() === '' ||
            descricaoQuiz.trim() === '' ||
            !dificuldadeQuiz ||
            !materiaQuiz ||
            perguntasSelecionadas.length === 0
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Dados completos do quiz
        const dados = {
            nome: nomeQuiz,
            descricao: descricaoQuiz,
            dificuldade: dificuldadeQuiz,
            materia: materiaQuiz,
            perguntas: perguntasSelecionadas
        };

        // Se estiver editando, atualiza o quiz
        if (editar && quizInicial) {
            editarQuiz(quizInicial.id, dados);
            alert("Quiz editado");
        } else {
            // Caso contrário, cria um novo quiz
            adicionarQuiz(
                dados.nome,
                dados.descricao,
                dados.dificuldade,
                dados.materia,
                dados.perguntas
            );
            alert("Quiz cadastrado:", dados); // (alert não mostra objetos)
        }

        // Fecha modal se existir função
        onClose?.();

        // Reseta campos após cadastrar
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

                    {/* Botão de sair só aparece no modo cadastro */}
                    <Link to="/menu">
                        {!editar && (
                            <button type="button">
                                <img
                                    className={styles['exit-button']}
                                    src="/images/botaoExit.png"
                                    alt="Sair"
                                />
                            </button>
                        )}
                    </Link>

                    <h2>{editar ? "editar quiz" : "cadastro de quiz"}</h2>

                    {/* Inputs principais */}
                    <div className={styles.infoQuiz}>

                        <div>
                            <label>Nome do Quiz:</label>
                            <input
                                value={nomeQuiz}
                                onChange={(e) => setNomeQuiz(e.target.value)}
                                type="text"
                                placeholder="Ex: Quiz de Prog"
                            />
                        </div>

                        <div>
                            <label>Descrição:</label>
                            <input
                                value={descricaoQuiz}
                                onChange={(e) => setDescricaoQuiz(e.target.value)}
                                placeholder="Descrição curta"
                            />
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

                    {/* Lista de perguntas */}
                    <div className={styles.perguntasDisponiveis}>
                        <h3>Perguntas Disponíveis ({perguntas.length})</h3>

                        <div className={styles.searchButtonContainer}>
                            {/* Barra de busca */}
                            <div className={styles.searchWrapper}>
                                <SearchP
                                    quizzesPergunta={perguntasSearch}
                                    setPerguntasSearch={setPerguntaSearch}
                                />
                            </div>

                            {/* Botão salvar/cadastrar */}
                            <button className={styles.btnQuizInline} type='submit'>
                                {editar ? "Salvar Alterações" : "Cadastrar Quiz"}
                            </button>
                        </div>

                        {/* Lista filtrada */}
                        <div className={styles.perguntasLista}>
                            {searchPergunta(perguntasSearch, perguntas).map((p) => (
                                <div
                                    key={p.id}
                                    className={`
                                        ${styles.perguntaItem}
                                        ${perguntasSelecionadas.some(sel => sel.id === p.id)
                                            ? styles.selecionada
                                            : ''
                                        }
                                    `}
                                    onClick={() => alternarPergunta(p)}
                                >
                                    <p>{p.descricao}</p>
                                    <small>{p.materia} — {p.dificuldade}</small>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botão de cancelar aparece só no modo edição */}
                    {editar && (
                        <button
                            type="button"
                            className={styles.btnQuiz}
                            onClick={onClose}
                        >
                            Cancelar edição
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
