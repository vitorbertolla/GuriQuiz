import { enviarPrompt } from './Dica.jsx'
import styles from './Tela_Jogo.module.css'
import { usePerguntas } from '../../services/crudPerguntas'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Tela_Jogo() {
    const { perguntas } = usePerguntas();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostaClicada, setRespostaClicada] = useState(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [carregando, setCarregando] = useState(false)
    const [dica, setDica] = useState("")

    //usar essa como base prapuxar um quiz pronto
    useEffect(() => {
        if (!perguntas || perguntas.length === 0) return;

        const materias = searchParams.get('materias')?.split(',') || [];
        const dificuldade = searchParams.get('dificuldade') || '';
        const numeroPerguntas = parseInt(searchParams.get('numeroPerguntas')) || 0;

        let filtradas = perguntas.filter((p) => materias.includes(p.materia) && p.dificuldade === dificuldade);

        filtradas = filtradas.sort(() => Math.random() - 0.5).slice(0, numeroPerguntas);

        setPerguntasFiltradas(filtradas);
    }, [perguntas, searchParams]);

    // Auto-avanço após mostrar resultado
    useEffect(() => {
        if (mostrarResultado) {
            const timer = setTimeout(() => {
                handleProxima();
            }, 2000); // 2 segundos para ver o resultado

            return () => clearTimeout(timer);
        }
    }, [mostrarResultado]);

    if (perguntasFiltradas.length === 0) {
        return <div>Carregando perguntas...</div>;
    }

    const pergunta = perguntasFiltradas[perguntaAtual];

    const handleAlternativaClick = (letraAlternativa) => {
        setRespostaClicada(letraAlternativa);
        setMostrarResultado(true);

        // Verifica se a resposta está correta (compara letra com letra)
        if (letraAlternativa === pergunta.correta) {
            setPontuacao((p) => p + 100);
        }
    };

    const handleProxima = () => {
        if (perguntaAtual + 1 < perguntasFiltradas.length) {
            setPerguntaAtual((prev) => prev + 1);
            setRespostaClicada(null);
            setMostrarResultado(false);
            setDica("")
        } else {
            // envia pontuação e total de perguntas
            navigate(`/resultados?pontuacao=${pontuacao}&total=${perguntasFiltradas.length}`);
        }
    };

    const getDificuldadeValue = (dificuldade) => {
        switch (dificuldade) {
            case 'facil':
                return 25;
            case 'medio':
                return 75;
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
                    <button className={styles.dica}
                    onClick={() => {
                        enviarPrompt(pergunta.descricao, setDica, setCarregando)
                        setCarregando(true)    
                    }
                    }
                    >DICA</button>
                    {carregando && (<p>Carregando dica...</p>)}
                    {dica !== "" && (
                        <div>
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
                            <strong className = {styles.alternativaLetra} style={{marginRight: 8}}>{alt.letra}</strong>
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