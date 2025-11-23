import { enviarPrompt } from './Dica.jsx'
import styles from './Tela_Jogo.module.css'
import Timer from './Timer.jsx'

import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuizzes } from '../../services/crudQuiz'


export default function Tela_Jogo() {
    const { quizzes } = useQuizzes();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostaClicada, setRespostaClicada] = useState(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [carregando, setCarregando] = useState(false)
    const [dica, setDica] = useState("")
    const [resultados, setResultados] = useState([]);
    const [carregandoPerguntas, setCarregandoPerguntas] = useState(true);
    const [tempoRestante, setTempoRestante] = useState(10*1000) 
    
    // Obter o ID do quiz a partir dos parâmetros de busca
    const quizId = searchParams.get('id');

    useEffect(() => {
        if (!quizzes) return;
        setCarregandoPerguntas(true);

        if (quizId) {
            // Buscar quiz pelo id
            const quizEncontrado = quizzes.find(q => q.id === quizId);
            if (!quizEncontrado) {
                setPerguntasFiltradas([]);
                setCarregandoPerguntas(false);
                return;
            }
            // Se as perguntas já estão completas dentro do quiz (como no Firestore)
            let perguntasDoQuiz = quizEncontrado.perguntas || [];
            // Se for objeto, transforma em array
            if (!Array.isArray(perguntasDoQuiz)) {
                perguntasDoQuiz = Object.values(perguntasDoQuiz);
            }
            // Embaralha perguntas
            perguntasDoQuiz = [...perguntasDoQuiz].sort(() => Math.random() - 0.5);
            setPerguntasFiltradas(perguntasDoQuiz);
            setCarregandoPerguntas(false);
        } else {
            // fallback: não tem id, não mostra nada
            setPerguntasFiltradas([]);
            setCarregandoPerguntas(false);
        }
    }, [quizzes, quizId]);

    // Auto-avanço após mostrar resultado

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
            ? pontuacao + (tempoRestante * 10 / 1000 * (getDificuldadeValue(pergunta.dificuldade)/10))
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
            // AVANÇA DEPOIS DE 2s
        setTimeout(() => {
            handleProxima(todosResultados, novaPontuacao);
        }, 2000);
    };


    const handleProxima = (resultadosAtualizados = resultados, pontuacaoAtualizada = pontuacao ) => {
        if (perguntaAtual + 1 < perguntasFiltradas.length) {
            setPerguntaAtual((prev) => prev + 1);
            setRespostaClicada(null);
            setMostrarResultado(false);
            setDica("")
            setTempoRestante(10 * 1000);
        } else {
              navigate(`/resultados?pontuacao=${Math.round(pontuacaoAtualizada)}&total=${perguntasFiltradas.length}`, { 
                state: { resultados: resultadosAtualizados } 
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
                            duracao={10*1000}
                            setTempoRestante={setTempoRestante}
                            onTempoEsgotado={handleTempoEsgotado} 
                        />
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
                    {carregando && (<p>Carregando dica...</p>)}
                    {dica !== "" && (
                        <div className={styles.dicaContainer}>
                            <button onClick={() => setDica("")}>X</button>
                            <p>Dica: {dica}</p>
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
                            className={`${styles.alternativaBtn} ${
                                mostrarResultado && respostaClicada === alt.letra
                                    ? (alt.letra === pergunta.correta ? styles.correta : styles.incorreta)
                                    : ''
                            }`}
                            onClick={() => handleAlternativaClick(alt.letra)}
                            disabled={mostrarResultado}
                        >
                            <strong className={styles.alternativaLetra} style={{marginRight: 8}}>
                                {alt.letra}
                            </strong>
                            {alt.texto}
                        </button>
                    ))}
                </div>
                {mostrarResultado && (
                    <div className={styles.resultado}>
                        <p className={respostaClicada === pergunta.correta ? styles.correto : styles.errado}>
                            {respostaClicada === pergunta.correta ? '✓ Correto!' : '✗ Incorreto!'}
                        </p>
                        <p>Resposta correta: <strong>{pergunta.correta}</strong></p>
                        <small>Próxima pergunta em 2 segundos...</small>
                    </div>
                )}
            </div>
        </div>
    )
}