import { useState } from "react"
import './Tela_Cadastro_IA.module.css'
import { GoogleGenerativeAI } from "@google/generative-ai"
import styles from './Tela_Cadastro_IA.module.css'
import SelectMateria from '../Componentes/SelectMateria.jsx'
import SelectDificuldade from '../Componentes/SelectDificuldade.jsx'

export default function IACria({ setDescricao, setMostrarIACreate, setDificuldade, setMateria, materia, dificuldade, setCorreta, setAlternativas, setAlternativaA, setAlternativaB, setAlternativaC, setAlternativaD }) {
    const [prompt, setPrompt] = useState("")
    const [resposta, setResposta] = useState("")
    const [carregando, setCarregando] = useState(false)
    const apikey = import.meta.env.VITE_API_KEY

    const enviarPrompt = async () => {
        if (!prompt) return;
        setCarregando(true)
        setResposta("")

        try {
            const genAI = new GoogleGenerativeAI(apikey)
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
            const texto = response.response.text()
            setResposta(texto)

            // Divide as linhas e remove espaços extras
            const linhas = texto.split('\n').map(l => l.trim()).filter(l => l)

            // Extrai a pergunta
            const perguntaMatch = linhas.find(l => l.toLowerCase().startsWith('pergunta:'))
            if (perguntaMatch) {
                setDescricao(perguntaMatch.replace(/pergunta:\s*/i, ''))
            }

            // Extrai alternativas (A, B, C, D)
            const alternativas = linhas
                .filter(l => /^[ABCD]\)/i.test(l))
                .map(l => {
                    const letra = l[0].toUpperCase()
                    const textoAlt = l.slice(2).trim()
                    return { letra, texto: textoAlt }
                })
            let altA = '', altB = '', altC = '', altD = ''
            if (alternativas.length) {

                // preenche os campos individuais
                altA = alternativas.find(a => a.letra === 'A')?.texto || ''
                altB = alternativas.find(a => a.letra === 'B')?.texto || ''
                altC = alternativas.find(a => a.letra === 'C')?.texto || ''
                altD = alternativas.find(a => a.letra === 'D')?.texto || ''

                setAlternativaA(altA)
                setAlternativaB(altB)
                setAlternativaC(altC)
                setAlternativaD(altD)
            }
            setAlternativas([
                { letra: 'A', texto: altA },
                { letra: 'B', texto: altB },
                { letra: 'C', texto: altC },
                { letra: 'D', texto: altD },
            ])
            // Extrai a correta
            const corretaMatch = linhas.find(l => /^correta:/i.test(l))
            if (corretaMatch) {
                const letraCorreta = corretaMatch.replace(/correta:\s*/i, '').trim().toUpperCase()
                setCorreta(letraCorreta)
            }


            console.log("Alternativas:", altA, altB, altC, altD)
            console.log("Correta:", letraCorreta)

        } catch (error) {
            console.error("Erro ao gerar:", error)
        } finally {
            setCarregando(false)
        }
    }



    return (
        <div className={styles.overlayIa}>
            <div className={styles.iaContainer}>

                <button className={styles.btnX}onClick={() => setMostrarIACreate(false)}>X</button>    
                <h1 className={styles.iaTitle}>Gerador de Perguntas</h1>

                <div className={styles.iaTextoBotao}>

                    <div className={styles.formControl}>
                        <input
                            type="text"
                            placeholder="Digite sua solicitação"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                            className={styles.iaInput}
                        />
                        <label>
                            <p>SOLICITAÇÃO</p>
                        </label>
                    </div>

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
                    {resposta && (
                        <div className={styles.iaResposta}>
                            <p>{resposta}</p>
                        </div>
                    )}
            </div>
        </div>

    )
}

