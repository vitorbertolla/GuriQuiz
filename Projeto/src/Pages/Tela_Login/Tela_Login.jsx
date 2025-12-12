import styles from './Tela_Login.module.css'
import { useState, useEffect } from "react";
import { auth } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loginComEmail, loginComGoogle, logout } from "../../services/authentication";
import { useNavigate, Link } from 'react-router-dom'

export default function Tela_Login (){

  // Estados para armazenar email, senha e usuário logado
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState(null);

  // Hook do React Router para navegação
  const navigate = useNavigate()

  // Credenciais fixas para login de administrador
  const ADMEMAIL = "adm@guriquiz";
  const ADMSENHA = "adm123";

  // Verifica mudanças na autenticação quando a tela é montada
  useEffect(() => {
    logout() // Garante que ninguém esteja logado ao entrar na tela

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user); // Atualiza o estado com o usuário atual
      
      // Se existir usuário logado, redireciona conforme o tipo
      if (user) {
        if(user.email === ADMEMAIL){
          navigate('/admin'); // Admin
        } else {
          navigate('/start'); // Usuário comum
        }
      }
    });

    // Cleanup do listener
    return () => unsubscribe();
  }, []);

  // Login usando email e senha
  const handleLoginComEmail = async (e) => {
    e.preventDefault()

    // Caso for o administrador, faz login direto
    if(email === ADMEMAIL && senha === ADMSENHA) {
      navigate('/admin');
      return;
    }

    // Tenta logar pelo Firebase
    try {
      await loginComEmail(email, senha)
    } catch (err) {
      console.error('Login error:', err)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  // Login com conta Google
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

        {/* Formulário de login */}
        <form className={styles.form} onSubmit={handleLoginComEmail}>

          {/* Campo de email */}
          <div className={styles.field}>
            <label className={styles.label}>E-MAIL</label>
            <input 
              className={styles.input} 
              type="email"  
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder='SEU EMAIL'
            />
          </div>

          {/* Campo de senha */}
          <div className={styles.field}>
            <label className={styles.label}>SENHA</label>
            <input 
              className={styles.input} 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
              placeholder='SUA SENHA' 
            />
          </div>

          {/* Botões de ação */}
          <div className={styles.actions}>
            <button className={styles.botao} type="submit">
              <img className={styles.botao} src="/images/botaoEntrar.png" alt="" />
            </button>

            <button className={styles.botao} onClick={handleLoginGoogle} type="button">
              <img className={styles.botao} src="/images/googleAcessar.png" alt="" />
            </button>
          </div>
        </form>

        {/* Link para cadastro */}
        <p className={styles.loginLink}>
          Não tem uma conta? 
          <a>
            <Link to='/cadastrar'>
               Cadastro
            </Link>
          </a>
        </p>

      </div>
    </div>
  )
}
