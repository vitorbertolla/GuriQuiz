import { Link } from "react-router-dom";
import styles from "./Tela_Quiz_Pronto.module.css";
import Tela_ListaQuiz from '../Tela_Admin/Tela_ListaQuiz.jsx';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.js";
import { useNavigate } from "react-router-dom";

export default function Tela_Quiz_Pronto() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

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
            <Link to="/menu">
                <button><img className={styles['exit-button']} src="/images/botaoExit.png" alt="" ></img></button>
            </Link>
            <h1>Quizzes Cadastrados</h1>
            {quizzes.map((q) => (
                <div
                    key={q.id}
                    onClick={() => navigate(`/jogo?id=${q.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <Tela_ListaQuiz quiz={q} editar={false} />
                </div>
            ))}
        </div>
    );
}
