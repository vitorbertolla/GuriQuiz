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
                <img
                  className={styles.telaMenuBtnOption}
                  src="/images/botaoCadastroPerguntas.png"
                  alt="Cadastrar Perguntas"
                />
              </Link>
              <Link to="/ranking" className={`${styles.link} ${styles.linkOption}`}>
                <img
                  className={styles.telaMenuBtnOption}
                  src="/images/botaoRanking.png"
                  alt="Ranking"
                />
              </Link>
            </div>
            <div className={styles.telaMenuPlay}>
              <Link to="/configuraçãoQuiz" className={`${styles.link} ${styles.linkPlay}`}>
                <img
                  className={styles.telaMenuBtnPlay}
                  src="/images/botaoJogar.png"
                  alt="Criar quiz"
                />
              </Link>
            </div>
            <div>
              <Link to="/configuraçãoQuiz" className={`${styles.link} ${styles.linkPlay}`}>
                <img
                  className={styles.telaMenuBtnPlay}
                  src="/images/botaoJogar.png"
                  alt="Jogo rápido"
                />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
