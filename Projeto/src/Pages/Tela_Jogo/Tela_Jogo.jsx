import { enviarPrompt } from './Dica.jsx'
import styles from './Tela_Jogo.module.css'
import Timer from './Timer.jsx'
import { usePerguntas } from '../../services/crudPerguntas'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuizzes } from '../../services/crudQuiz'


export default function Tela_Jogo() {
    const { perguntas } = usePerguntas();
    const { quizzes } = useQuizzes();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const quizId = searchParams.get('id'); 
    const [quizNome, setQuizNome] = useState(() => searchParams.get('nome') || "");

    const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostaClicada, setRespostaClicada] = useState(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [carregando, setCarregando] = useState(false)
    const [dica, setDica] = useState("")
    const [resultados, setResultados] = useState([]);
    const [carregandoPerguntas, setCarregandoPerguntas] = useState(true);
    const [tempoRestante, setTempoRestante] = useState(10 * 1000)

    useEffect(() => {
    setCarregandoPerguntas(true);

    if (!perguntas || perguntas.length === 0) {
        setPerguntasFiltradas([]);
        setCarregandoPerguntas(false);
        return;
    }

    if (quizId && quizzes && quizzes.length > 0) {
        // --- carregar quiz por id ---
        const quizEncontrado = quizzes.find(q => String(q.id) === String(quizId));
        if (!quizEncontrado) {
            setPerguntasFiltradas([]);
            setCarregandoPerguntas(false);
            return;
        }

        // Atualiza o nome do quiz sempre que encontrado
        setQuizNome(quizEncontrado.nome || "Quiz sem nome");

        let perguntasDoQuiz = quizEncontrado.perguntas || [];
        if (!Array.isArray(perguntasDoQuiz)) {
            perguntasDoQuiz = Object.values(perguntasDoQuiz);
        }

        setPerguntasFiltradas([...perguntasDoQuiz].sort(() => Math.random() - 0.5));
        setCarregandoPerguntas(false);
        return;
    }

    // --- carregar por filtros via query params ---
    const materiasParam = searchParams.get('materias');
    const dificuldadesParam = searchParams.get('dificuldade');
    const numeroPerguntasParam = parseInt(searchParams.get('numeroPerguntas'), 10);

    const materias = materiasParam ? materiasParam.split(',').map(s => s.trim()).filter(Boolean) : null;
    const dificuldades = dificuldadesParam ? dificuldadesParam.split(',').map(s => s.trim()).filter(Boolean) : null;
    const numeroPerguntas = !isNaN(numeroPerguntasParam) && numeroPerguntasParam > 0 ? numeroPerguntasParam : perguntas.length;

    let filtradas = perguntas.filter((p) => {
        const okMateria = !materias || materias.length === 0 ? true : materias.includes(p.materia);
        const okDificuldade = !dificuldades || dificuldades.length === 0 ? true : dificuldades.includes(p.dificuldade);
        return okMateria && okDificuldade;
    });

    if (!filtradas || filtradas.length === 0) {
        filtradas = [...perguntas];
    }

    setPerguntasFiltradas(filtradas.sort(() => Math.random() - 0.5).slice(0, numeroPerguntas));
    setCarregandoPerguntas(false);

}, [perguntas, quizzes, quizId, searchParams]);


    if (carregandoPerguntas) {
        return (
            <div className={styles.background}>
                <div className={styles.container}>
                    <div>Carregando perguntas...</div>
                </div>
            </div>
        );
    }

    if (perguntasFiltradas.length === 0) {
        return (
            <div className={styles.background}>
                <div className={styles.container}>
                    <div>
                        <h2>Nenhuma pergunta encontrada</h2>
                        <button onClick={() => navigate('/')}>Voltar ao início</button>
                    </div>
                </div>
            </div>
        );
    }

    const pergunta = perguntasFiltradas[perguntaAtual];

    const handleAlternativaClick = (letraAlternativa) => {
        if (mostrarResultado) return;

        setRespostaClicada(letraAlternativa);
        setMostrarResultado(true);

        const acertou = letraAlternativa === pergunta.correta;
        const novaPontuacao = acertou
            ? pontuacao + (tempoRestante * 10 / 1000 * (getDificuldadeValue(pergunta.dificuldade) / 10))
            : pontuacao;

        setPontuacao(novaPontuacao);
        const novoResultado = {
            descricao: pergunta.descricao,
            correta: pergunta.correta,
            escolhida: letraAlternativa,
            acertou
        }
        const todosResultados = [...resultados, novoResultado];
        setResultados(todosResultados);
        setTimeout(() => {
            handleProxima(todosResultados, novaPontuacao);
        }, 2000);
    };

    const handleProxima = (resultadosAtualizados = resultados, pontuacaoAtualizada = pontuacao) => {
        if (perguntaAtual + 1 < perguntasFiltradas.length) {
            setPerguntaAtual((prev) => prev + 1);
            setRespostaClicada(null);
            setMostrarResultado(false);
            setDica("");
            setTempoRestante(10 * 1000);
        } else {
            navigate(`/resultados?pontuacao=${Math.round(pontuacaoAtualizada)}&total=${perguntasFiltradas.length}&nome=${quizNome}`, {
                state: { resultados: resultadosAtualizados, quizId: quizId, nomequiz: quizNome }
            });
        }
    };

    const handleTempoEsgotado = () => {
        if (mostrarResultado) return;

        setRespostaClicada(null);
        setMostrarResultado(true);

        const novoResultado = {
            descricao: pergunta.descricao,
            correta: pergunta.correta,
            escolhida: null,
            acertou: false
        }
        const todosResultados = [...resultados, novoResultado];
        setResultados(todosResultados);

        setTimeout(() => {
            handleProxima(todosResultados, pontuacao);
        }, 2000);
    };

    const getDificuldadeValue = (dificuldade) => {
        switch (dificuldade) {
            case 'facil':
                return 33;
            case 'medio':
                return 66;
            case 'dificil':
                return 100;
            default:
                return 0;
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Timer
                        key={perguntaAtual}
                        tempoRestante={tempoRestante}
                        duracao={30 * 1000}
                        setTempoRestante={setTempoRestante}
                        onTempoEsgotado={handleTempoEsgotado}
                    />
                    <div>
                        <button
                            className={styles.dica}
                            onClick={() => {
                                enviarPrompt(pergunta.descricao, setDica, setCarregando)
                                setCarregando(true)
                            }}
                            disabled={carregando}
                        >
                            DICA
                        </button>
                        {carregando && (<p className={styles.carregandodica}>Carregando dica...</p>)}
                    </div>
                    {dica !== "" && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <button
                                    className={styles.modalClose}
                                    onClick={() => setDica("")}
                                >
                                    X
                                </button>

                                <h2>Dica</h2>
                                <p>{dica}</p>
                            </div>
                        </div>
                    )}

                    <div className={styles.info}>
                        <h1>{pergunta.descricao}</h1>
                        <h2>{perguntaAtual + 1} / {perguntasFiltradas.length}</h2>
                        <div className={styles.pontuacao}>
                            <span>Pontuação: {pontuacao}</span>
                        </div>
                    </div>
                    <div className={styles.dificuldadeContainer}>
                        <label htmlFor="dificuldade">Dificuldade:</label>
                        <progress
                            id='dificuldade'
                            value={getDificuldadeValue(pergunta.dificuldade)}
                            max='100'
                        ></progress>
                    </div>
                </div>
                <div className={styles.alternativas}>
                    {pergunta.alternativas?.map((alt, index) => (
                        <button
                            key={index}
                            className={`${styles.alternativaBtn} ${mostrarResultado && respostaClicada === alt.letra
                                    ? (alt.letra === pergunta.correta ? styles.correta : styles.incorreta)
                                    : mostrarResultado && alt.letra === pergunta.correta
                                        ? styles.correta
                                        : ''
                                }`}
                            onClick={() => handleAlternativaClick(alt.letra)}
                            disabled={mostrarResultado}
                        >
                            <strong className={styles.alternativaLetra} style={{ marginRight: 8 }}>
                                {alt.letra}
                            </strong>
                            {alt.texto}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
