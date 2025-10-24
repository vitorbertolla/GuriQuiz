import styles from "./Tela_Start.module.css";

export default function Tela_Start() {
  return (
    <div className="tela-start">
      <header className="tela-start__header">
        <div className="tela-start__player">
          <img className="tela-start__player-image" src="" alt="Imagem jogador" />
          <h3 className="tela-start__player-name">JOGADOR 1</h3>
        </div>
      </header>

      <main className="tela-start__main">
        <section className="tela-start__title">
          <h3 className="tela-start__title-small">
            <img className="tela-start__title-small-img" src="/images/jogarJuntos.png" alt="" />
          </h3>
          <h1 className="tela-start__title-large">
            <img className="tela-start__title-large-img" src="/images/tituloGuri.png" alt="" />
          </h1>
        </section>

        <section className="tela-start__actions">
          <button className="tela-start__button tela-start__button--primary">Start</button>
        </section>
      </main>
    </div>
  );
}
