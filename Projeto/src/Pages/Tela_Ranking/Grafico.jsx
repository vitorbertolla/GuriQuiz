import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { db } from "../../services/firebaseConfig";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import styles from "./Tela_Ranking.module.css";

export default function Grafico() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [quizSelecionadoGrafico, setQuizSelecionadoGrafico] = useState("");
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // Carregar lista de quizzes disponíveis
  useEffect(() => {
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
        console.error("Erro ao carregar quizzes para o gráfico:", error);
      } finally {
        setLoadingQuizzes(false);
      }
    }

    carregarQuizzes();
  }, []);

  // Carregar dados do gráfico
  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);

        const rankingRef = collection(db, "ranking");
        let q;

        if (!quizSelecionadoGrafico || quizSelecionadoGrafico === "") {
          // Query simples: só ordena por score
          q = query(rankingRef, orderBy("score", "desc"), limit(10));
        } else {
          // Query com filtro: busca pelo quizId e ordena no código
          q = query(rankingRef, where("quizId", "==", quizSelecionadoGrafico));
        }

        const snap = await getDocs(q);

        // Se filtrado por quiz, ordena manualmente
        let docs = snap.docs;
        if (quizSelecionadoGrafico) {
          docs = docs
            .sort((a, b) => (b.data().score || 0) - (a.data().score || 0))
            .slice(0, 10);
        }

        const chartData = [["Usuário", "Score"]];

        if (docs.length > 0) {
          docs.forEach(doc => {
            const item = doc.data();
            chartData.push([
              item.nick || "Sem nome",
              Number(item.score) || 0
            ]);
          });
        } else {
          chartData.push(["Nenhum dado", 0]);
        }

        console.log("Dados do gráfico:", chartData);
        setData(chartData);

      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
        setData([["Usuário", "Score"], ["Erro", 0]]);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [quizSelecionadoGrafico]);

  if (loading) {
    return (
      <div className={styles.graficoContainer}>
        <p style={{ color: "white", textAlign: "center", padding: "20px" }}>
          Carregando gráfico...
        </p>
      </div>
    );
  }

  if (!data || data.length < 2) {
    return (
      <div className={styles.graficoContainer}>
        <p style={{ color: "white", textAlign: "center", padding: "20px" }}>
          Sem dados para exibir
        </p>
      </div>
    );
  }

  return (
    <div className={styles.graficoContainer}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "15px"
      }}>
        <h2 className={styles.graficoTitle} style={{ margin: 0 }}>
          🏆 Top Jogadores 🏆
        </h2>

        {/* Filtro independente do gráfico */}
        <div style={{ minWidth: "200px" }}>
          {loadingQuizzes ? (
            <span style={{ color: "white", fontSize: "14px" }}>Carregando...</span>
          ) : (
            <select
              value={quizSelecionadoGrafico}
              onChange={(e) => setQuizSelecionadoGrafico(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "2px solid #00d4ff",
                backgroundColor: "rgba(0, 20, 40, 0.8)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
                outline: "none"
              }}
            >
              <option value="">📊 Todos os quizzes</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.nome}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <Chart
        chartType="BarChart"
        width="100%"
        height="430px"
        data={data}
        options={{
          title: quizSelecionadoGrafico
            ? `⚡ ${quizzes.find(q => q.id === quizSelecionadoGrafico)?.nome || "Ranking"} ⚡`
            : "⚡ Ranking Geral ⚡",
          titleTextStyle: {
            color: "#7df9ff",
            fontSize: 24,
            bold: true,
          },
          backgroundColor: "transparent",
          chartArea: {
            width: "75%",
            height: "65%",
            backgroundColor: "rgba(255,255,255,0.04)",
          },
          hAxis: {
            title: "Pontuação",
            titleTextStyle: { fontSize: 16, bold: true, color: "#9be8ff" },
            textStyle: { fontSize: 14, color: "#c9f3ff" },
            minValue: 0,
            gridlines: { color: "rgba(255,255,255,0.1)" },
            baselineColor: "rgba(255,255,255,0.2)",
          },
          vAxis: {
            textStyle: { fontSize: 14, color: "#ffffff", bold: true },
          },
          colors: ["#00d4ff"],
          bar: { groupWidth: "70%" },
          legend: { position: "none" },
          animation: {
            startup: true,
            duration: 900,
            easing: "out",
          },
        }}
      />
    </div>
  );
}