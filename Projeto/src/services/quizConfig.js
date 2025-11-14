/**
 * Valida e constrói os parâmetros do quiz
 * @param {string[]} materias - Array de matérias selecionadas
 * @param {string} dificuldade - Dificuldade selecionada (Fácil, Médio, Difícil)
 * @param {number} numeroPerguntas - Número de perguntas desejadas
 * @param {number} disponiveis - Número de perguntas disponíveis (padrão: Infinity)
 * @returns {object} Objeto com os parâmetros validados do quiz
 * @throws {Error} Lança erro se alguma validação falhar
 */
export function buildQuizParams(materias, dificuldade, numeroPerguntas, disponiveis = Infinity) {
  // Converte materias para array se necessário
  const materiasArr = Array.isArray(materias) ? materias : (materias ? [materias] : []);
  const numero = Number(numeroPerguntas) || 0;

  // Validações
  if (materiasArr.length === 0) {
    throw new Error("Selecione ao menos uma matéria.");
  }

  if (!dificuldade || dificuldade.trim() === "") {
    throw new Error("Selecione a dificuldade.");
  }

  if (numero <= 0) {
    throw new Error("Informe um número válido de perguntas.");
  }

  if (numero > disponiveis) {
    throw new Error(`Número de perguntas selecionadas (${numero}) excede as disponíveis (${disponiveis}).`);
  }

  return {
    materias: materiasArr,
    dificuldade,
    numeroPerguntas: numero,
  };
}

/**
 * Converte os parâmetros do quiz em uma query string
 * @param {object} params - Objeto com os parâmetros do quiz
 * @returns {string} Query string formatada
 */
export function paramsToQueryString(params) {
  const queryParams = new URLSearchParams({
    materias: params.materias.join(','),
    dificuldade: params.dificuldade,
    numeroPerguntas: params.numeroPerguntas,
  });

  return queryParams.toString();
}

/**
 * Converte uma query string em parâmetros do quiz
 * @param {string} queryString - Query string da URL
 * @returns {object} Objeto com os parâmetros do quiz
 */
export function queryStringToParams(queryString) {
  const params = new URLSearchParams(queryString);

  return {
    materias: params.get('materias')?.split(',') || [],
    dificuldade: params.get('dificuldade') || '',
    numeroPerguntas: parseInt(params.get('numeroPerguntas')) || 0,
  };
}