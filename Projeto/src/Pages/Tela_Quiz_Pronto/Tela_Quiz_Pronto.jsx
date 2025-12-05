import { Link} from "react-router-dom";
import styles from "./Tela_Quiz_Pronto.module.css";
import Tela_ListaQuiz from "../Tela_Admin/Tela_ListaQuiz.jsx";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.js";
import {SearchQ, searchQuizz} from "../Componentes/Search.jsx";

export default function Tela_Quiz_Pronto() {
    const [quizzes, setQuizzes] = useState([]);
    const [quizzesSearch, setQuizzesSearch] = useState("");
    

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
            <h1 className={styles.titulo}>Quizzes Cadastrados ({quizzes.length})</h1>
            <SearchQ
                quizzesSearch={quizzesSearch}
                setQuizzesSearch={setQuizzesSearch}
              
            />

            <div className= {styles.quizescadastrados}>
                {searchQuizz(quizzesSearch, quizzes).map((q) => (
                    <div
                        key={q.id}
                        style={{ cursor: "pointer" }}
                    >
                        <Tela_ListaQuiz quiz={q} editar={false} id={q.id} />
                    </div>
                      ))}
            </div>
            </div>
    );
}
