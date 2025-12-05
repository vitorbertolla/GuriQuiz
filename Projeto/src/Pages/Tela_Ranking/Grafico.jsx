import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../services/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import styles from "./Tela_Ranking.module.css";

export default function Grafico() {
  const [data, setData] = useState([]);
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
            nome: doc.data().nomeQuiz,
          }))
          .filter((q) => q.id && q.nome);

        const unicos = Array.from(
          new Map(quizzesComNome.map((q) => [q.id, q])).values()
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
          q = query(rankingRef, orderBy("score", "desc"), limit(10));
        } else {
          q = query(rankingRef, where("quizId", "==", quizSelecionadoGrafico));
        }

        const snap = await getDocs(q);

        let docs = snap.docs;
        if (quizSelecionadoGrafico) {
          docs = docs
            .sort((a, b) => (b.data().score || 0) - (a.data().score || 0))
            .slice(0, 10);
        }

        const chartData = docs.map((doc, index) => {
          const item = doc.data();
          // Cores gradiente baseadas na posição
          const colors = [
            "#FFD700", // Ouro - 1º lugar
            "#C0C0C0", // Prata - 2º lugar
            "#CD7F32", // Bronze - 3º lugar
            "#00d4ff",
            "#7df9ff",
            "#9be8ff",
            "#b8f1ff",
            "#d6f9ff",
            "#e6fbff",
            "#f5fdff",
          ];

          return {
            usuario: item.nick || "Sem nome",
            score: Number(item.score) || 0,
            fill: colors[Math.min(index, colors.length - 1)],
            rank: index + 1,
          };
        });

        // Se não houver dados, exibe uma mensagem
        if (chartData.length === 0) {
          chartData.push({
            usuario: "Nenhum dado",
            score: 0,
            fill: "#cccccc",
            rank: 0,
          });
        }

        setData(chartData);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
        setData([
          {
            usuario: "Erro ao carregar",
            score: 0,
            fill: "#ff6b6b",
            rank: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [quizSelecionadoGrafico]);

  // Componente de tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(0, 20, 40, 0.95)",
            border: "2px solid #00d4ff",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            minWidth: "200px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "center",
              borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
              paddingBottom: "8px",
            }}
          >
            {payload[0].payload.usuario}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: payload[0].payload.fill,
                border: "2px solid white",
              }}
            />
            <p
              style={{
                margin: 0,
                color: "#00d4ff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Pontuação:{" "}
              <span style={{ color: "#fff", fontSize: "20px" }}>
                {payload[0].value}
              </span>
            </p>
          </div>
          {payload[0].payload.rank > 0 && (
            <p
              style={{
                margin: "10px 0 0 0",
                color: "#FFD700",
                fontSize: "14px",
                textAlign: "center",
                padding: "5px 10px",
                background: "rgba(255, 215, 0, 0.1)",
                borderRadius: "20px",
                display: "inline-block",
              }}
            >
              #{payload[0].payload.rank}º Lugar
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Componente de legendas personalizado
  const CustomLegend = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#FFD700",
            borderRadius: "4px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "14px" }}>1º Lugar</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#C0C0C0",
            borderRadius: "4px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "14px" }}>2º Lugar</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#CD7F32",
            borderRadius: "4px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "14px" }}>3º Lugar</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#00d4ff",
            borderRadius: "4px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "14px" }}>Outros</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.graficoContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255, 255, 255, 0.2)",
              borderTop: "4px solid #00d4ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "18px",
              opacity: 0.8,
            }}
          >
            Carregando gráfico...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.graficoContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            gap: "15px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              opacity: 0.5,
            }}
          >
            📊
          </div>
          <p
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "18px",
              opacity: 0.7,
            }}
          >
            Sem dados para exibir
          </p>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Selecione outro quiz ou tente novamente
          </p>
        </div>
      </div>
    );
  }

  const tituloGrafico = quizSelecionadoGrafico
    ? `⚡ ${
        quizzes.find((q) => q.id === quizSelecionadoGrafico)?.nome || "Ranking"
      } ⚡`
    : "⚡ Ranking Geral ⚡";

  return (
    <div className={styles.graficoContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <h2
          className={styles.graficoTitle}
          style={{
            margin: 0,
            background: "linear-gradient(90deg, #00d4ff, #7df9ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "28px",
            fontWeight: "bold",
            textShadow: "0 2px 10px rgba(0, 212, 255, 0.3)",
          }}
        >
          {tituloGrafico}
        </h2>

        {/* Filtro de quizzes */}
        <div style={{ minWidth: "220px", position: "relative" }}>
          {loadingQuizzes ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
              }}
            >
              <span>Carregando...</span>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <select
                value={quizSelecionadoGrafico}
                onChange={(e) => setQuizSelecionadoGrafico(e.target.value)}
                style={{
                  padding: "12px 16px",
                  paddingLeft: "45px",
                  borderRadius: "12px",
                  border: "2px solid #2a2d74",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#2a2d74",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                  outline: "none",
                  transition: "all 0.3s ease",
                  appearance: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                <option value="" style={{ fontWeight: "bold" }}>
                  📊 Todos os quizzes
                </option>
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    🎯 {quiz.nome}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#2a2d74",
                }}
              >
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ width: "100%", height: "420px", position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: window.innerWidth < 700 ? 40 : 70, // margem menor no mobile
            }}
            barSize={window.innerWidth < 700 ? 25 : 40}
            barGap={window.innerWidth < 700 ? 4 : 8}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255, 255, 255, 0.15)"
              vertical={false}
            />
            <XAxis
              dataKey="usuario"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{
                fill: "#ffffff",
                fontSize: 13,
                fontWeight: "bold",
              }}
              tickLine={false}
              axisLine={{
                stroke: "rgba(255, 255, 255, 0.3)",
                strokeWidth: 2,
              }}
            />
            <YAxis
              tick={{
                fill: "#c9f3ff",
                fontSize: 13,
                fontWeight: "bold",
              }}
              axisLine={{
                stroke: "rgba(255, 255, 255, 0.3)",
                strokeWidth: 2,
              }}
              tickLine={false}
              gridLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(255, 255, 255, 0.05)",
                radius: 8,
              }}
            />
            <Bar
              dataKey="score"
              name="Pontuação"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          {data.length === 1 && data[0].usuario === "Nenhum dado"
            ? "Nenhum registro encontrado"
            : `Mostrando ${data.length} jogadores`}
        </div>
      </div>

      <CustomLegend />
    </div>
  );
}
