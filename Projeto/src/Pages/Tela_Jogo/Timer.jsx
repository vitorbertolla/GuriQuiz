import { useState, useEffect} from "react";
import styles from './Timer.module.css'

// Componente Timer recebe:
// tempoRestante → quanto tempo ainda falta (em ms)
// duracao → tempo total inicial
// setTempoRestante → função para atualizar o tempo
// onTempoEsgotado → função chamada quando o tempo chega a zero
export default function Timer({ tempoRestante, duracao, setTempoRestante, onTempoEsgotado }) {

    // Quando a duração muda, reinicia o tempoRestante
    useEffect(() => {
        setTempoRestante(duracao);
    }, [duracao, setTempoRestante]);

    // Contagem regressiva: diminui 1000ms a cada 1 segundo
    useEffect(() => {
        // Se já chegou a 0 ou menos, não agenda mais nada
        if (tempoRestante <= 0) return;

        // Cria um timer que subtrai 1 segundo
        const id = setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000);

        // Cleanup: cancela o timeout se o componente atualizar ou desmontar
        return () => clearTimeout(id);
    }, [tempoRestante, setTempoRestante]);

    // Quando tempoRestante chega exatamente a 0, dispara o callback
    useEffect(() => {
        if (tempoRestante === 0) {  
            onTempoEsgotado();
        }
    }, [tempoRestante, onTempoEsgotado]);

    // Função que converte ms para segundos (somente segundos)
    const FormatarTempo = (ms) => {
        let segundos = Math.floor((tempoRestante / 1000));
        return `${segundos}`;
    }

    // Renderiza o timer com círculo animado e alerta quando < 3s
    return (
        <div className={styles.timer}>
            <div className={`${styles.timerCircle} ${tempoRestante <= 3000 ? styles.urgente : ""}`}>
                <span className={styles.timerText}>
                    {FormatarTempo(tempoRestante)}
                </span>
            </div>
        </div>
    )
}
