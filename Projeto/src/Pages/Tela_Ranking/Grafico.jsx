import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { db } from "../../services/firebaseConfig";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import styles from "./Tela_Ranking.module.css";

export default function Grafico({ quizSelecionado }) {
  const [data, setData] = useState([["Usuário", "Score", { role: "annotation" }]]);

  useEffect(() => {
    async function carregarDados() {
      const rankingRef = collection(db, "ranking");
      let q;

      if (!quizSelecionado) {
        q = query(rankingRef, orderBy("score", "desc"), limit(10));
      } else {
        q = query(rankingRef, where("quizId", "==", quizSelecionado), orderBy("score", "desc"));
      }

      const snap = await getDocs(q);
      const chartData = [["Usuário", "Score", { role: "annotation" }]];

      snap.docs.forEach(doc => {
        const item = doc.data();
        chartData.push([
          item.nick || "Sem nome",
          item.score || 0,
          String(item.score || 0)
        ]);
      });

      setData(chartData);
    }

    carregarDados();
  }, [quizSelecionado]);

  const options = {
    title: "⚡ Ranking do Quiz ⚡",
    titleTextStyle: {
      color: "#7df9ff",
      fontSize: 28,
      bold: true,
      italic: true,
    },

    backgroundColor: "transparent",

    chartArea: {
      width: "75%",
      backgroundColor: "rgba(255,255,255,0.04)",
    },

    hAxis: {
      title: "Pontuação",
      titleTextStyle: { fontSize: 16, bold: true, color: "#9be8ff" },
      textStyle: { fontSize: 14, color: "#c9f3ff" },
      gridlines: { color: "rgba(255,255,255,0.1)" },
      baselineColor: "rgba(255,255,255,0.2)",
    },

    vAxis: {
      textStyle: { fontSize: 14, color: "#ffffff", bold: true },
    },

    annotations: {
      textStyle: {
        fontSize: 14,
        color: "#ffffff",
        bold: true,
      },
    },

    // 🎨 Cores neon mais impactantes
    colors: ["#00d4ff"],

    // Efeito de barra mais grossa visualmente
    bar: { groupWidth: "70%" },

    legend: "none",

    tooltip: {
      textStyle: { fontSize: 14, color: "#000" },
      isHtml: true,
    },

    animation: {
      startup: true,
      duration: 900,
      easing: "out",
    },
  };

  return (
    <div className={styles.graficoContainer}>
      <h2 className={styles.graficoTitle}>🏆 Top Jogadores 🏆</h2>

      <Chart
        chartType="BarChart"
        width="100%"
        height="430px"
        data={data}
        options={options}
        className={styles.grafico}
      />
    </div>
  );
}
