import { useState, useEffect, use } from "react";

export default function Timer({ tempoRestante,duracao, setTempoRestante, onTempoEsgotado }) {
    useEffect(() => {
        setTempoRestante(duracao);
    }, [duracao, setTempoRestante]);

    useEffect(() => {
        if (tempoRestante <= 0) return;
        const id = setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000)
        return () => clearTimeout(id);
    },[tempoRestante, setTempoRestante]);

    useEffect(() => {
        if (tempoRestante === 0) {  
            onTempoEsgotado();
        }
    }, [tempoRestante, onTempoEsgotado]);

    const FormatarTempo = (ms) => {
        let segundos = Math.floor((tempoRestante / 1000));
        return `${segundos}`

    }

    return( 
        <div>{FormatarTempo(tempoRestante)}</div>
    )
}