import styles from './Tela_Cadastro_Pergunta.module.css'
import IAcria from './Tela_Cadastro_IA.jsx'
import { useState } from 'react'
import {usePerguntas} from '../../services/crudPerguntas.js'
import SelectMateria from '../Componentes/SelectMateria.jsx'
import SelectDificuldade from '../Componentes/SelectDificuldade.jsx'
import { Link } from "react-router-dom";

export default function Tela_Cadastro_Pergunta({perguntaInicial, onClose, editar = false, adicionarPergunta: adicionarPerguntaProp, editarPergunta: editarPerguntaProp}) {
    // ... (Hooks e estados permanecem os mesmos)
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
    const [mostrarIACreate, setMostrarIACreate] = useState(false)

    function submit(e) {
        e.preventDefault()
        if ( descricao.trim() === "" || !dificuldade || !materia) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }
        
        // Garante que as alternativas estejam atualizadas antes de enviar
        const alternativasAtualizadas = [
            { letra: 'A', texto: alternativaA },
            { letra: 'B', texto: alternativaB },
            { letra: 'C', texto: alternativaC },
            { letra: 'D', texto: alternativaD },
        ]

        const dados = {
            descricao,
            dificuldade,
            materia,
            alternativas: alternativasAtualizadas,
            correta
        }
        if (editar && perguntaInicial) {
            editarPergunta(perguntaInicial.id, dados);
            alert('Pergunta editada com sucesso!');
        } else {
            adicionarPergunta(descricao, dificuldade, materia, alternativasAtualizadas, correta);
            alert('Pergunta cadastrada com sucesso!');
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
        if (alternativaA.trim() === "" || alternativaB.trim() === "" || alternativaC.trim() === "" || alternativaD.trim() === "") {
            alert('Por favor, preencha todas as alternativas antes de confirmar.');
            return;
        }else if (!correta) {
            alert('Por favor, selecione a alternativa correta antes de confirmar.');
            return;
        }
        setAlternativas([
            { letra: 'A', texto: alternativaA },
            { letra: 'B', texto: alternativaB },
            { letra: 'C', texto: alternativaC },
            { letra: 'D', texto: alternativaD },
        ])
        setModalAberto(false)
    }

    return (
        <div className={editar ? styles.containerEdit : styles.container}>
            <div className={styles['tela-cadastro-pergunta']}>
                <header className={styles['tela-cadastro-pergunta__header']}>
                    {!editar && (
                        <Link to="/menu" className={styles['tela-cadastro-pergunta__exit-link']}>
                            <button className={styles['tela-cadastro-pergunta__exit-button']}>
                                <img src="/images/botaoExit.png" alt="Sair" className={styles['exit-icon']} />
                            </button>
                        </Link>
                    )}
                    {!editar && (<h1 className={styles['tela-cadastro-pergunta__title']}>Cadastro de Perguntas</h1>)}
                    {editar && (<h1 className={styles['tela-cadastro-pergunta__title']}>Editar Pergunta</h1>)}
                </header>
                
                <main className={styles['tela-cadastro-pergunta__main']}>
                    <form
                        className={styles['tela-cadastro-pergunta__form']}
                        onSubmit={submit}
                    >
                        {/* LINHA PRINCIPAL - Pergunta e Seletores */}
                        <div className={styles['tela-cadastro-pergunta__form-row']}>
                            <input
                                className={styles['input-pergunta']}
                                type="text"
                                placeholder="PERGUNTA"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                            {/* Os componentes SelectMateria/Dificuldade devem aceitar uma prop 'className' e aplicá-la ao seu elemento raiz */}
                            <div className={styles['selects-wrapper']}>
                                <SelectDificuldade
                                    className={styles['form-select']}
                                    dificuldade={dificuldade}
                                    setDificuldade={setDificuldade}
                                />
                                <SelectMateria
                                    className={styles['form-select']}
                                    materia={materia}
                                    setMateria={setMateria}
                                />
                            </div>
                        </div>

                        {/* BOTÃO ALTERNATIVAS */}
                        <div className={styles['alternativas-btn-wrapper']}>
                            <button
                                type="button"
                                className={styles['btn-alternativas']}
                                onClick={() => {setModalAberto(true); setMostrarIACreate(false);}}
                            >
                                ALTERNATIVAS
                            </button>
                        </div>
            
                        {/* BOTÕES DE AÇÃO (Cadastro/Edição) */}
                        {!editar ? (
                            <div className={styles['buttons-low']}>
                                <button
                                    type="button"
                                    className={styles['btn-acao']}
                                    onClick={() => {setMostrarIACreate(prev => !prev); setModalAberto(false);}}
                                >
                                    Criar com IA
                                </button>
                                <button
                                    type="submit"
                                    className={styles['btn-acao']}
                                >
                                    CADASTRAR
                                </button>
                            </div>
                        ) : (
                            <div className={styles['buttons-edit']}>
                                <button 
                                    type="submit" 
                                    className={styles['btn-acao']}
                                >
                                    Salvar Alterações
                                </button>
                                <button 
                                    type="button" 
                                    onClick={onClose} 
                                    className={styles['btn-cancelar']}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}

                        {/* MODAL ALTERNATIVAS */}
                        {modalAberto && (
                            <div className={styles.overlayAlternativas}>
                                <div className={styles.alternativas}>
                                    <button onClick={() => setModalAberto(false)}>X</button>
                                    <h3>Configurar Alternativas</h3>
                                    {['A', 'B', 'C', 'D'].map((letra, index) => {
                                        const setAlternativa = [setAlternativaA, setAlternativaB, setAlternativaC, setAlternativaD][index];
                                        const alternativaValue = [alternativaA, alternativaB, alternativaC, alternativaD][index];
                                        const placeholder = `Digite a alternativa ${letra}`;
                                        
                                        return (
                                            <label key={letra} className={styles.alternativaItem}>
                                                <input
                                                    type="text"
                                                    placeholder={placeholder}
                                                    value={alternativaValue}
                                                    onChange={(e) => setAlternativa(e.target.value)}
                                                />
                                                <input
                                                    type="radio"
                                                    name="correta"
                                                    value={letra}
                                                    checked={correta === letra}
                                                    onChange={() => setCorreta(letra)}
                                                />
                                            </label>
                                        );
                                    })}
                                    <button className={styles.ModalConfirmar} type="button" onClick={confirmarAlternativas}>
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* COMPONENTE IA */}
                        {mostrarIACreate &&(
                            <div>
                                
                                <IAcria 
                                // ... (Props do IAcria permanecem as mesmas)
                                setDescricao={setDescricao}
                                setMostrarIACreate={setMostrarIACreate}
                                setDificuldade={setDificuldade} 
                                setMateria={setMateria}  
                                materia={materia}
                                dificuldade={dificuldade}
                                setCorreta={setCorreta}
                                setAlternativas={setAlternativas}
                                setAlternativaA={setAlternativaA}
                                setAlternativaB={setAlternativaB}
                                setAlternativaC={setAlternativaC}
                                setAlternativaD={setAlternativaD}
                                />
                            </div>
                        )}
                    </form>
                </main>
            </div>
        </div>
    )  
}