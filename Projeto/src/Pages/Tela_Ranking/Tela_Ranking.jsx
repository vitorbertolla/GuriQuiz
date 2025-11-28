import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import styles from "./Tela_Ranking.module.css";
import Grafico from "./Grafico.jsx";

export default function Tela_Ranking() {
  const [ranking, setRanking] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizSelecionado, setQuizSelecionado] = useState("");

  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [error, setError] = useState(null);

  // ========================
  // Carregar lista de quizzes
  // ========================
  async function carregarQuizzes() {
    try {
      setLoadingQuizzes(true);

      const snap = await getDocs(collection(db, "ranking"));
      
      const quizzesComNome = snap.docs
        .map((doc) => ({
          id: doc.data().quizId,
          nome: doc.data().nomeQuiz
        }))
        .filter((q) => q.id && q.nome);

      const unicos = Array.from(
        new Map(quizzesComNome.map(q => [q.id, q])).values()
      );

      setQuizzes(unicos);
    } catch (error) {
      console.error("Erro ao carregar quizzes:", error);
      setError("Erro ao carregar quizzes.");
    } finally {
      setLoadingQuizzes(false);
    }
  }

  // ========================
  // Carregar ranking
  // ========================
  async function carregarRanking(quizId = "") {
    try {
      setLoadingRanking(true);
      setError(null);

      let q;

      if (!quizId) {
        q = query(
          collection(db, "ranking"),
          orderBy("score", "desc"),
          limit(10)
        );
      } else {
        q = query(
          collection(db, "ranking"),
          where("quizId", "==", quizId)
        );
      }

      const snap = await getDocs(q);

      let dados = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (quizId) {
        dados = dados
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, 10);
      }

      setRanking(dados);
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
      setError("Erro ao carregar ranking: " + error.message);
      setRanking([]);
    } finally {
      setLoadingRanking(false);
    }
  }

  useEffect(() => {
    carregarQuizzes();
    carregarRanking();
  }, []);

  useEffect(() => {
    carregarRanking(quizSelecionado);
  }, [quizSelecionado]);


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Ranking</h1>

        {/* ===================== SELECT DE QUIZZES ===================== */}
        <div className={styles.btnOverlay}>
          {loadingQuizzes ? (
            <span>Carregando quizzes...</span>
          ) : (
            <select
              value={quizSelecionado}
              onChange={(e) => setQuizSelecionado(e.target.value)}
            >
              <option value="">Todos os quizzes</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.nome}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ===================== LISTA DE RANKING ===================== */}
        <div className={styles.resultado}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {loadingRanking ? (
            <p>Carregando ranking...</p>
          ) : ranking.length === 0 ? (
            <p>Nenhuma pontuação encontrada.</p>
          ) : (
            ranking.map((item, index) => (
              <div key={item.id} className={styles.resultItem}>
                {String(index + 1).padStart(2, "0")}. {item.nick?.padEnd(12, " ") ?? "—"} — {item.score ?? 0}
                {item.nomeQuiz && ` (${item.nomeQuiz})`}
              </div>
            ))
          )}
        </div>
        {/* ===================== GRÁFICO ===================== */}
        <Grafico quizSelecionado={quizSelecionado}/> 


        <button className={styles.btnMenu} onClick={() => window.location.href = "/"}>
          Menu
        </button>

      </div>
    </div>
  );
}
