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

export default function Tela_Ranking() {
  const [ranking, setRanking] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizSelecionado, setQuizSelecionado] = useState("");

  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [error, setError] = useState(null);

  // ========================
  // Carregar lista de quizzes (agora com nome)
  // ========================
  async function carregarQuizzes() {
    try {
      setLoadingQuizzes(true);

      const snap = await getDocs(collection(db, "ranking"));
      
      // Mapeia para objetos com id e nome
      const quizzesComNome = snap.docs
        .map((doc) => ({
          id: doc.data().quizId,
          nome: doc.data().nomeQuiz
        }))
        .filter((q) => q.id && q.nome); // Só inclui se tiver id E nome

      // Remove duplicados baseado no ID
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
  // Buscar ranking (geral ou filtrado)
  // ========================
  async function carregarRanking(quizId = "") {
    try {
      setLoadingRanking(true);
      setError(null);

      let q;

      if (quizId === "" || quizId === null) {
        // Ranking geral
        q = query(
          collection(db, "ranking"),
          orderBy("score", "desc"),
          limit(10)
        );
      } else {
        // Ranking filtrado por quiz - SEM orderBy para evitar índice
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

      // Se filtrou por quiz, ordena e limita no cliente
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

  // Carregar quizzes + ranking ao montar o componente
  useEffect(() => {
    carregarQuizzes();
    carregarRanking();
  }, []);

  // Atualizar ranking quando o quiz selecionado mudar
  useEffect(() => {
    carregarRanking(quizSelecionado);
  }, [quizSelecionado]);

  return (
    <div style={{ padding: "20px", maxWidth: 600 }}>
      <h1>Ranking</h1>

      {/* Exibir erros */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ===================== SELECT DE QUIZZES ===================== */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="quizSelect" style={{ marginRight: 8 }}>
          Filtrar por quiz:
        </label>

        {loadingQuizzes ? (
          <span>Carregando quizzes...</span>
        ) : (
          <select
            id="quizSelect"
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
      {loadingRanking ? (
        <p>Carregando ranking...</p>
      ) : ranking.length === 0 ? (
        <p>Nenhuma pontuação encontrada.</p>
      ) : (
        <div>
          {ranking.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: 6,
                borderBottom: "1px solid #ccc",
                fontFamily: "monospace",
              }}
            >
              {String(index + 1).padStart(2, "0")}.{" "}
              {item.nick?.padEnd(12, " ") ?? "—"} — {item.score ?? 0}
              {item.nomeQuiz && ` (${item.nomeQuiz})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}