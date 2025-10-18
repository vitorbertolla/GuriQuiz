import styles from './Tela_Inicial.module.css'
import { Link } from 'react-router-dom';

export default function Inicial (){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.tituloContainer}>
                    <h3><img className={styles.tituloPequeno} src="/images/jogarJuntos.png" alt="" /></h3>
                    <h1><img className={styles.tituloGuri} src="/images/tituloGuri.png" alt="" /></h1>
                </div>
                <div className={styles.botoesContainer}>
                    <button className={`${styles.botao} ${styles.botaoPrimario}`}>
                        <Link to="/login" className={styles.loginLink}>
                            <img className={styles.btnLogin} src="/images/botaoLogin.png" alt="" />
                        </Link>
                    </button>
                    <button className={`${styles.botao} ${styles.botaoSecundario}`}>
                        <Link to="/cadastrar" className={styles.cadastroLink}>
                            <img className={styles.btnCadastro} src="/images/botaoCadastro.png" alt="" />
                        </Link>
                    </button>
                </div>
            </div>
        )
}