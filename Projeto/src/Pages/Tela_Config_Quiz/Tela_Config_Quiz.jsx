import styles from "./Tela_Config_Quiz.module.css";
import { useEffect, useState } from "react";
import { usePerguntas } from "../../services/crudPerguntas";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { buildQuizParams, paramsToQueryString } from "../../services/quizConfig";

export default function Tela_Config_Quiz() {
  const { perguntas } = usePerguntas();
  const navigate = useNavigate();

  const [materiaSelecionada, setMateriaSelecionada] = useState([]);
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState([]);
  const [numeroPerguntasSelecionadas, setNumeroPerguntasSelecionadas] =
    useState("");
  const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0);

    const materiasUnicas = Array.from(
    new Set((perguntas || []).map((p) => p.materia).filter(Boolean))
  );
    const dificuldadesUnicas = Array.from(
    new Set((perguntas || []).map((p) => p.dificuldade).filter(Boolean))
  );

  useEffect(() => {
    let filtradas = perguntas || [];

    if (materiaSelecionada.length > 0) {
      filtradas = filtradas.filter((p) => materiaSelecionada.includes(p.materia));
    }

    if (dificuldadeSelecionada.length > 0) {
      filtradas = filtradas.filter((p) =>
      dificuldadeSelecionada.includes(p.dificuldade)
    );
  }

    setPerguntasDisponiveis(filtradas.length);
  }, [materiaSelecionada, dificuldadeSelecionada, perguntas]);

  const handleMateriaChange = (materia) => {
    setMateriaSelecionada((prev) => {
      if (prev.includes(materia)) {
        return prev.filter((m) => m !== materia);
      }
      return [...prev, materia];
    });
  };
  const handleDificuldadeChange = (dificuldade) => {
    setDificuldadeSelecionada((prev) => {
      if (prev.includes(dificuldade)) {
        return prev.filter((m) => m !== dificuldade);
      }
      return [...prev, dificuldade];
    });
  };

  const handleJogar = () => {
    try {
      const params = buildQuizParams(
        materiaSelecionada,
        dificuldadeSelecionada,
        numeroPerguntasSelecionadas,
        perguntasDisponiveis
      );

      const queryString = paramsToQueryString(params);
      navigate(`/jogo?${queryString}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.containerConfig}>
      <div className={styles.telaConfig}>
        <div className={styles.divBtnExit}>
          <Link to="/menu">
              <button className={styles.btnExit}>EXIT</button>
          </Link>
        </div>
        <div className={styles.containerTitle}>
          <h1 className={styles.tituloConfig}>CONFIGURAÇÃO DO QUIZ</h1>
        </div>
        <div className={styles.opcoes}>
          <div className={styles.materias}>
            <label>Matérias:</label>
            <div className={styles.opcoesMateria}>
              {materiasUnicas.map((materia) => (
                <label key={materia}>
                  <input
                    type="checkbox"
                    name="dificuldade"
                    checked={materiaSelecionada.includes(materia)}
                    onChange={() => handleMateriaChange(materia)}
                  />
                  {materia}
                </label>
              ))}
            </div>
          </div>
                          

          <div className={styles.dificuldade}>
            <label>Dificuldade:</label>
            <div className={styles.opcoesMateria}>
              {dificuldadesUnicas.map((dificuldade) => (
                <label key={dificuldade}>
                  <input
                    type="checkbox"
                    name="dificuldade"
                    checked={dificuldadeSelecionada.includes(dificuldade)}
                    onChange={() => handleDificuldadeChange(dificuldade)}
                  />
                  {dificuldade}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.numeroPerguntas}>
            <label htmlFor="NumeroPerguntas">Número de Perguntas:</label>
            <input
              type="number"
              id="NumeroPerguntas"
              name="NumeroPerguntas"
              min="1"
              max={perguntasDisponiveis}
              value={numeroPerguntasSelecionadas}
              onChange={(e) => setNumeroPerguntasSelecionadas(e.target.value)}
              placeholder="Ex: 10"
            />
            <small>{perguntasDisponiveis} perguntas disponíveis</small>
          </div>
        </div>
        <button onClick={handleJogar}><img className={styles.btnJogar} src="/images/botaoJogar.png" alt="" /></button>
      </div>
    </div>
  );
}
