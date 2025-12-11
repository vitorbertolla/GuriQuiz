// Importa função que gera a dica via IA
import { enviarPrompt } from './Dica.jsx'

// Importa estilos da tela
import styles from './Tela_Jogo.module.css'

// Importa o componente Timer
import Timer from './Timer.jsx'

// Hook para carregar perguntas do banco
import { usePerguntas } from '../../services/crudPerguntas'

// Hooks de navegação e leitura de parâmetros da URL
import { useSearchParams, useNavigate } from 'react-router-dom'

// Hooks do React
import { useEffect, useState } from 'react'

// Hook para carregar quizzes salvos
import { useQuizzes } from '../../services/crudQuiz'


export default function Tela_Jogo() {

    // Carrega listas completas de perguntas e quizzes
    const { perguntas } = usePerguntas();
    const { quizzes } = useQuizzes();

    // Lê parâmetros da URL
    const [searchParams] = useSearchParams();

    // Navegador para mudar de página
    const navigate = useNavigate();

    // Lê o ID do quiz pela URL
    const quizId = searchParams.get('id'); 

    // Nome do quiz (pode vir da URL)
    const [quizNome, setQuizNome] = useState(() => searchParams.get('nome') || "");

    // Estados principais da lógica do jogo
    const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostaClicada, setRespostaClicada] = useState(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    
    // Para a dica via IA
    const [carregando, setCarregando] = useState(false)
    const [dica, setDica] = useState("")
    
    // Guarda resultados de cada pergunta
    const [resultados, setResultados] = useState([]);

    // Controle de carregamento inicial
    const [carregandoPerguntas, setCarregandoPerguntas] = useState(true);

    // Timer por pergunta
    const [tempoRestante, setTempoRestante] = useState(10 * 1000)


    // --- useEffect que carrega perguntas baseado no modo (quiz salvo ou filtros) ---
    useEffect(() => {
        setCarregandoPerguntas(true);

        // Se não tiver perguntas, não faz nada
        if (!perguntas || perguntas.length === 0) {
            setPerguntasFiltradas([]);
            setCarregandoPerguntas(false);
            return;
        }

        // ----- MODO QUIZ POR ID ------
        if (quizId && quizzes && quizzes.length > 0) {
            const quizEncontrado = quizzes.find(q => String(q.id) === String(quizId));

            if (!quizEncontrado) {
                setPerguntasFiltradas([]);
                setCarregandoPerguntas(false);
                return;
            }

            // Define nome do quiz
            setQuizNome(quizEncontrado.nome || "Quiz sem nome");

            // Garante array
            let perguntasDoQuiz = quizEncontrado.perguntas || [];
            if (!Array.isArray(perguntasDoQuiz)) {
                perguntasDoQuiz = Object.values(perguntasDoQuiz);
            }

            // Embaralha perguntas
            setPerguntasFiltradas([...perguntasDoQuiz].sort(() => Math.random() - 0.5));
            setCarregandoPerguntas(false);
            return;
        }

        // ----- MODO FILTROS VIA QUERY STRING -----
        const materiasParam = searchParams.get('materias');
        const dificuldadesParam = searchParams.get('dificuldade');
        const numeroPerguntasParam = parseInt(searchParams.get('numeroPerguntas'), 10);

        // Converte strings da URL para arrays
        const materias = materiasParam ? materiasParam.split(',').map(s => s.trim()).filter(Boolean) : null;
        const dificuldades = dificuldadesParam ? dificuldadesParam.split(',').map(s => s.trim()).filter(Boolean) : null;

        // Número de perguntas a usar
        const numeroPerguntas = !isNaN(numeroPerguntasParam) && numeroPerguntasParam > 0
            ? numeroPerguntasParam
            : perguntas.length;

        // Filtragem
        let filtradas = perguntas.filter((p) => {
            const okMateria = !materias || materias.length === 0 ? true : materias.includes(p.materia);
            const okDificuldade = !dificuldades || dificuldades.length === 0 ? true : dificuldades.includes(p.dificuldade);
            return okMateria && okDificuldade;
        });

        // Se filtro não achou nada, usa tudo
        if (!filtradas || filtradas.length === 0) {
            filtradas = [...perguntas];
        }

        // Embaralha e limita
        setPerguntasFiltradas(filtradas.sort(() => Math.random() - 0.5).slice(0, numeroPerguntas));
        setCarregandoPerguntas(false);

    }, [perguntas, quizzes, quizId, searchParams]);


    // Se ainda está carregando perguntas
    if (carregandoPerguntas) {
        return (
            <div className={styles.background}>
                <div className={styles.container}>
                    <div>Carregando perguntas...</div>
                </div>
            </div>
        );
    }

    // Se não encontrou nenhuma pergunta
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

    // Seleciona pergunta atual
    const pergunta = perguntasFiltradas[perguntaAtual];


    // --- Quando clica em uma alternativa ---
    const handleAlternativaClick = (letraAlternativa) => {
        if (mostrarResultado) return; // Bloqueia double click

        setRespostaClicada(letraAlternativa);
        setMostrarResultado(true);

        const acertou = letraAlternativa === pergunta.correta;

        // Calcula pontuação dinamicamente baseado no tempo e dificuldade
        const novaPontuacao = acertou
            ? pontuacao + (tempoRestante * 10 / 1000 * (getDificuldadeValue(pergunta.dificuldade) / 10))
            : pontuacao;

        setPontuacao(novaPontuacao);

        // Cria registro do resultado
        const novoResultado = {
            descricao: pergunta.descricao,
            correta: pergunta.correta,
            escolhida: letraAlternativa,
            acertou
        };

        const todosResultados = [...resultados, novoResultado];
        setResultados(todosResultados);

        // Espera 2 segundos para ir para a próxima
        setTimeout(() => {
            handleProxima(todosResultados, novaPontuacao);
        }, 2000);
    };


    // --- Próxima pergunta ou fim do quiz ---
    const handleProxima = (resultadosAtualizados = resultados, pontuacaoAtualizada = pontuacao) => {
        if (perguntaAtual + 1 < perguntasFiltradas.length) {
            setPerguntaAtual((prev) => prev + 1);
            setRespostaClicada(null);
            setMostrarResultado(false);
            setDica("");
            setTempoRestante(10 * 1000);
        } else {
            // Final do quiz → navega para os resultados
            navigate(
                `/resultados?pontuacao=${Math.round(pontuacaoAtualizada)}&total=${perguntasFiltradas.length}&nome=${quizNome}`,
                { state: { resultados: resultadosAtualizados, quizId: quizId, nomequiz: quizNome } }
            );
        }
    };


    // --- Quando o tempo acaba ---
    const handleTempoEsgotado = () => {
        if (mostrarResultado) return;

        setRespostaClicada(null);
        setMostrarResultado(true);

        const novoResultado = {
            descricao: pergunta.descricao,
            correta: pergunta.correta,
            escolhida: null,
            acertou: false
        };

        const todosResultados = [...resultados, novoResultado];
        setResultados(todosResultados);

        setTimeout(() => {
            handleProxima(todosResultados, pontuacao);
        }, 2000);
    };


    // Converte dificuldade em número para barra de progresso
    const getDificuldadeValue = (dificuldade) => {
        switch (dificuldade) {
            case 'facil': return 33;
            case 'medio': return 66;
            case 'dificil': return 100;
            default: return 0;
        }
    };


    // --- RENDERIZAÇÃO ---
    return (
    <div className={styles.background}>
        <div className={styles.container}>
            <div className={styles.header}>

                {/* Parte superior: timer, botão dica e dificuldade */}
                <div className={styles.topControls}>
                    <Timer
                        key={perguntaAtual}
                        tempoRestante={tempoRestante}
                        duracao={30 * 1000}
                        setTempoRestante={setTempoRestante}
                        onTempoEsgotado={handleTempoEsgotado}
                    />

                    {/* Botão que chama IA para gerar dica */}
                    <button
                        className={styles.dica}
                        onClick={() => {
                            enviarPrompt(pergunta.descricao, pergunta.alternativas, setDica, setCarregando)
                            setCarregando(true)
                        }}
                        disabled={carregando}
                    >
                        💡 DICA
                    </button>

                    {/* Barra de dificuldade */}
                    <div className={styles.dificuldadeContainer}>
                        <label htmlFor="dificuldade">Dificuldade:</label>
                        <progress
                            id='dificuldade'
                            value={getDificuldadeValue(pergunta.dificuldade)}
                            max='100'
                        ></progress>
                    </div>
                </div>

                {/* Mostra texto enquanto gera dica */}
                {carregando && (<p className={styles.carregandodica}>⏳ Carregando dica...</p>)}

                {/* Modal da dica */}
                {dica !== "" && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button
                                className={styles.modalClose}
                                onClick={() => setDica("")}
                            >
                                ✕
                            </button>

                            <h2>💡 Dica</h2>
                            <p>{dica}</p>
                        </div>
                    </div>
                )}

                {/* Título, número da pergunta e pontuação */}
                <div className={styles.info}>
                    <h1>{pergunta.descricao}</h1>
                    <h2>{perguntaAtual + 1} / {perguntasFiltradas.length}</h2>
                    <div className={styles.pontuacao}>
                        <span>🏆 Pontuação: {Math.round(pontuacao)}</span>
                    </div>
                </div>
            </div>

            {/* Alternativas da pergunta */}
            <div className={styles.alternativas}>
                {pergunta.alternativas?.map((alt, index) => (
                    <button
                        key={index}
                        className={`${styles.alternativaBtn} ${
                            mostrarResultado && respostaClicada === alt.letra
                                ? (alt.letra === pergunta.correta ? styles.correta : styles.incorreta)
                                : mostrarResultado && alt.letra === pergunta.correta
                                    ? styles.correta
                                    : ''
                        }`}
                        onClick={() => handleAlternativaClick(alt.letra)}
                        disabled={mostrarResultado}
                    >
                        <strong className={styles.alternativaLetra}>
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
