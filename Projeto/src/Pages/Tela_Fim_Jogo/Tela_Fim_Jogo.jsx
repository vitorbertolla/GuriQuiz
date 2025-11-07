import styles from './Tela_Fim_Jogo.module.css'

export default function Tela_Fim_Jogo() {
    return (
        <div className={styles.container}>
            <div className={styles.telaFimJogo}>
                <header className={styles.FimJogoHeader}>
                    <h1><img className={styles.tituloFimJogo} src="/images/tituloFimJogo.png" alt="" /></h1>
                </header>
                <main className={styles.fimJogoMain}>
                    <div className={styles.fimJogoBotoes}>
                        <button className={styles.fimJogoBtn}>
                           <img className={styles.icons} src="/images/iconCasa.png" alt="" /> 
                           MENU
                        </button>
                        <button className={styles.fimJogoBtn}>
                            <img className={styles.icons}src="/images/iconRanking.png" alt="" />
                            RESULTADOS
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
