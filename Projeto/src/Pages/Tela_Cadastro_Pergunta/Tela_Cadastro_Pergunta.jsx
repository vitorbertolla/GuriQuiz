import styles from './Tela_Cadastro_Pergunta.module.css'

export default function Tela_Cadastro_Pergunta () {
    return(
        <div className="tela-cadastro-pergunta">
            <header className="tela-cadastro-pergunta__header">
                <button className="tela-cadastro-pergunta__exit-button">Exit</button>
                <h1 className="tela-cadastro-pergunta__title">Cadastro de Perguntas</h1>
            </header>

            <main className="tela-cadastro-pergunta__main">
                <form className="tela-cadastro-pergunta__form" action="">
                    <div className="tela-cadastro-pergunta__form-row">
                        <input
                            className="tela-cadastro-pergunta__input tela-cadastro-pergunta__input--pergunta"
                            type="text"
                            placeholder="Pergunta"
                        />

                        <select
                            className="tela-cadastro-pergunta__select tela-cadastro-pergunta__select--dificuldade"
                            name="Dificuldade"
                            id="Dificuldade"
                        >
                            <option value="">Selecione dificuldade</option>
                            <option value="facil">Fácil</option>
                            <option value="medio">Médio</option>
                            <option value="dificil">Difícil</option>
                        </select>

                        <select
                            className="tela-cadastro-pergunta__select tela-cadastro-pergunta__select--materia"
                            name="Materia"
                            id="Materia"
                        >
                            <option value="">Selecione matéria</option>
                            <option value="matematica">Matemática</option>
                            <option value="portugues">Português</option>
                        </select>

                        <button
                            type="button"
                            className="tela-cadastro-pergunta__button tela-cadastro-pergunta__button--alternativas"
                        >
                            Alternativas
                        </button>
                    </div>

                    <div className="tela-cadastro-pergunta__actions">
                        <button
                            type="button"
                            className="tela-cadastro-pergunta__button tela-cadastro-pergunta__button--ai"
                        >
                            Criar com IA
                        </button>
                        <button
                            type="submit"
                            className="tela-cadastro-pergunta__button tela-cadastro-pergunta__button--submit"
                        >
                            Cadastrar Pergunta
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}