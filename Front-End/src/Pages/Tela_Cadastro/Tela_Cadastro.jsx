import styles from './Tela_Cadastro.module.css'
import { useState, useEffect } from 'react'
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {registrarComEmail} from "../../services/authentication";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [nick, setNick] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [alertSenhasDiferentes, setAlertSenhasDiferentes] = useState(false);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Iniciando cadastro...", email, nick);

    if (senha !== confirmarSenha){
        setAlertSenhasDiferentes(true);
        console.log("Senhas diferentes");
        return;
    }

    try {
        const userCredential = await registrarComEmail(email, senha, nick);

        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
            nick: nick,
            email: email,
            criadoEm: new Date()
        });

        alert(`Bem-vindo, ${nick}!`);

        setNick("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setAlertSenhasDiferentes(false);

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar usuário.");
    }
};


    return (
        <div className={styles.container}>
            <div className={styles.bloco}>
                <h1 className={styles.title}>CADASTRO</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>NICK</label>
                        <input required className={styles.input} type="text" value={nick} onChange={(e) => setNick(e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>E-MAIL</label>
                        <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>SENHA</label>
                        <input className={styles.input} required type="password" placeholder='SUA SENHA' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <input className={styles.input} required type="password" placeholder='CONFIRME SUA SENHA' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        {alertSenhasDiferentes && <span className={styles.alert}>As senhas não coincidem!</span>}
                    </div>
                    <div className={styles.actions}>
                        <button type="submit"><img className={styles.botao} src="/images/botaoCadastrar.png" alt="" /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}