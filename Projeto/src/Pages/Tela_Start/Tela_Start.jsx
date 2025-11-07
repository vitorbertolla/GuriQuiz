import styles from "./Tela_Start.module.css";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import { getUserDocRef } from "../../services/authentication.js";
import { auth } from "../../services/firebaseConfig"; 
import { Link } from "react-router-dom";

export default function Tela_Start() {
  const [nick, setNick] = useState("");

  useEffect(() => {
    const fetchUserNick = async () => {
      const user = auth.currentUser; // Obtenha o usuário atual
      if (user) { // Verifique se existe um usuário logado
        const userDocRef = getUserDocRef(user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          setNick(userSnapshot.data().nick);
        }
      }
    };
    fetchUserNick();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.telaStartHeader}>
        <div className={styles.jogador}>
          <img className={styles.iconeJogador} src="/images/iconeJogador.png" alt="Imagem jogador" />
          <h3 className={styles.nomeJogador}>
            {nick || "Jogador"}
          </h3>
        </div>
      </header>

      <main className={styles.containerPrincipal}>
        <section className={styles.telaStartSection}>
          <h3>
            <img className={styles.tituloPequeno} src="/images/jogarJuntos.png" alt="" />
          </h3>
          <h1>
            <img className={styles.tituloGuri} src="/images/tituloGuri.png" alt="" />
          </h1>
        </section>

        <section className={styles.botoesContainer}>
          <Link to="/menu">
          <button>
            <img className={styles.btnStart} src="/images/botaoStart.png" alt="" />
          </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
