import styles from './Tela_Menu.module.css'

export default function Tela_Menu () {
    return (
        <div className="tela-menu">
            <header className="tela-menu__header">
                <button className="tela-menu__exit-button">Exit</button>
                <h1 className="tela-menu__title">Menu</h1>
            </header>

            <main className="tela-menu__main">
                <section className="tela-menu__controls">
                    <div className="tela-menu__options">
                        <button className="tela-menu__option-button">Cadastro de Perguntas</button>
                        <button className="tela-menu__option-button">Raking</button>
                    </div>
                    <div className="tela-menu__play">
                        <button className="tela-menu__play-button">Jogar</button>
                    </div>
                </section>
            </main>
        </div>
    )
}