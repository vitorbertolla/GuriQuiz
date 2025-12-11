// Importa o arquivo CSS específico da tela
import styles from './Tela_Cadastro.module.css'

// Importa hooks do React
import { useState, useEffect } from 'react'

// Importa a instância de autenticação do Firebase
import { auth } from "../../services/firebaseConfig";

// Importa função que observa mudanças no login do usuário
import { onAuthStateChanged } from "firebase/auth";

// Função personalizada que faz o cadastro com email e senha
import {registrarComEmail} from "../../services/authentication";

// Importa funções do Firestore para criar e buscar documentos
import { doc, query, setDoc, getDocs, where, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

// Hook para mudar de página
import { useNavigate } from "react-router-dom";

// Função para deslogar o usuário
import { signOut } from "firebase/auth";



// Componente principal da página de cadastro
export default function Tela_Cadastro() {

    // Estados controlando o formulário
    const [email, setEmail] = useState("");
    const [nick, setNick] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [usuario, setUsuario] = useState(null);

    // Mostra mensagem de aviso caso as senhas não sejam iguais
    const [alertSenhasDiferentes, setAlertSenhasDiferentes] = useState(false);

    // Navegação de páginas
    const navigate = useNavigate();

    // Observa mudanças de autenticação (ex: usuário logado)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUsuario(user); // salva o usuário logado no estado
        });

        return () => unsubscribe(); // limpa observador ao desmontar o componente
    }, []);




    // Função chamada ao enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // evita o reload da página

        // Checa se senha tem 6+ caracteres
        if(!passwordValidation()) return;

        console.log("Iniciando cadastro...", email, nick);

        // Verifica se as senhas são iguais
        if (senha !== confirmarSenha){
            setAlertSenhasDiferentes(true);
            console.log("Senhas diferentes");
            return;
        }

        // Validação do nick: verifica se já existe no DB
        const nickInDB = await nickValidation(nick);
        if (nickInDB) {
            alert("Esse nome de usuário já está em uso. Escolha outro.");
            return;
        }

        // Validação do email: verifica se já existe no DB
        const emailInDB = await emailValidation(email);
        if (emailInDB) {
            alert("Esse email de usuário já está em uso. Escolha outro.");
            return;
        }

        try {
            // Registra o usuário no Authentication
            const userCredential = await registrarComEmail(email, senha, nick);

            // Recupera UID do Firebase Auth
            const uid = userCredential.user.uid;

            // Cria documento no Firestore com os dados do usuário
            await setDoc(doc(db, "users", uid), {
                nick: nick,
                email: email,
                criadoEm: new Date()
            });

            // Faz logout do usuário depois do cadastro
            await signOut(auth);

            // Manda para a página de login
            navigate("/login")

            // Limpa o formulário depois do cadastro
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




    // Função para validar tamanho da senha
    const passwordValidation = () => {
        if(senha.length < 6){
            alert("A senha deve conter pelo menos 6 dígitos")
            return false
        }
        else{return true}
    };



    // Validação do nick no banco
    const nickValidation = async (nick) => {
        const nickRef = collection(db, "usuarios");
        const q = query(nickRef, where("nick", "==", nick))
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty; // true se o nick já existe
    };

    // Validação do email no banco
    const emailValidation = async (email) => {
        const emailRef = collection(db, "usuarios");
        const q = query(emailRef, where("email", "==", email))
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty; // true se o email já existe
    };




    return (
        <div className={styles.container}>
            <div className={styles.bloco}>

                <h1 className={styles.title}>CADASTRO</h1>

                {/* Formulário de cadastro */}
                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Campo Nick */}
                    <div className={styles.field}>
                        <label className={styles.label}>NICK</label>
                        <input
                            required
                            className={styles.input}
                            type="text"
                            value={nick}
                            onChange={(e) => setNick(e.target.value)}
                        />
                    </div>

                    {/* Campo Email */}
                    <div className={styles.field}>
                        <label className={styles.label}>E-MAIL</label>
                        <input
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Campo Senha e confirmação */}
                    <div className={styles.field}>
                        <label className={styles.label}>SENHA</label>

                        <input
                            className={styles.input}
                            required
                            type="password"
                            placeholder='SUA SENHA'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <input
                            className={styles.input}
                            required
                            type="password"
                            placeholder='CONFIRME SUA SENHA'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />

                        {/* Apenas exibe se as senhas forem diferentes */}
                        {alertSenhasDiferentes && (
                            <span className={styles.alert}>As senhas não coincidem!</span>
                        )}
                    </div>

                    {/* Botão cadastrar */}
                    <div className={styles.actions}>
                        <button
                            className={styles.botao}
                            type="submit"
                        >
                            <img
                                className={styles.botao}
                                src="/images/botaoCadastrar.png"
                                alt=""
                            />
                        </button>
                    </div>

                </form>

                {/* Link para login */}
                <p className={styles.loginLink}>
                    Já tem uma conta? <a href="Login">Login</a>
                </p>

            </div>
        </div>
    )
}
