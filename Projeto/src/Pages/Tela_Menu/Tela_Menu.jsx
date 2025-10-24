import styles from './Tela_Menu.module.css'

export default function Tela_Menu () {
    return (
        <div className={styles.container}>
            <div className={styles.telaMenuMenu}>
                <header className={styles.telaMenuHeader}>
                    <button ><img className={styles.telaMenuBtnExit} src="/images/botaoExit.png" alt="" /></button>
                    <h1><img className={styles.telaMenuTitle} src="/images/tituloMenu.png" alt="" /></h1>
                </header>
                <main className={styles.telaMenuMain}>
                    <section className={styles.telaMenuControls}>
                        <div className={styles.telaMenuOptions}>
                            <button><img className={styles.telaMenuBtnOption} src="/images/botaoCadastroPerguntas.png" alt="" /></button>
                            <button><img className={styles.telaMenuBtnOption} src="/images/botaoRanking.png" alt="" /></button>
                        </div>
                        <div className={styles.telaMenuPlay}>
                            <button><img className={styles.telaMenuBtnPlay} src="/images/botaoJogar.png" alt="" /></button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}