import styles from "./Tela_Config_Quiz.module.css";
import { useEffect, useState } from "react";
import { usePerguntas } from "../../services/crudPerguntas";
import { Link } from "react-router-dom";

export default function Tela_Config_Quiz() {
  const { perguntas } = usePerguntas();

  const [materiaSelecionada, setMateriaSelecionada] = useState([]);
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState("");
  const [numeroPerguntasSelecionadas, setNumeroPerguntasSelecionadas] =
    useState("");
  const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0);

  // cria lista de matérias únicas a partir de 'perguntas'
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
    const num = parseInt(numeroPerguntasSelecionadas, 10) || 0;

    if (materiaSelecionada.length === 0 || dificuldadeSelecionada.length === 0 || num === 0) {
      alert("Por favor, selecione todas as opções antes de jogar.");
      return;
    }

    if (num > perguntasDisponiveis) {
      alert(
        "Número de perguntas selecionadas excede o número disponível para as configurações escolhidas."
      );
      return;
    }

    console.log({
      materias: materiaSelecionada,
      dificuldade: dificuldadeSelecionada,
      numeroPerguntas: numeroPerguntasSelecionadas,
    });

    alert(
      `Quiz configurado com sucesso!\nMatérias: ${materiaSelecionada.join(
        ", "
      )}\nDificuldade: ${dificuldadeSelecionada}\nNúmero de Perguntas: ${numeroPerguntasSelecionadas}`
    );

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
