// Importa os estilos CSS específicos deste componente
import styles from "./Tela_Start.module.css";
// Importa hooks do React para efeitos colaterais e gerenciamento de estado
import { useEffect, useState } from "react";
// Importa função do Firestore para buscar documentos
import { getDoc } from "firebase/firestore";
// Importa funções personalizadas para autenticação e referência de documentos do usuário
import { getUserDocRef, logout } from "../../services/authentication.js";
// Importa a instância de autenticação do Firebase
import { auth } from "../../services/firebaseConfig"; 
// Importa componente Link para navegação entre rotas
import { Link } from "react-router-dom";
// Importa hook para navegação programática
import { useNavigate } from "react-router-dom";


export default function Tela_Start() {
  // Hook para navegar programaticamente entre rotas
  const navigate = useNavigate();
  
  // Estado para armazenar o nickname do usuário
  const [nick, setNick] = useState("");
  
  // Estado para controlar a visibilidade do modal de logout
  const [modal, setModal] = useState(false);
  
  // Função assíncrona para realizar logout
  const handleLogout = async () => {
    // Chama a função de logout do serviço de autenticação
    await logout();
    // Redireciona o usuário para a página inicial após logout
    navigate("/");   
  };

  // Effect hook que executa quando o componente é montado
  useEffect(() => {
    // Função assíncrona para buscar o nickname do usuário no Firestore
    const fetchUserNick = async () => {
      // Obtenha o usuário atualmente autenticado
      const user = auth.currentUser;
      
      // Verifique se existe um usuário logado
      if (user) {
        // Obtém a referência do documento do usuário no Firestore
        const userDocRef = getUserDocRef(user.uid);
        
        // Busca o documento do usuário
        const userSnapshot = await getDoc(userDocRef);
        
        // Verifica se o documento existe
        if (userSnapshot.exists()) {
          // Atualiza o estado com o nickname do usuário
          setNick(userSnapshot.data().nick);
        }
      }
    };
    
    // Executa a função de busca
    fetchUserNick();
  }, []); // Array vazio significa que executa apenas uma vez na montagem

  return (
    <div className={styles.container}>
      {/* Botão que abre o modal quando clicado */}
      <button onClick={() => setModal(true)}>
          {/* Header da tela com informações do jogador */}
          <header className={styles.telaStartHeader}>
          <div className={styles.jogador}>
            {/* Ícone do jogador */}
            <img className={styles.iconeJogador} src="/images/iconeJogador.png" alt="Imagem jogador" />
            
            {/* Nome do jogador - exibe o nick ou "Jogador" como fallback */}
            <h3 className={styles.nomeJogador}>
              {nick || "Jogador"}
            </h3>
          </div>
        </header>
      </button>
      
        {/* Renderização condicional do modal - só aparece se modal for true */}
        {modal && (
          <div className={styles.modalLogout}>
            <div className={styles.modalBox}>

              {/* Exibe o nickname do usuário no modal */}
              <h3 className={styles.modalNick}>
                {nick || "Jogador"}
              </h3>

              {/* Container dos botões do modal */}
              <div className={styles.modalButtons}>
                {/* Botão para executar logout */}
                <button className={styles.btnSair} onClick={handleLogout}>
                  Logout  
                </button>

                {/* Botão para fechar o modal sem fazer logout */}
                <button className={styles.btnCancelar} onClick={() => setModal(false)}>
                  Cancelar
                </button>
              </div>

            </div>
          </div>
        )}

    
      {/* Conteúdo principal da tela */}
      <main className={styles.containerPrincipal}>
        {/* Seção com os títulos/logos do jogo */}
        <section className={styles.telaStartSection}>
          <h3>
            {/* Título pequeno "Jogar Juntos" */}
            <img className={styles.tituloPequeno} src="/images/jogarJuntos.png" alt="" />
          </h3>
          <h1>
            {/* Título principal "Guri" */}
            <img className={styles.tituloGuri} src="/images/tituloGuri.png" alt="" />
          </h1>
        </section>

        {/* Seção com o botão de iniciar */}
        <section className={styles.botoesContainer}>
          {/* Link que navega para a rota /menu */}
          <Link to="/menu">
          <button>
            {/* Botão Start como imagem */}
            <img  className={styles.btnStart} src="/images/botaoStart.png" alt="" />
          </button>
          </Link>
        </section>
      </main>
    </div>
  );
}