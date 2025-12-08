import { useState, useEffect} from "react";
import styles from './Timer.module.css'

export default function Timer({ tempoRestante, duracao, setTempoRestante, onTempoEsgotado }) {
    useEffect(() => {
        setTempoRestante(duracao);
    }, [duracao, setTempoRestante]);

    useEffect(() => {
        if (tempoRestante <= 0) return;
        const id = setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000)
        return () => clearTimeout(id);
    }, [tempoRestante, setTempoRestante]);

    useEffect(() => {
        if (tempoRestante === 0) {  
            onTempoEsgotado();
        }
    }, [tempoRestante, onTempoEsgotado]);

    const FormatarTempo = (ms) => {
        let segundos = Math.floor((tempoRestante / 1000));
        return `${segundos}`
    }

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