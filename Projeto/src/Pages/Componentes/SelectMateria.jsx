export default function SelectMateria({ materia, setMateria, className }) {
    const OPCOES_MATERIA = [
        { value: "matematica", label: "Matemática" },
        { value: "portugues", label: "Português" },
        { value: "fisica", label: "Física" },
        { value: "conhecimentos Gerais", label: "Conhecimentos Gerais" },
        { value: "biologia", label: "biologia" },
    ];

  return (
    <select
      className={className}
      value={materia}
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