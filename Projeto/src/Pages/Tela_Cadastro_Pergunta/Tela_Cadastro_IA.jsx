import { useState } from "react"
import './Tela_Cadastro_IA.module.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function IACria ({ setDescricao, setMostrarIACreate,setDificuldade, setMateria, materia, dificuldade, setCorreta, setAlternativas, setAlternativaA, setAlternativaB,setAlternativaC, setAlternativaD}){
    const [prompt, setPrompt] = useState("")
    const [resposta, setResposta] = useState("")
    const [carregando, setCarregando] = useState(false)
    const apikey = "AIzaSyAmLTtMthswzm5R4ER8ENHjl_93rtMQ_rQ"

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
            if (alternativas.length) {
                setAlternativas(alternativas)
              
                // também preenche os campos individuais
                const altA = alternativas.find(a => a.letra === 'A')?.texto || ''
                const altB = alternativas.find(a => a.letra === 'B')?.texto || ''
                const altC = alternativas.find(a => a.letra === 'C')?.texto || ''
                const altD = alternativas.find(a => a.letra === 'D')?.texto || ''
              
                setAlternativaA(altA)
                setAlternativaB(altB)
                setAlternativaC(altC)
                setAlternativaD(altD)
              }
          
          // Extrai a correta
          const corretaMatch = linhas.find(l => /^correta:/i.test(l))
          if (corretaMatch) {
            const letraCorreta = corretaMatch.replace(/correta:\s*/i, '').trim().toUpperCase()
            setCorreta(letraCorreta)
          }
          
        } catch (error) {
        console.error("Erro ao gerar:", error)
        } finally {
        setCarregando(false)
        }
    }



    return (
        <div className="ia-container">
        <h1 className="ia-title">Gerador de Perguntas</h1>
        <div className="ia-texto-botao">
            <div className="form-control">
            <input
                type="text"
                placeholder="Digite sua solicitação"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="ia-input"
            />
            <label>
                <p>solicitação</p>
            </label>
            </div>
            <select className="ia-select" value={dificuldade} onChange={(e) => setDificuldade(e.target.value)}>
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
            </select>
            <select className="ia-select" value={materia} onChange={(e) => setMateria(e.target.value)}>
                <option value="portugues">Português</option>
                <option value="matematica">Matemática</option>
                <option value="fisica">fisica</option>
                <option value="conhecimentos gerais">Conhecimentos Gerais</option>
            </select>

            <button
            disabled={!prompt || carregando}
            onClick={enviarPrompt}
            className="ia-button"
            >
            {carregando ? "Gerando..." : "Gerar"}
            </button>

            <button className="ia-concluir"
            onClick={() => {
                setMostrarIACreate(false)
            }}
            >
            Concluir
            </button>
        </div>

        {resposta && (
            <div className="ia-resposta">
            <p>{resposta}</p>
            </div>
        )}
        </div>
    )
}

  