// Importa hooks do React para estado e efeitos colaterais
import { useState, useEffect } from "react";

// Importa Link para navegação entre rotas
import { Link } from 'react-router-dom';

// Importa funções do Firestore para consultas
import {
  collection,   // referencia uma coleção do banco
  query,        // cria uma query personalizada
  where,        // cria filtros
  orderBy,      // ordena resultados
  limit,        // limita quantidade de docs
  getDocs       // obtém documentos de uma query
} from "firebase/firestore";

// Importa instância configurada do Firestore
import { db } from "../../services/firebaseConfig";

// Importa estilos da tela
import styles from "./Tela_Ranking.module.css";

// Importa o componente do gráfico
import Grafico from "./Grafico.jsx";

export default function Tela_Ranking() {
  // Guarda o ranking carregado do Firebase
  const [ranking, setRanking] = useState([]);

  // Lista de quizzes disponíveis (extraídos do ranking)
  const [quizzes, setQuizzes] = useState([]);

  // Quiz selecionado pelo usuário
  const [quizSelecionado, setQuizSelecionado] = useState("");

  // Estados de loading
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // Guarda erros
  const [error, setError] = useState(null);

 
  // ================= CARREGA LISTA DE QUIZZES ======================
  async function carregarQuizzes() {
    try {
      setLoadingQuizzes(true);

      // Busca todos os documentos da coleção "ranking"
      const snap = await getDocs(collection(db, "ranking"));
      
      // Extrai quizId e nomeQuiz de cada registro
      const quizzesComNome = snap.docs
        .map((doc) => ({
          id: doc.data().quizId,
          nome: doc.data().nomeQuiz
        }))
        .filter((q) => q.id && q.nome); // Mantém somente válidos

      // Remove duplicados usando Map
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

  // ================= CARREGA RANKING ======================
  async function carregarRanking(quizId = "") {
    try {
      setLoadingRanking(true);
      setError(null);

      let q;

      // Se nenhum quiz for selecionado → pega TOP 10 geral
      if (!quizId) {
        q = query(
          collection(db, "ranking"),
          orderBy("score", "desc"),
          limit(10)
        );
      } 
      // Se um quiz foi selecionado → busca apenas ele
      else {
        q = query(
          collection(db, "ranking"),
          where("quizId", "==", quizId)
        );
      }

      // Executa a query
      const snap = await getDocs(q);

      // Converte documentos em objetos JS
      let dados = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Se filtrou por quiz → ordena manualmente e limita a 10
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

  // Carrega quizzes e ranking geral ao abrir a tela
  useEffect(() => {
    carregarQuizzes();
    carregarRanking();
  }, []);

  // Recarrega o ranking quando o usuário muda o quiz no select
  useEffect(() => {
    carregarRanking(quizSelecionado);
  }, [quizSelecionado]);


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        
        {/* Botão de voltar ao menu */}
        <Link to ="/menu">
          <button className={styles.btnX}>X</button>
        </Link>

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
          {/* Mostra erros se existir */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* loading, vazio ou lista */}
          {loadingRanking ? (
            <p>Carregando ranking...</p>
          ) : ranking.length === 0 ? (
            <p>Nenhuma pontuação encontrada.</p>
          ) : (
            ranking.map((item, index) => (
              <div key={item.id} className={styles.resultItem}>
                {/* posição + nome + score + nome do quiz */}
                {String(index + 1).padStart(2, "0")}. {item.nick?.padEnd(12, " ") ?? "—"} — {item.score ?? 0}
                {item.nomeQuiz && ` (${item.nomeQuiz})`}
              </div>
            ))
          )}
        </div>

        {/* Componente gráfico recebendo o quiz selecionado */}
        <Grafico quizSelecionado={quizSelecionado}/> 

        {/* Botão Menu */}
        <button
          className={styles.btnMenu}
          onClick={() => window.location.href = "/menu"}
        >
          Menu
        </button>

      </div>
    </div>
  );
}
