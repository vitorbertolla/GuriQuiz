import { useState } from "react" // Hook para gerenciar estados internos do componente
import './Tela_Cadastro_IA.module.css'
import { GoogleGenerativeAI } from "@google/generative-ai" // Biblioteca da API Gemini
import styles from './Tela_Cadastro_IA.module.css'
import SelectMateria from '../Componentes/SelectMateria.jsx' // Componente para selecionar matéria
import SelectDificuldade from '../Componentes/SelectDificuldade.jsx' // Componente para selecionar dificuldade

// Componente principal, recebe várias funções e estados do componente pai
export default function IACria({
    setDescricao,
    setMostrarIACreate,
    setDificuldade,
    setMateria,
    materia,
    dificuldade,
    setCorreta,
    setAlternativas,
    setAlternativaA,
    setAlternativaB,
    setAlternativaC,
    setAlternativaD
}) {
    const [prompt, setPrompt] = useState("") // Guarda a solicitação digitada
    const [resposta, setResposta] = useState("") // Guarda o texto gerado pela IA
    const [carregando, setCarregando] = useState(false) // Estado de loading
    const apikey = import.meta.env.VITE_API_KEY // Chave da API

    // Função que envia o prompt para a IA
    const enviarPrompt = async () => {
        if (!prompt) return; // evita envio vazio
        setCarregando(true)
        setResposta("")

        try {
            const genAI = new GoogleGenerativeAI(apikey) // Inicializa API Gemini
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) // Seleciona modelo

            // Prompt fixo + dados do usuário (prompt, matéria e dificuldade)
            const response = await model.generateContent(`
            Gere uma questão objetiva com:
            - Enunciado (pergunta)
            - 4 alternativas (A, B, C, D)
            - indique qual é a correta
            - Baseie-se nesta solicitação: ${prompt}
            - Dificuldade: ${dificuldade}
            - Matéria: ${materia}
            Formate a resposta exatamente assim:
            Pergunta: <texto>
            A) <texto>
            B) <texto>
            C) <texto>
            D) <texto>
            Correta: <letra>
          `)

            const texto = response.response.text() // Extrai texto cru
            setResposta(texto)

            // Quebra o texto em linhas e remove espaços extras
            const linhas = texto.split('\n').map(l => l.trim()).filter(l => l)

            // -------- Extrai o enunciado --------
            const perguntaMatch = linhas.find(l => l.toLowerCase().startsWith('pergunta:'))
            if (perguntaMatch) {
                setDescricao(perguntaMatch.replace(/pergunta:\s*/i, '')) // Remove "Pergunta:"
            }

            // -------- Extrai alternativas A, B, C e D --------
            const alternativas = linhas
                .filter(l => /^[ABCD]\)/i.test(l)) // linhas começando com A) B) C) D)
                .map(l => {
                    const letra = l[0].toUpperCase()
                    const textoAlt = l.slice(2).trim()
                    return { letra, texto: textoAlt }
                })

            let altA = '', altB = '', altC = '', altD = ''
            if (alternativas.length) {
                // Pega cada alternativa individualmente
                altA = alternativas.find(a => a.letra === 'A')?.texto || ''
                altB = alternativas.find(a => a.letra === 'B')?.texto || ''
                altC = alternativas.find(a => a.letra === 'C')?.texto || ''
                altD = alternativas.find(a => a.letra === 'D')?.texto || ''

                // Coloca nos campos individuais do formulário
                setAlternativaA(altA)
                setAlternativaB(altB)
                setAlternativaC(altC)
                setAlternativaD(altD)
            }

            // Atualiza lista geral usada para enviar ao banco
            setAlternativas([
                { letra: 'A', texto: altA },
                { letra: 'B', texto: altB },
                { letra: 'C', texto: altC },
                { letra: 'D', texto: altD },
            ])

            // -------- Extrai alternativa correta --------
            const corretaMatch = linhas.find(l => /^correta:/i.test(l))
            if (corretaMatch) {
                const letraCorreta = corretaMatch.replace(/correta:\s*/i, '').trim().toUpperCase()
                setCorreta(letraCorreta) // Define letra correta no pai
            }

            console.log("Alternativas:", altA, altB, altC, altD)
            console.log("Correta:", letraCorreta)

        } catch (error) {
            console.error("Erro ao gerar:", error) // Log de erro
        } finally {
            setCarregando(false) // Finaliza loading
        }
    }

    // -------- Layout do popup --------
    return (
        <div className={styles.overlayIa}> {/* fundo escuro */}
            <div className={styles.iaContainer}> {/* caixa central */}

                {/* Botão para fechar popup */}
                <button className={styles.btnX} onClick={() => setMostrarIACreate(false)}>X</button>    
                <h1 className={styles.iaTitle}>Gerador de Perguntas</h1>

                <div className={styles.iaTextoBotao}>

                    {/* Campo do prompt */}
                    <div className={styles.formControl}>
                        <input
                            type="text"
                            placeholder="Digite sua solicitação"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                            className={styles.iaInput}
                        />
                        <label><p>SOLICITAÇÃO</p></label>
                    </div>

                    {/* Selects de dificuldade e matéria */}
                    <SelectDificuldade
                        required
                        className={styles.iaSelect}
                        dificuldade={dificuldade}
                        setDificuldade={setDificuldade}
                    />
                    <SelectMateria
                        required
                        className={styles.iaSelect}
                        materia={materia}
                        setMateria={setMateria}
                    />

                    {/* Botões de gerar e concluir */}
                    <div className={styles.iaBotoes}>
                        <button
                            disabled={carregando}
                            onClick={() => {
                                if (materia === "" || dificuldade === "") {
                                    alert("Por favor, selecione a matéria e a dificuldade antes de concluir.")
                                    return
                                }
                                if (setDescricao === "") {
                                    alert("Por favor, insira uma solicitação válida.")
                                    return
                                }
                                enviarPrompt()
                            }}
                            className={styles.iaButton}
                        >
                            {carregando ? "Gerando" : "Gerar"}
                        </button>

                        <button
                            className={styles.iaConcluir}
                            onClick={() => setMostrarIACreate(false)}
                        >
                            Concluir
                        </button>
                    </div>
                </div>

                {/* Bloco com a resposta gerada */}
                {resposta && (
                    <div className={styles.iaResposta}>
                        <p>{resposta}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
