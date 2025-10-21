import styles from './Tela_Cadastro.module.css'
import { useState, useEffect } from 'react'
import { auth } from "../../../../Back-End/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {registrarComEmail} from "../../../../Back-End/authentication";

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

    return (
        <div className={styles.container}>
            <div className={styles.bloco}>
                <h1 className={styles.title}>CADASTRO</h1>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>NICK</label>
                        <input className={styles.input} type="text" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>E-MAIL</label>
                        <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>SENHA</label>
                        <input className={styles.input} type="password" placeholder='SUA SENHA' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <input className={styles.input} type="password" placeholder='CONFIRME SUA SENHA' />
                    </div>
                    <div className={styles.actions}>
                        <button type="submit"><img className={styles.botao} src="/images/botaoCadastrar.png" alt="" onClick={() => registrarComEmail(email, senha)} /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}