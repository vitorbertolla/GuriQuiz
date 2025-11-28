import { Link, useNavigate } from "react-router-dom";
import styles from "./Tela_Quiz_Pronto.module.css";
import Tela_ListaQuiz from "../Tela_Admin/Tela_ListaQuiz.jsx";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.js";

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
        <div className={styles.container}>
            
            {/* BOTÃO EXIT */}
            <Link to="/menu" className={styles.exitContainer}>
                <img
                    className={styles.exitButton}
                    src="/images/botaoExit.png"
                    alt="Sair"
                />
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
