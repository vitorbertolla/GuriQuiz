import styles from "./Tela_Menu.module.css";
import { Link } from "react-router-dom";

export default function Tela_Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.telaMenuMenu}>
        <header className={styles.telaMenuHeader}>
          <Link to="/start" className={`${styles.link} ${styles.linkExit}`}>
            <img
              className={styles.telaMenuBtnExit}
              src="/images/botaoExit.png"
              alt="Sair"
            />
          </Link>
          <h1>
            <img
              className={styles.telaMenuTitle}
              src="/images/tituloMenu.png"
              alt="Título do Menu"
            />
          </h1>
        </header>
        <main className={styles.telaMenuMain}>
          <section className={styles.telaMenuControls}>
            <div className={styles.telaMenuOptions}>
              <Link to="/cadastropergunta" className={`${styles.link} ${styles.linkOption}`}>
                  <button className={styles.pixelButton}>CADASTRO PERGUNTA</button>
              </Link>
              <Link to="/cadastroQuiz"  className={`${styles.link} ${styles.linkOption}`} >
                  <button className={styles.pixelButton}>CADASTRO QUIZ</button>
              </Link>
              <Link to="/ranking" className={`${styles.link} ${styles.linkOption}`}>
                  <button className={styles.pixelButton}>RAKING GERAL</button>
              </Link>
            </div>
            <div className={styles.botoesJogar}>
              <div className={styles.telaMenuPlay}>
                <Link to="/quizPronto" className={`${styles.link} ${styles.linkPlay}`}>
                  <img
                    className={styles.telaMenuBtnPlay}
                    src="/images/botaoJogoRapido.png"
                    alt="Jogo Rápido"
                  />
                </Link>
              </div>
              <div>
                <Link to="/configuraçãoQuiz" className={`${styles.link} ${styles.linkPlay}`}>
                  <img
                    className={styles.telaMenuBtnPlay}
                    src="/images/botaoJogoPersonalizado.png"
                    alt="Jogo Personalizado"
                  />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
