import styles from './Tela_Ranking.module.css'

export default function Tela_Ranking() {
    return (
        <div>
            <div>
                <button>EXIT</button>
            </div>
            <form action="">
                <select name="materia" id="materia">
                    <option value=""></option>
                </select>
                <h1>Ranking</h1>
                <select name="numeroPerguntas" id="NumeroPerguntas">
                    <option value=""></option>
                </select>
            </form>
            <div>
                <div>
                    {/* Ranking */}
                </div>
                <div>
                    {/* Gráfico */}
                </div>
            </div>
        </div>
    )
}