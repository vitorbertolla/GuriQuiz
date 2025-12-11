import styles from "./Tela_Menu.module.css";
import { Link } from "react-router-dom";

export default function Tela_Menu() {
  return (
    // Container principal da tela
    <div className={styles.container}>
      <div className={styles.telaMenuMenu}>

        {/* Cabeçalho do menu */}
        <header className={styles.telaMenuHeader}>

          {/* Botão de sair, volta para /start */}
          <Link to="/start" className={`${styles.link} ${styles.linkExit}`}>
            <img
              className={styles.telaMenuBtnExit}
              src="/images/botaoExit.png"
              alt="Sair"
            />
          </Link>

          {/* Título do Menu */}
          <h1>
            <img
              className={styles.telaMenuTitle}
              src="/images/tituloMenu.png"
              alt="Título do Menu"
            />
          </h1>

        </header>

        {/* Conteúdo principal */}
        <main className={styles.telaMenuMain}>
          <section className={styles.telaMenuControls}>

            {/* Opções de administração / gerenciamento */}
            <div className={styles.telaMenuOptions}>

              {/* Link para cadastro de perguntas */}
              <Link to="/cadastropergunta" className={`${styles.link} ${styles.linkOption}`}>
                <button className={styles.pixelButton}>CADASTRO PERGUNTA</button>
              </Link>

              {/* Link para cadastro de quiz */}
              <Link to="/cadastroQuiz" className={`${styles.link} ${styles.linkOption}`}>
                <button className={styles.pixelButton}>CADASTRO QUIZ</button>
              </Link>

              {/* Link para ranking geral */}
              <Link to="/ranking" className={`${styles.link} ${styles.linkOption}`}>
                <button className={styles.pixelButton}>RANKING GERAL</button>
              </Link>

            </div>

            {/* Botões para jogar */}
            <div className={styles.botoesJogar}>

              {/* Jogo rápido */}
              <div className={styles.telaMenuPlay}>
                <Link to="/quizPronto" className={`${styles.link} ${styles.linkPlay}`}>
                  <img
                    className={styles.telaMenuBtnPlay}
                    src="/images/botaoJogoRapido.png"
                    alt="Jogo Rápido"
                  />
                </Link>
              </div>

              {/* Jogo personalizado */}
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
