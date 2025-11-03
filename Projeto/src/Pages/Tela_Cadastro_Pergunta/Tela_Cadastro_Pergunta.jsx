import styles from './Tela_Cadastro_Pergunta.module.css'
import { useState } from 'react'
import {usePerguntas} from '../../services/crudPerguntas'

export default function Tela_Cadastro_Pergunta({perguntaInicial, onClose, editar = false, adicionarPergunta: adicionarPerguntaProp, editarPergunta: editarPerguntaProp}) {
    // preferir funções passadas pelo pai (quando o componente for usado como modal dentro da lista, para edição, garantindo assim que os componentes pais atualizem a lista)
    // caso contrário, usar o hook de perguntas (quando o componente for usado como página independente para cadastro)
    const hooks = usePerguntas()
    const adicionarPergunta = adicionarPerguntaProp || hooks.adicionarPergunta
    const editarPergunta = editarPerguntaProp || hooks.editarPergunta
    const [descricao, setDescricao] = useState(perguntaInicial?.descricao || '');
    const [dificuldade, setDificuldade] = useState(perguntaInicial?.dificuldade || '');
    const [materia, setMateria] = useState(perguntaInicial?.materia || '');
    const [alternativas, setAlternativas] = useState(perguntaInicial?.alternativas || []);
    const [correta, setCorreta] = useState(perguntaInicial?.correta || ''); 
    const [alternativaA, setAlternativaA] = useState(perguntaInicial?.alternativas?.[0]?.texto || '')
    const [alternativaB, setAlternativaB] = useState(perguntaInicial?.alternativas?.[1]?.texto || '')
    const [alternativaC, setAlternativaC] = useState(perguntaInicial?.alternativas?.[2]?.texto || '')
    const [alternativaD, setAlternativaD] = useState(perguntaInicial?.alternativas?.[3]?.texto || '')
    const [modalAberto, setModalAberto] = useState(false) 

    function submit(e) {
        e.preventDefault()
        if (!descricao || !dificuldade || !materia || !alternativas ) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }
        if (alternativas.some(a => !a.texto || a.texto.trim() === '')) {
            alert('Adicione todas as alternativas antes de cadastrar a pergunta.')
            return
        }
        if (!correta) {
            alert('Selecione a alternativa correta.')
            return
        }
        const dados = {
            descricao,
            dificuldade,
            materia,
            alternativas,
            correta
            }
        if (editar && perguntaInicial) {
            editarPergunta(perguntaInicial.id, dados);
          } else {
            adicionarPergunta(descricao, dificuldade, materia, alternativas, correta);
          }
      
          onClose?.();
        // Resetar os campos após o cadastro
        setDescricao('')
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
                {!editar && (<button className={styles['tela-cadastro-pergunta__exit-button']}>Exit</button>)}
                <h1 className={styles['tela-cadastro-pergunta__title']}>{editar?"Edição de Perguntas" : "Cadastro de Pergunta"}</h1>
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
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
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
                            <option value="fisica">Física</option>
                            <option value="conhecimentosGerais">Conhecimentos Gerais</option>
                        </select>

                        <button
                            type="button"
                            className={`${styles['tela-cadastro-pergunta__button']} ${styles['tela-cadastro-pergunta__button--alternativas']}`}
                            onClick={() => setModalAberto(true) }   
                        >
                            Alternativas
                        </button>

                        
                    </div>
                    {!editar &&(
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
                    )}
                    {editar && (
                        <div>
                            <button type="submit" className={styles['tela-cadastro-pergunta__button']}>
                                Salvar Alterações
                            </button>
                            <button type="button" onClick={onClose} className={styles['tela-cadastro-pergunta__button--cancel']}>
                            Cancelar
                            </button>
                        </div>
                    )}
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
