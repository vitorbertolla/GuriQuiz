import { useState, useEffect, use } from "react";

export default function Timer({ duracao, onTempoEsgotado }) {
    const [tempoRestante, setTempoRestante] = useState(duracao);

    useEffect(() => {
        setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000)
    },[tempoRestante]);

    const FormatarTempo = (ms) => {
        let segundos = Math.floor((tempoRestante / 1000));
        return `${segundos}`

    }

    return( 
        <div>{FormatarTempo(tempoRestante)}</div>
    )
}