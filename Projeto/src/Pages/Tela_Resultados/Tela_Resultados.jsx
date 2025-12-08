import styles from './Tela_Resultados.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { db } from "../../services/firebaseConfig";
import { auth } from "../../services/firebaseConfig";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { getUserDocRef } from "../../services/authentication.js";
import { updateProfile } from "firebase/auth";

export default function Tela_Resultados() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const quizId = location.state?.quizId;
  const nomeQuiz = searchParams.get('nome');  
  
  const total = parseInt(searchParams.get('total')) || 0
  const resultados = location.state?.resultados || []
  const acertos = resultados.filter(r => r.acertou).length 
  const pontuacao = parseInt(searchParams.get('pontuacao')) || 0

  async function score() {
    if (!quizId) {
      alert("Para salvar o resultado é necessário jogar um quiz pronto!");
      return;
    }
    
    const user = auth.currentUser;
    if (!user) {
      alert("Você precisa estar logado para salvar o resultado!");
      return;
    }
    
    try {
      // determina nick com fallback e consulta no Firestore se houver
      let nick = "Anônimo";

      // tentativa 1: displayName
      if (user.displayName && user.displayName.trim()) {
        nick = user.displayName.trim();
      } else if (user.email) {
        // tentativa 2: prefixo do email
        nick = user.email.split("@")[0];
      }

      // tentativa 3: verificar documento do usuário no Firestore (campo 'nick')
      try {
        const userDocRef = getUserDocRef(user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const savedNick = userSnap.data()?.nick;
          if (savedNick && String(savedNick).trim()) {
            nick = String(savedNick).trim();
          }
        }
      } catch (e) {
        console.warn("Não foi possível ler nick do documento de usuário:", e);
      }

      if (!user.displayName && nick && nick !== "Anônimo") {
        try { await updateProfile(user, { displayName: nick }); } catch(e) { /* ignore */ }
      }

      const ref = await addDoc(collection(db, "ranking"), {
        score: pontuacao,
        nomeQuiz: nomeQuiz || "Quiz sem nome",
        userId: user.uid,
        quizId: quizId,
        nick: nick,
        timestamp: new Date()
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
        <h1 className={styles.title}>RESULTADOS</h1>
        <div>
          <div className={styles.pontuacao}>
            <h3>ACERTOS: {acertos}{total ? ` / ${total}` : ''}</h3>
            <h3>SCORE: {pontuacao}</h3>
            {nomeQuiz && <h3>QUIZ: {nomeQuiz}</h3>}
          </div>
          <div className={styles.resultado}>
            <p>RESPOSTAS:</p>
            <div>
              {resultados.length === 0 && <p>Nenhum detalhe de respostas disponível.</p>}
              {resultados.map((r, i) => (
                <div key={i} className={styles.resultItem}>
                  <p><strong>{i + 1}.</strong></p>
                  <p>{r.acertou ? '✓' : '✗'}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.btnOverlay}>
            <button onClick={() => navigate('/menu')} className={styles.btnMenu}>
              MENU
            </button>
            <button onClick={score} className={styles.btnMenu}>
              Salvar Resultados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}