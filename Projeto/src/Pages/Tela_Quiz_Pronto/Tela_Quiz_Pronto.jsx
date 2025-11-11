import styles from './Tela_Quiz_Pronto.module.css'
import { Link } from "react-router-dom";



export default function () {
    return (
        // container
        <div>
            {/* card */}
            <div>
                {/* card */}
                <div>
                    <p>exemplo de quiz pronto</p>
                    <p>quantidade de questões ex= 10/10</p>
                    <p>area: ex matemática</p>
                    <p>dificultade: ex dificil</p>
                    <button>selecionar</button>
                </div>
                <div>
                    <Link to="/jogo" className={`${styles.link} ${styles.linkPlay}`}>
                        <img
                            className={styles.telaMenuBtnPlay}
                            src="/images/botaoJogar.png"
                            alt="Criar quiz"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}