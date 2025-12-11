// Importa estilos CSS específicos da tela de resultados
import styles from './Tela_Resultados.module.css'

// Hooks de navegação e leitura de parâmetros da URL
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// Importações do Firebase (Firestore e Auth)
import { db } from "../../services/firebaseConfig";
import { auth } from "../../services/firebaseConfig";
import { collection, addDoc, getDoc } from "firebase/firestore";

// Busca referência do documento do usuário no Firestore
import { getUserDocRef } from "../../services/authentication.js";

// Função do Firebase para atualizar o perfil (displayName)
import { updateProfile } from "firebase/auth";

export default function Tela_Resultados() {

  // Hook para acessar parâmetros da URL
  const [searchParams] = useSearchParams()

  // Hook para redirecionamento
  const navigate = useNavigate()

  // Hook para acessar dados enviados via state
  const location = useLocation()
  
  // Recebe quizId enviado pela tela anterior
  const quizId = location.state?.quizId;

  // Recebe nome do quiz da URL (?nome=)
  const nomeQuiz = searchParams.get('nome');  
  
  // Total de perguntas (fallback para 0 caso não exista)
  const total = parseInt(searchParams.get('total')) || 0

  // Lista completa dos resultados das perguntas
  const resultados = location.state?.resultados || []

  // Conta quantos acertos existem
  const acertos = resultados.filter(r => r.acertou).length 

  // Pontuação final do quiz
  const pontuacao = parseInt(searchParams.get('pontuacao')) || 0

  // Função que salva a pontuação no ranking do Firestore
  async function score() {

    // Pega usuário logado
    const user = auth.currentUser;

    // Impede salvar caso não esteja logado
    if (!user) {
      alert("Você precisa estar logado para salvar o resultado!");
      return;
    }
    
    try {

      // Cria nick com fallback padrão
      let nick = "Anônimo";

      // Primeira tentativa: pegar displayName
      if (user.displayName && user.displayName.trim()) {
        nick = user.displayName.trim();

      // Segunda tentativa: prefixo do e-mail
      } else if (user.email) {
        nick = user.email.split("@")[0];
      }

      // Terceira tentativa: buscar no Firestore o nick salvo no documento do usuário
      try {
        const userDocRef = getUserDocRef(user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const savedNick = userSnap.data()?.nick;

          // Se houver um nick válido salvo, substitui
          if (savedNick && String(savedNick).trim()) {
            nick = String(savedNick).trim();
          }
        }
      } catch (e) {
        console.warn("Não foi possível ler nick do documento de usuário:", e);
      }

      // Se o displayName não existia, tenta salvá-lo agora
      if (!user.displayName && nick && nick !== "Anônimo") {
        try { 
          await updateProfile(user, { displayName: nick }); 
        } catch(e) { /* ignore erro */ }
      }

      // Cria um novo documento na coleção "ranking"
      const ref = await addDoc(collection(db, "ranking"), {
        score: pontuacao,
        nomeQuiz: nomeQuiz || "Quiz sem nome", // Fallback caso o nome venha vazio
        userId: user.uid,
        quizId: quizId,
        nick: nick,
        timestamp: new Date() // Grava data e hora
      });
      
      alert("Resultado salvo com sucesso!");
      console.log("Documento adicionado com ID:", ref.id);

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar resultado: " + error.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>

        {/* Título da página */}
        <h1 className={styles.title}>RESULTADOS</h1>

        <div>
          {/* Exibição de acertos, score e nome do quiz */}
          <div className={styles.pontuacao}>
            <h3>ACERTOS: {acertos}{total ? ` / ${total}` : ''}</h3>
            <h3>SCORE: {pontuacao}</h3>
            {nomeQuiz && <h3>QUIZ: {nomeQuiz}</h3>}
          </div>

          {/* Lista das respostas (✓ ou ✗) */}
          <div className={styles.resultado}>
            <p>RESPOSTAS:</p>

            <div>
              {/* Caso não existam resultados */}
              {resultados.length === 0 && <p>Nenhum detalhe de respostas disponível.</p>}

              {/* Lista de cada pergunta com resultado */}
              {resultados.map((r, i) => (
                <div key={i} className={styles.resultItem}>
                  <p><strong>{i + 1}.</strong></p>
                  <p>{r.acertou ? '✓' : '✗'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className={styles.btnOverlay}>

            {/* Voltar ao menu */}
            <button onClick={() => navigate('/menu')} className={styles.btnMenu}>
              MENU
            </button>

            {/* Botão de salvar resultado só aparece se houver quizId */}
            {quizId && (
              <button onClick={score} className={styles.btnMenu}>
                Salvar Resultados
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
