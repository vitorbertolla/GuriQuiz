import { useState, useEffect, use } from "react";

export default function Timer({ duracao, onTempoEsgotado }) {
    const [tempoRestante, setTempoRestante] = useState(duracao);

    useEffect(() => {
        if (tempoRestante <= 0) return;
        setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000)
    },[tempoRestante]);

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