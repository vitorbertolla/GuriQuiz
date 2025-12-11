// Importa React e os hooks useState e useEffect
import React, { useState, useEffect } from "react";

// Importa componentes do Recharts para criar o gráfico
import {
  ResponsiveContainer,  // deixa o gráfico responsivo
  BarChart,             // estrutura principal de gráfico de barras
  Bar,                  // representa as barras
  XAxis,                // eixo X
  YAxis,                // eixo Y
  CartesianGrid,        // grade de fundo
  Tooltip,              // tooltip ao passar o mouse
  LabelList,            // números no topo das barras (ranking)
} from "recharts";

// Importa a instância configurada do Firebase (Firestore)
import { db } from "../../services/firebaseConfig";

// Importa funções do Firestore para buscar coleções e documentos
import { collection, getDocs } from "firebase/firestore";

// Importa estilos específicos da tela
import styles from "./Tela_Ranking.module.css";

export default function Grafico() {
  // Guarda os dados já preparados para o gráfico
  const [data, setData] = useState([]);

  // Loading do gráfico
  const [loading, setLoading] = useState(true);

  // Lista de quizzes únicos obtidos da collection ranking
  const [quizzes, setQuizzes] = useState([]);

  // Quiz selecionado no dropdown
  const [quizSelecionadoGrafico, setQuizSelecionadoGrafico] = useState("");

  // Loading somente da lista de quizzes
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // ---------------------------------------------
  // 1° useEffect — Carrega somente a lista de quizzes únicos
  // ---------------------------------------------
  useEffect(() => {
    let mounted = true; // controla desmontagem

    async function carregarQuizzes() {
      try {
        setLoadingQuizzes(true);

        // Busca todos os registros da collection "ranking"
        const snap = await getDocs(collection(db, "ranking"));

        // Pega quizId e nomeQuiz de cada registro
        const quizzesComNome = snap.docs
          .map((doc) => {
            const d = doc.data() || {};
            return { id: d.quizId, nome: d.nomeQuiz };
          })
          .filter((q) => q.id && q.nome); // remove inválidos

        // Remove duplicados com Map
        const unicos = Array.from(
          new Map(quizzesComNome.map((q) => [q.id, q])).values()
        );

        if (!mounted) return;
        setQuizzes(unicos);
      } catch (error) {
        console.error("Erro ao carregar quizzes:", error);
      } finally {
        if (mounted) setLoadingQuizzes(false);
      }
    }

    carregarQuizzes();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------------------------------------------
  // 2° useEffect — Carrega os dados do gráfico sempre que um quiz é selecionado
  // ---------------------------------------------
  useEffect(() => {
    let mounted = true;

    async function carregarDados() {
      try {
        setLoading(true);

        // Busca todo o ranking novamente
        const snap = await getDocs(collection(db, "ranking"));

        // Formata os dados crus vindos do Firebase
        let items = snap.docs.map((doc) => {
          const d = doc.data() || {};

          return {
            id: doc.id,
            usuario: (d.nick && String(d.nick).trim()) || "Anônimo",
            score: Number(d.score) || 0,
            quizId: d.quizId || null,
            createdAt: d.createdAt || null,
          };
        });

        // Se um quiz foi selecionado no filtro, filtra por quizId
        if (quizSelecionadoGrafico) {
          items = items.filter((it) => it.quizId === quizSelecionadoGrafico);
        }

        // Ordena por score desc e desempata por data
        items.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;

          const at =
            a.createdAt && typeof a.createdAt.toMillis === "function"
              ? a.createdAt.toMillis()
              : a.createdAt;

          const bt =
            b.createdAt && typeof b.createdAt.toMillis === "function"
              ? b.createdAt.toMillis()
              : b.createdAt;

          if (bt != null && at != null) return bt - at;

          return 0;
        });

        // Mantém somente o TOP 10
        items = items.slice(0, 10);

        // Cores das barras
        const colors = [
          "#FFD700", "#C0C0C0", "#CD7F32",
          "#00d4ff", "#7df9ff", "#9be8ff",
          "#b8f1ff", "#d6f9ff", "#e6fbff",
          "#f5fdff",
        ];

        // Converte dados para o formato do gráfico
        const chartData = items.map((item, index) => ({
          usuario: item.usuario,
          score: item.score,
          fill: colors[Math.min(index, colors.length - 1)],
          rank: index + 1,
        }));

        if (mounted) {
          // Caso não tenha dados
          if (chartData.length === 0) {
            setData([{ usuario: "Nenhum dado", score: 0, fill: "#cccccc", rank: 0 }]);
          } else {
            setData(chartData);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);

        if (mounted) {
          setData([{ usuario: "Erro ao carregar", score: 0, fill: "#ff6b6b", rank: 0 }]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    carregarDados();
    return () => {
      mounted = false;
    };
  }, [quizSelecionadoGrafico]); // depende do filtro

  // ---------------------------------------------
  // Tooltip personalizado ao passar o mouse
  // ---------------------------------------------
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;

      return (
        <div
          style={{
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 6 }}>{p.usuario}</div>
          <div>
            Pontuação: <span style={{ fontWeight: "bold" }}>{p.score}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // ---------------------------------------------
  // Tela de loading para o gráfico
  // ---------------------------------------------
  if (loading) {
    return (
      <div className={styles.graficoContainer}>
        <div style={{ color: "white", padding: 20 }}>⏳ Carregando gráfico...</div>
      </div>
    );
  }

  // Define o título do gráfico
  const tituloGrafico = quizSelecionadoGrafico
    ? quizzes.find((q) => q.id === quizSelecionadoGrafico)?.nome || "Ranking"
    : "Ranking Geral";

  return (
    <div className={styles.graficoContainer}>
      <h2 className={styles.graficoTitle}>{tituloGrafico}</h2>

      {/* Dropdown de seleção de quiz */}
      <div style={{ width: 300, marginBottom: 16 }}>
        {loadingQuizzes ? (
          <div style={{ color: "#fff" }}>Carregando quizzes...</div>
        ) : (
          <select
            value={quizSelecionadoGrafico}
            onChange={(e) => setQuizSelecionadoGrafico(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 8 }}
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

      {/* Gráfico */}
      <div style={{ width: "100%", height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="rgba(255,255,255,0.08)"
            />
            <XAxis
              dataKey="usuario"
              angle={-40}
              textAnchor="end"
              height={80}
              tick={{ fill: "#fff", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#fff", fontSize: 8 }} />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#00d4ff">
              <LabelList dataKey="rank" position="top" formatter={(val) => `#${val}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rodapé informando quantidade exibida */}
      <div
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.6)",
          marginTop: 8,
        }}
      >
        {data.length === 1 && data[0].usuario === "Nenhum dado"
          ? "Nenhum registro encontrado"
          : `Mostrando ${data.length} ${
              data.length === 1 ? "jogador" : "jogadores"
            }`}
      </div>
    </div>
  );
}
