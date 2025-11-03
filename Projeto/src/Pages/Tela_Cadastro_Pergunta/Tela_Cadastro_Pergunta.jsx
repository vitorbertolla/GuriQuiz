import styles from './Tela_Cadastro_Pergunta.module.css'
import { useState } from 'react'
import {adicionarPergunta} from '../../services/crudPerguntas'

export default function Tela_Cadastro_Pergunta() {
    const [pergunta, setPergunta] = useState('')
    const [dificuldade, setDificuldade] = useState('')
    const [materia, setMateria] = useState('')
    const [alternativas, setAlternativas] = useState([])   
    const [alternativaA, setAlternativaA] = useState('')
    const [alternativaB, setAlternativaB] = useState('')
    const [alternativaC, setAlternativaC] = useState('')
    const [alternativaD, setAlternativaD] = useState('')
    const [correta, setCorreta] = useState('')
    const [modalAberto, setModalAberto] = useState(false) 

    function submit(e) {
        e.preventDefault()
        if (!pergunta || !dificuldade || !materia) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }
        if (alternativas.length === 0) {
            alert('Adicione as alternativas antes de cadastrar a pergunta.')
            return
        }
        adicionarPergunta(pergunta, dificuldade, materia, alternativas, correta)
        
        // Resetar os campos após o cadastro
        setPergunta('')
        setDificuldade('')
        setMateria('')
        setAlternativas([])
        setAlternativaA('')
        setAlternativaB('')
        setAlternativaC('')
        setAlternativaD('')
        setCorreta('')
    }
    function confirmarAlternativas() {
        setAlternativas([
            { letra: 'A', texto: alternativaA },
            { letra: 'B', texto: alternativaB },
            { letra: 'C', texto: alternativaC },
            { letra: 'D', texto: alternativaD },
        ])
        setModalAberto(false)
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
                            onClick={() => setModalAberto(true) }   
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
                    {modalAberto && (
                            <div>
                                <h3>Alternativas</h3>
                                <input type="text"  
                                placeholder='Digite a alternativa A' 
                                value={alternativaA} onChange={(e) => 
                                setAlternativaA(e.target.value)} />
                                <button type='button' onClick={() =>setCorreta("A")}>certa</button>
                                
                                <input type="text"  
                                placeholder='Digite a alternativa B' 
                                value={alternativaB} onChange={(e) => 
                                setAlternativaB(e.target.value)} />
                                <button type='button' onClick={() =>setCorreta("B")}>certa</button>

                                <input type="text"  
                                placeholder='Digite a alternativa C' 
                                value={alternativaC} onChange={(e) => 
                                setAlternativaC(e.target.value)} />
                                <button type='button' onClick={() =>setCorreta("C")}>certa</button>

                                <input type="text"  
                                placeholder='Digite a alternativa D' 
                                value={alternativaD} onChange={(e) => 
                                setAlternativaD(e.target.value)} />
                                <button type='button' onClick={() =>setCorreta("D")}>certa</button>

                                <button type='button' onClick={confirmarAlternativas}>Confirmar</button>
                            </div>
                        )}
                </form>
            </main>
        </div>
    )
}
