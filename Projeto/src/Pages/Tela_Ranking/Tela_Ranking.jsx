import styles from './Tela_Ranking.module.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

export default function Tela_Ranking() {

    const [ranking, setRanking] = useState([]);

    async function buscarRanking() {
        const q = query(
            collection(db, "ranking"),
            orderBy("score", "desc"),
            limit(10)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setRanking(data);   // <- CORREÇÃO AQUI
    }

    useEffect(() => {
        buscarRanking();
    }, []);

    return (
        <div>
            <h1>Ranking</h1>

            {ranking.length === 0 && <p>Carregando ranking...</p>}

            {ranking.map((item, i) => (
                <div key={item.id}>
                    {String(i + 1).padStart(2, "0")}. {item.nome} — {item.score}
                </div>
            ))}
        </div>
    );
}
