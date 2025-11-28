import React, { useState, useEffect } from "react";

import { Chart } from "react-google-charts";
import { db } from "../../services/firebaseConfig";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import styles from "./Tela_Ranking.module.css";

export default function Grafico({ quizSelecionado }) {
  const [data, setData] = useState([["Usuário", "Score"]]);

  useEffect(() => {
    async function carregarDados() {
      const rankingRef = collection(db, "ranking");
      let q;

      if (!quizSelecionado) {
        q = query(rankingRef, orderBy("score", "desc"), limit(10));
      } else {
        q = query(rankingRef, where("quizId", "==", quizSelecionado));
      }

      const snap = await getDocs(q);
      const chartData = [["Usuário", "Score", { role: "annotation" }]];

      snap.docs.forEach(doc => {
        const item = doc.data();
        chartData.push([item.nick || "Sem nome", item.score || 0, String(item.score || 0)]);
      });

      setData(chartData);
    }

    carregarDados();
  }, [quizSelecionado]);

  const options = {
    title: "Ranking do Quiz",
    chartArea: { width: "60%" },
    hAxis: { title: "Score" },
    colors: ["#2a2d74"],
    legend: { position: "none" },
  };

  return (
    <div className={styles.graficoContainer}>
      <h2 className={styles.graficoTitle}>Gráfico do Ranking</h2>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        className={styles.grafico}
      />
    </div>
  );
}
