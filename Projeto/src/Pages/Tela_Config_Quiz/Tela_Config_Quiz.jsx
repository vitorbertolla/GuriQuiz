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
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState("");
  const [numeroPerguntasSelecionadas, setNumeroPerguntasSelecionadas] =
    useState("");
  const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0);

    const materiasUnicas = Array.from(
    new Set((perguntas || []).map((p) => p.materia).filter(Boolean))
  );

  useEffect(() => {
    let filtradas = perguntas || [];

    if (materiaSelecionada.length > 0) {
      filtradas = filtradas.filter((p) => materiaSelecionada.includes(p.materia));
    }

    if (dificuldadeSelecionada) {
      filtradas = filtradas.filter((p) => p.dificuldade === dificuldadeSelecionada);
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
    <div>
      <div>
        <Link to="/menu">
            <button>EXIT</button>
        </Link>
      </div>
      <div>
        <h1>CONFIGURAÇÃO DO QUIZ</h1>
      </div>
      <div>
        <div>
          <label>Matérias:</label>
          <div>
            {materiasUnicas.map((materia) => (
              <label key={materia}>
                <input
                  type="checkbox"
                  checked={materiaSelecionada.includes(materia)}
                  onChange={() => handleMateriaChange(materia)}
                />
                {materia}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="Dificuldade">Dificuldade:</label>
          <select
            name="Dificuldade"
            id="Dificuldade"
            value={dificuldadeSelecionada}
            onChange={(e) => setDificuldadeSelecionada(e.target.value)}
          >
            <option value="">Selecione a dificuldade</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
        <div>
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
      <button onClick={handleJogar}>JOGAR</button>
    </div>
  );
}
