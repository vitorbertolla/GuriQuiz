import styles from './Tela_Cadastro.module.css'
import { useState, useEffect } from 'react'
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {registrarComEmail} from "../../services/authentication";
import { doc, query, setDoc, getDocs, where, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";



export default function Tela_Cadastro() {
    const [email, setEmail] = useState("");
    const [nick, setNick] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [alertSenhasDiferentes, setAlertSenhasDiferentes] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!passwordValidation()) return;

    console.log("Iniciando cadastro...", email, nick);

    //validação de senha
    if (senha !== confirmarSenha){
        setAlertSenhasDiferentes(true);
        console.log("Senhas diferentes");
        return;
    }

     // validação do nome
    const nickInDB = await nickValidation(nick);
        if (nickInDB) {
        alert("Esse nome de usuário já está em uso. Escolha outro.");
        return;
    }

    // validação do email
    const emailInDB = await emailValidation(email);
        if (emailInDB) {
        alert("Esse email de usuário já está em uso. Escolha outro.");
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

       await signOut(auth);
        navigate("/login")

        
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

const passwordValidation = () => {
    if(senha.length < 6){
        alert("A senha deve conter pelo menos 6 dígitos")
        return false
    }
    else{return true}
};

const nickValidation = async (nick) => {
    const nickRef = collection(db, "usuarios");
    const q = query(nickRef, where("nick", "==", nick))
    const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // retorna true se o nome já existe
};

const emailValidation = async (email) => {
    const emailRef = collection(db, "usuarios");
    const q = query(emailRef, where("email", "==", email))
    const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // retorna true se o email já existe
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
                        <button className={styles.botao}
                        type="submit">
                            <img className={styles.botao} 
                            src="/images/botaoCadastrar.png" 
                            alt="" 
                        /></button>
                    </div>
                </form>
                <p className={styles.loginLink}>Já tem uma conta? <a href="Login">Login</a></p>
            </div>
        </div>
    )
}