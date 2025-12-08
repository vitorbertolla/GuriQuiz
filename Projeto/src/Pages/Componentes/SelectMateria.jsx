export default function SelectMateria({ materia, setMateria, className }) {
    const OPCOES_MATERIA = [

  { value: "matematica", label: "Matemática" },
  { value: "portugues", label: "Português" },
  { value: "fisica", label: "Física" },
  { value: "quimica", label: "Química" },
  { value: "biologia", label: "Biologia" },
  { value: "historia", label: "História" },
  { value: "geografia", label: "Geografia" },
  { value: "filosofia", label: "Filosofia" },
  { value: "sociologia", label: "Sociologia" },
  { value: "informatica", label: "Informática" },
  { value: "conhecimentos_gerais", label: "Conhecimentos Gerais" }


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