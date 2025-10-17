import styles from './Tela_Inicial.module.css'
import { Link } from 'react-router-dom';

export default function Inicial (){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.tituloContainer}>
                    <h3 className={styles.tituloPequeno}>VAMOS JOGAR JUNTOS</h3>
                    <h1 className={styles.tituloGrande}>GuriQuiz</h1>
                </div>
                <div className={styles.botoesContainer}>
                    <button className={`${styles.botao} ${styles.botaoPrimario}`}>
                        <Link to="/login" className={styles.loginLink}>
                            Login
                        </Link>
                    </button>
                    <button className={`${styles.botao} ${styles.botaoSecundario}`}>
                        <Link to="/cadastrar" className={styles.cadastroLink}>
                            Cadastrar
                        </Link>
                    </button>
                </div>
            </div>
        )
}