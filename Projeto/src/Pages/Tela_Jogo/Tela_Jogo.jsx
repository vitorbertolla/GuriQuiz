import styles from './Tela_Jogo.module.css'

export default function Tela_Jogo() {
    return (
        <div>
            <div>
                <button>DICA</button>
                <div>
                    <h1>Pergunta</h1>
                    <h2>1/5</h2>
                </div>
                <label htmlFor="dificuldade">Dificuldade:</label>
                <progress id='dificuldade' value='75' max='100'></progress>
            </div>
            <div>
                <p>ALTERNATIVA</p>
                <p>ALTERNATIVA</p>
                <p>ALTERNATIVA</p>
                <p>ALTERNATIVA</p>
            </div>
        </div>
    )
}