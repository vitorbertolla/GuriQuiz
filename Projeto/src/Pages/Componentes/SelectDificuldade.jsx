export default function SelectDificuldade({ Dificuldade, setDificuldade}) {
    const OPCOES_DIFICULDADE = [
        { value: "facil", label: "Fácil" },
        { value: "medio", label: "Médio" },
        { value: "dificil", label: "Difícil" },
    ];

  return (
    <select
      value={Dificuldade}
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