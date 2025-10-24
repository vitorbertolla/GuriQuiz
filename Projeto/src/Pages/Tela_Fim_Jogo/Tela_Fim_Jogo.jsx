import styles from './Tela_Fim_Jogo.module.css'

export default function Tela_Fim_Jogo() {
    return (
        <div className="tela-fim-jogo">
            <header className="tela-fim-jogo__header">
                <h1 className="tela-fim-jogo__title">Fim de Jogo</h1>
            </header>

            <main className="tela-fim-jogo__main">
                <div className="tela-fim-jogo__buttons">
                    <button className="tela-fim-jogo__button tela-fim-jogo__button--menu">
                        Menu
                    </button>
                    <button className="tela-fim-jogo__button tela-fim-jogo__button--resultados">
                        Resultados
                    </button>
                </div>
            </main>
        </div>
    )
}
