import styles from './Tela_Config_Quiz.module.css'

export default function Tela_Config_Quiz() {
    return (
        <div>
            <div>
                <button>EXIT</button>
            </div>
            <div>
                <h1>CONFIGURAÇÃO DO QUIZ</h1>
            </div>
            <div>
                <select name="NumeroPerguntas" id="NumeroPerguntas">
                    <option value=""></option>
                </select>
                <select name="Dificuldade" id="Dificuldade">
                    <option value=""></option>
                </select>
                <select name="Materia" id="Materia">
                    <option value=""></option>
                </select>
            </div>
            <button>JOGAR</button>
        </div>
    )
}