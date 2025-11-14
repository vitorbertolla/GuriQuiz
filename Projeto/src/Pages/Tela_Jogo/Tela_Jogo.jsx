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

    const handleAlternativaClick = (textoAlternativa) => {
        setRespostaClicada(textoAlternativa);
        setMostrarResultado(true);

        // Verifica se a resposta está correta (compare com pergunta.correta)
        if (textoAlternativa === pergunta.correta) {
            setPontuacao((p) => p + 100);
        }
    };

    const handleProxima = () => {
        if (perguntaAtual + 1 < perguntasFiltradas.length) {
            setPerguntaAtual(perguntaAtual + 1);
            setRespostaClicada(null);
            setMostrarResultado(false);
        } else {
            navigate(`/resultados?pontuacao=${pontuacao}`);
        }
    };

    const getDificuldadeValue = (dificuldade) => {
        switch (dificuldade) {
            case 'Fácil':
                return 25;
            case 'Médio':
                return 75;
            case 'Difícil':
                return 100;
            default:
                return 0;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.dica}>DICA</button>
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
                            respostaClicada === alt.texto
                                ? (alt.texto === pergunta.correta ? styles.correta : styles.incorreta)
                                : ''
                        }`}
                        onClick={() => handleAlternativaClick(alt.texto)}
                        disabled={mostrarResultado}
                    >
                        <strong style={{marginRight: 8}}>{alt.letra}</strong>
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
    )
}