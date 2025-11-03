import ListaPerguntas from "./Tela_ListaPerguntas";
import { usePerguntas } from "../../services/crudPerguntas";

export default function Tela_Admin() {
  const { perguntas, removerPergunta, editarPergunta } = usePerguntas();

  return (
    <div>
    <h1>Perguntas cadastradas</h1>
      {perguntas.map((p) => (
        <ListaPerguntas
          key={p.id}
          pergunta={p}
          removerPergunta={removerPergunta}
          editarPergunta={editarPergunta}
        />
      ))}
    </div>
  );
}
