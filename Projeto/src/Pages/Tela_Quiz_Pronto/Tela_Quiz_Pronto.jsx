import { Link} from "react-router-dom";
import styles from "./Tela_Quiz_Pronto.module.css";
import Tela_ListaQuiz from "../Tela_Admin/Tela_ListaQuiz.jsx";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.js";
import {SearchQ, searchQuizz} from "../Componentes/Search.jsx";

export default function Tela_Quiz_Pronto() {

    // Estado que guarda todos os quizzes carregados do banco
    const [quizzes, setQuizzes] = useState([]);

    // Estado para armazenar o texto digitado na barra de busca
    const [quizzesSearch, setQuizzesSearch] = useState("");
    
    // Carrega os quizzes do Firestore quando o componente inicia
    useEffect(() => {
        async function carregarQuizzes() {
            // Referência para a coleção "quizzes"
            const ref = collection(db, "quizzes");
            const snapshot = await getDocs(ref);

            // Transforma cada documento em objeto JS incluindo o ID
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Salva no estado
            setQuizzes(lista);
        }

        carregarQuizzes();
    }, []);

    return (
        <div className={styles.container}>
            
            {/* BOTÃO EXIT (voltar ao menu) */}
            <Link to="/menu" className={styles.exitContainer}>
                <img
                    className={styles.exitButton}
                    src="/images/botaoExit.png"
                    alt="Sair"
                />
            </Link>

            {/* Título e quantidade total de quizzes */}
            <h1 className={styles.titulo}>Quizzes Cadastrados ({quizzes.length})</h1>

            {/* Componente de busca */}
            <SearchQ
                quizzesSearch={quizzesSearch}
                setQuizzesSearch={setQuizzesSearch}
            />

            {/* Lista de quizzes filtrados */}
            <div className= {styles.quizescadastrados}>
                {searchQuizz(quizzesSearch, quizzes).map((q) => (
                    <div
                        key={q.id}
                        style={{ cursor: "pointer" }}
                    >
                        {/* Renderiza cada quiz usando o componente da lista */}
                        <Tela_ListaQuiz quiz={q} editar={false} id={q.id} />
                    </div>
                ))}
            </div>

        </div>
    );
}
