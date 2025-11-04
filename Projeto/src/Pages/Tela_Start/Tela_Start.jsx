import styles from "./Tela_Start.module.css";

export default function Tela_Start() {
  return (
      <div className={styles.container}>
        <header className={styles.telaStartHeader}>
          <div className={styles.jogador}>
            <img className={styles.iconeJogador} src="/images/iconeJogador.png" alt="Imagem jogador" />
            <h3 className={styles.nomeJogador}>istchuk</h3>
          </div>
        </header>

     
      <main className={styles.containerPrincipal}>
        <section className={styles.telaStartSection}>
          <h3>
            <img img className={styles.tituloPequeno} src="/images/jogarJuntos.png" alt="" />
          </h3>
          <h1>
            <img className={styles.tituloGuri} src="/images/tituloGuri.png" alt="" />
          </h1>
        </section>

        <section className={styles.botoesContainer}>
          <button><img className={styles.btnStart} src="/images/botaoStart.png" alt="" /></button>
        </section>
      </main>
    </div>

  )  
}
