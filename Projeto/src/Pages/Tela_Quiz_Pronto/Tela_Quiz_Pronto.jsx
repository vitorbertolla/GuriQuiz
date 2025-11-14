import { Link } from "react-router-dom";
import styles from "./Tela_Quiz_Pronto.module.css";
import Tela_ListaQuiz from '../Tela_Admin/Tela_ListaQuiz.jsx';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.js";

export default function Tela_Quiz_Pronto() {
    const [quizzes, setQuizzes] = useState([]);
    const [crudQuiz, setCrudQuiz] = useState(false);

     useEffect(() => {
        async function carregarQuizzes() {
            const ref = collection(db, "quizzes"); 
            const snapshot = await getDocs(ref);

            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setQuizzes(lista);
        }

        carregarQuizzes();
    }, []);
    return (
        <div>
            <h1>Selecione um Quiz</h1>

            <button onClick={() => setCrudQuiz(prev => !prev)}>
                Jogos
            </button>

            {crudQuiz && (
                <>
                    <h1>Quizzes Cadastrados</h1>
                    {quizzes.map((q) => (
                        <Tela_ListaQuiz
                            key={q.id}
                            quiz={q}
                            editar={false}
                            
                        />
                    ))}
                    
                </>
            )}
        </div>
    );
}
