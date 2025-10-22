import styles from './Tela_Login.module.css'
import React, { useState, useEffect } from "react";
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {loginComEmail, loginComGoogle,} from "../../services/authentication";
export default function Login (){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

        return(
            <div className={styles.container}>
                <div className={styles.bloco}>
                    <h1 className={styles.title}>LOGIN</h1>
                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label className={styles.label}>E-MAIL</label>
                            <input className={styles.input} type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>SENHA</label>
                            <input className={styles.input} type="password" placeholder='SUA SENHA' />
                        </div>
                    <div className={styles.actions}>
                        <button onClick={() => loginComEmail(email, senha)} type="submit"><img className={styles.botao} src="/images/botaoEntrar.png" alt="" /></button>
                        <button onClick={loginComGoogle} type="button"><img className={styles.botao} src="/images/googleAcessar.png" alt="" /></button>
                    </div>
                    </form>
                </div>
            </div>
        )
}