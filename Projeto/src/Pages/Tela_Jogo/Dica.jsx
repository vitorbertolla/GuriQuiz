    import { useState } from "react"
    import { GoogleGenerativeAI } from "@google/generative-ai"
    import styles from './Dica.module.css'


    export async function enviarPrompt(pergunta, alternativas, setDica, setCarregando) {
            const apikey = import.meta.env.VITE_API_KEY
            if (!pergunta) return;
            setCarregando(true)
            setDica("")

            try {
                const genAI = new GoogleGenerativeAI(apikey)
                const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

                const response = await model.generateContent(`Gere uma dica curta para a seguinte pergunta, não facilite tanto, mas de uma dica util: "${pergunta} essas alternativas ${alternativas} (de só a dica não fale mais nada) "  `)
                const texto = response.response.text()
                    setDica(texto)


            } catch (error) {
                console.error("Erro ao gerar:", error)
            } finally {
                setCarregando(false)
            }
        }



