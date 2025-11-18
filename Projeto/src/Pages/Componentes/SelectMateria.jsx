export default function SelectMateria({ Materia, setMateria }) {
    const OPCOES_MATERIA = [
        { value: "matematica", label: "Matemática" },
        { value: "portugues", label: "Português" },
        { value: "fisica", label: "Física" },
        { value: "conhecimentosGerais", label: "Conhecimentos Gerais" },
    ];

  return (
    <select
      value={Materia}
      onChange={(e) => setMateria(e.target.value)}
    >
      <option value="">MATERIA</option>
      {OPCOES_MATERIA.map((opcao) => (
        <option key={opcao.value} value={opcao.value}>
          {opcao.label}
        </option>
      ))}
    </select>
  );
}