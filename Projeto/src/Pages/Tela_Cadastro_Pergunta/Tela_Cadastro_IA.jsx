import { useState } from "react"
import './Tela_Cadastro_IA.module.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function IACria ({ setDescricao, setMostrarIACreate}){
    const [prompt, setPrompt] = useState("")
    const [resposta, setResposta] = useState("")
    const [dificuldade, setDificuldade] = useState("")
    const [materia, setMateria] = useState("")
    const [carregando, setCarregando] = useState(false)
    const apikey = "AIzaSyAmLTtMthswzm5R4ER8ENHjl_93rtMQ_rQ"

    const enviarPrompt = async () => {
        if (!prompt) return;
        setCarregando(true)
        setResposta("")

        try {
        const genAI = new GoogleGenerativeAI(apikey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const response = await model.generateContent(
            `Gere uma pergunta com esssa solicitação: ${prompt} com esse nível de dificuldade: ${dificuldade} e dessa máteria: ${materia} (coloque apenas a pergunta)`
        )

        setResposta(response.response.text())
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
                setDescricao(resposta)
                setMostrarIACreate((prev) => !prev)
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

  