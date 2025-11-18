import SelectMateria from './SelectMateria.jsx';
import SelectDificuldade from './SelectDificuldade.jsx';
import { useState } from 'react';

export default function Teste() {
    const [Materia, setMateria] = useState("");
    const [Dificuldade, setDificuldade] = useState("");
    return (
        <div>
            <SelectMateria
                Materia={Materia}
                setMateria={setMateria}
            />
            <SelectDificuldade
                Dificuldade={Dificuldade}
                setDificuldade={setDificuldade}
            />
        </div>
    )
}