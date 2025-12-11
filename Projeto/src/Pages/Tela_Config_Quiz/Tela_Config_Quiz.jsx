import styles from "./Tela_Config_Quiz.module.css";
import { useEffect, useState } from "react";
import { usePerguntas } from "../../services/crudPerguntas";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { buildQuizParams, paramsToQueryString } from "../../services/quizConfig";

// Tela que permite o usuário configurar um quiz personalizado
export default function Tela_Config_Quiz() {

  // Puxa todas as perguntas do banco (hook customizado)
  const { perguntas } = usePerguntas();

  // Para redirecionar para outra página
  const navigate = useNavigate();

  // Estados do filtro
  const [materiaSelecionada, setMateriaSelecionada] = useState([]);   // matérias escolhidas
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState([]); // dificuldades escolhidas
  const [numeroPerguntasSelecionadas, setNumeroPerguntasSelecionadas] = useState(""); // número digitado
  const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0); // total filtrado

  // Gera lista única de matérias
  const materiasUnicas = Array.from(
    new Set((perguntas || []).map((p) => p.materia).filter(Boolean))
  );

  // Gera lista única de dificuldades
  const dificuldadesUnicas = Array.from(
    new Set((perguntas || []).map((p) => p.dificuldade).filter(Boolean))
  );

  // Atualiza quantidade de perguntas disponíveis quando filtros mudam
  useEffect(() => {
    let filtradas = perguntas || [];

    // Filtra por matéria
    if (materiaSelecionada.length > 0) {
      filtradas = filtradas.filter((p) =>
        materiaSelecionada.includes(p.materia)
      );
    }

    // Filtra por dificuldade
    if (dificuldadeSelecionada.length > 0) {
      filtradas = filtradas.filter((p) =>
        dificuldadeSelecionada.includes(p.dificuldade)
      );
    }

    // Atualiza total
    setPerguntasDisponiveis(filtradas.length);
  }, [materiaSelecionada, dificuldadeSelecionada, perguntas]);

  // Adiciona/remove matéria do filtro
  const handleMateriaChange = (materia) => {
    setMateriaSelecionada((prev) => {
      if (prev.includes(materia)) {
        return prev.filter((m) => m !== materia);  // remove
      }
      return [...prev, materia]; // adiciona
    });
  };

  // Adiciona/remove dificuldade do filtro
  const handleDificuldadeChange = (dificuldade) => {
    setDificuldadeSelecionada((prev) => {
      if (prev.includes(dificuldade)) {
        return prev.filter((m) => m !== dificuldade); // remove
      }
      return [...prev, dificuldade]; // adiciona
    });
  };

  // Quando clicar em Jogar, monta a URL e redireciona
  const handleJogar = () => {
    try {
      // Cria parâmetros do quiz conforme filtros
      const params = buildQuizParams(
        materiaSelecionada,
        dificuldadeSelecionada,
        numeroPerguntasSelecionadas,
        perguntasDisponiveis
      );

      // Transforma params em query string
      const queryString = paramsToQueryString(params);

      // Vai para a tela do jogo
      navigate(`/jogo?${queryString}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.containerConfig}>
      <div className={styles.telaConfig}>

        {/* Botão de voltar para o menu */}
        <div className={styles.divBtnExit}>
          <Link to="/menu">
            <button className={styles.btnExit}>EXIT</button>
          </Link>
        </div>

        <div className={styles.containerTitle}>
          <h1 className={styles.tituloConfig}>CONFIGURAÇÃO DO QUIZ</h1>
        </div>

        {/* Seção dos filtros */}
        <div className={styles.opcoes}>

          {/* Filtro de matérias */}
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

          {/* Filtro de dificuldades */}
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

          {/* Número de perguntas */}
          <div className={styles.numeroPerguntas}>
            <label htmlFor="NumeroPerguntas">Número de Perguntas:</label>
            <input
              type="number"
              id="NumeroPerguntas"
              name="NumeroPerguntas"
              min="1"
              max={perguntasDisponiveis} // evita pedir mais perguntas do que existem
              value={numeroPerguntasSelecionadas}
              onChange={(e) => setNumeroPerguntasSelecionadas(e.target.value)}
              placeholder="Ex: 10"
            />
            <small>{perguntasDisponiveis} perguntas disponíveis</small>
          </div>
        </div>

        {/* Botão jogar */}
        <button onClick={handleJogar}>
          <img className={styles.btnJogar} src="/images/botaoJogar.png" alt="" />
        </button>

      </div>
    </div>
  );
}
