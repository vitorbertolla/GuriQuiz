import styles from './Tela_Ranking.module.css'
import { Link } from 'react-router-dom';

export default function Tela_Ranking() {
    return (
        <div>
            <div>
                    <Link to="/menu">
                        <button><img className={styles['exit-button']} src="/images/botaoExit.png" alt="" ></img></button>
                    </Link>
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