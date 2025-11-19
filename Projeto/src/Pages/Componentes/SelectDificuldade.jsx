export default function SelectDificuldade({ dificuldade, setDificuldade, className}) {
    const OPCOES_DIFICULDADE = [
        { value: "facil", label: "Fácil" },
        { value: "medio", label: "Médio" },
        { value: "dificil", label: "Difícil" },
    ];

  return (
    <select
    className={className}
      value={dificuldade}
      onChange={(e) => setDificuldade(e.target.value)}
    >
      <option value="">Dificuldade</option>
      {OPCOES_DIFICULDADE.map((opcao) => (
        <option key={opcao.value} value={opcao.value}>
          {opcao.label}
        </option>
      ))}
    </select>
  );
}