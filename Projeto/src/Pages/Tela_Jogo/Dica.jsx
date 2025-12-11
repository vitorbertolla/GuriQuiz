import { useState } from "react"                     // Importa useState (mesmo que não seja usado aqui)
import { GoogleGenerativeAI } from "@google/generative-ai"  // Importa a biblioteca da Google Gemini
import styles from './Dica.module.css'               // Importa os estilos do componente


// Função assíncrona que envia o prompt para a IA gerar uma dica
export async function enviarPrompt(pergunta, alternativas, setDica, setCarregando) {
        const apikey = import.meta.env.VITE_API_KEY  // Busca a API KEY do arquivo .env

        if (!pergunta) return;                       // Se não tiver pergunta, não faz nada

        setCarregando(true)                          // Ativa o estado "carregando"
        setDica("")                                   // Limpa a dica anterior

        try {
            const genAI = new GoogleGenerativeAI(apikey) // Inicializa o cliente da API Gemini
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) // Seleciona o modelo de IA

            // Envia o prompt pedindo para gerar uma dica curta
            const response = await model.generateContent(
                `Gere uma dica curta para a seguinte pergunta, não facilite tanto, mas de uma dica util: "${pergunta} essas alternativas ${alternativas} (de só a dica não fale mais nada) "  `
            )

            const texto = response.response.text()    // Extrai o texto gerado pela IA
            setDica(texto)                            // Salva a dica no estado

        } catch (error) {
            console.error("Erro ao gerar:", error)    // Exibe erro se a IA falhar
        } finally {
            setCarregando(false)                      // Finaliza o estado de carregamento
        }
}
