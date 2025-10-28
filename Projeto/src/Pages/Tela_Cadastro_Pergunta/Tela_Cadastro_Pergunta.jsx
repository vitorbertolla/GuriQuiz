import styles from './Tela_Cadastro_Pergunta.module.css'
import { useState } from 'react'
import addPergunta from './Tela_Cadastro_Pergunta_Function.jsx'

export default function Tela_Cadastro_Pergunta() {
    const [pergunta, setPergunta] = useState('')
    const [dificuldade, setDificuldade] = useState('')
    const [materia, setMateria] = useState('')
    const [alternativas, setAlternativas] = useState([])   
    const [novaAlternativa, setNovaAlternativa] = useState('')
    const [modalAberto, setModalAberto] = useState(false) 

    function submit(e) {
        e.preventDefault()
        if (!pergunta || !dificuldade || !materia) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }
        addPergunta(pergunta, dificuldade, materia)
    }

    return (
        <div className={styles['tela-cadastro-pergunta']}>
            <header className={styles['tela-cadastro-pergunta__header']}>
                <button className={styles['tela-cadastro-pergunta__exit-button']}>Exit</button>
                <h1 className={styles['tela-cadastro-pergunta__title']}>Cadastro de Perguntas</h1>
            </header>

            <main className={styles['tela-cadastro-pergunta__main']}>
                <form
                    className={styles['tela-cadastro-pergunta__form']}
                    onSubmit={submit}
                >
                    <div className={styles['tela-cadastro-pergunta__form-row']}>
                        <input
                            className={`${styles['tela-cadastro-pergunta__input']} ${styles['tela-cadastro-pergunta__input--pergunta']}`}
                            type="text"
                            placeholder="Pergunta"
                            value={pergunta}
                            onChange={(e) => setPergunta(e.target.value)}
                        />

                        <select
                            className={`${styles['tela-cadastro-pergunta__select']} ${styles['tela-cadastro-pergunta__select--dificuldade']}`}
                            value={dificuldade}
                            onChange={(e) => setDificuldade(e.target.value)}
                        >
                            <option value="">Selecione dificuldade</option>
                            <option value="facil">Fácil</option>
                            <option value="medio">Médio</option>
                            <option value="dificil">Difícil</option>
                        </select>

                        <select
                            className={`${styles['tela-cadastro-pergunta__select']} ${styles['tela-cadastro-pergunta__select--materia']}`}
                            value={materia}
                            onChange={(e) => setMateria(e.target.value)}
                        >
                            <option value="">Selecione matéria</option>
                            <option value="matematica">Matemática</option>
                            <option value="portugues">Português</option>
                        </select>

                        <button
                            type="button"
                            className={`${styles['tela-cadastro-pergunta__button']} ${styles['tela-cadastro-pergunta__button--alternativas']}`}
                            onClick={() => setModalAberto(true)}
                        >
                            Alternativas
                        </button>
                    </div>

                    <div className={styles['tela-cadastro-pergunta__actions']}>
                        <button
                            type="button"
                            className={`${styles['tela-cadastro-pergunta__button']} ${styles['tela-cadastro-pergunta__button--ai']}`}
                        >
                            Criar com IA
                        </button>
                        <button
                            type="submit"
                            className={`${styles['tela-cadastro-pergunta__button']} ${styles['tela-cadastro-pergunta__button--submit']}`}
                        >
                            Cadastrar Pergunta
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
