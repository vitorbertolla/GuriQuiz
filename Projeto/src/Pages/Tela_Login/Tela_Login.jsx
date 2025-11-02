import styles from './Tela_Login.module.css'
import { useState, useEffect } from "react";
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loginComEmail, loginComGoogle, logout } from "../../services/authentication";
import { useNavigate } from 'react-router-dom'
export default function Tela_Login (){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      if (user) {
        navigate("/start")
      } 
    });
    return () => unsubscribe();
  }, []);

  const handleLoginComEmail = async (e) => {
    e.preventDefault()
    try {
      await loginComEmail(email, senha)
    } catch (err) {
      console.error('Login error:', err)
      const code = err?.code || ''

      if (code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        alert('Email ou senha incorretos. Por favor, verifique suas credenciais.')
      } else if (code === 'auth/invalid-email') {
        alert('Formato de email inválido.')
      } else if (code === 'auth/too-many-requests') {
        alert('Muitas tentativas incorretas. Por favor, tente novamente mais tarde.')
      } else if (code === 'auth/user-disabled') {
        alert('Conta desativada. Contate o suporte.')
      } else {
        alert('Erro ao fazer login: ' + (err?.message || 'Erro desconhecido'))
      }
    }
  }

  const handleLoginGoogle = async () => {
    try { 
        await loginComGoogle()
    } catch (err) {
        console.log(err)
         alert('Erro ao entrar com o Google');
    }
  }

        return(
            <div className={styles.container}>
                <div className={styles.bloco}>
                    <h1 className={styles.title}>LOGIN</h1>
                    <form className={styles.form} onSubmit={handleLoginComEmail}>
                        <div className={styles.field}>
                            <label className={styles.label}>E-MAIL</label>
                            <input className={styles.input} type="email"  value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='SEU EMAIL'/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>SENHA</label>
                            <input className={styles.input} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder='SUA SENHA' />
                        </div>
                    <div className={styles.actions}>
                        <button type="submit">
                            <img className={styles.botao} src="/images/botaoEntrar.png" alt="" />
                        </button>
                        <button onClick={handleLoginGoogle} type="button">
                            <img className={styles.botao} src="/images/googleAcessar.png" alt="" />
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        )
}