import styles from './Tela_Inicial.module.css'  // Importa o arquivo de estilos CSS (CSS Modules)
import { Link } from 'react-router-dom';        // Importa o Link para navegação sem recarregar a página

// Componente principal da tela inicial
export default function Tela_Inicial (){
        return(
            <div className={styles.containerPrincipal}> {/* Contêiner principal da tela */}
                
                <div className={styles.tituloContainer}> {/* Área onde ficam os títulos */}
                    <h3>
                        {/* Imagem do título menor */}
                        <img className={styles.tituloPequeno} src="/images/jogarJuntos.png" alt="" />
                    </h3>

                    <h1>
                        {/* Imagem do título principal */}
                        <img className={styles.tituloGuri} src="/images/tituloGuri.png" alt="" />
                    </h1>
                </div>

                <div className={styles.botoesContainer}> {/* Contêiner dos botões */}
                    
                    {/* Botão que leva para tela de login */}
                    <button className={`${styles.botao} ${styles.botaoPrimario}`}>
                        <Link to="/login" className={styles.loginLink}>
                            <img className={styles.btnLogin} src="/images/botaoLogin.png" alt="" />
                        </Link>
                    </button>

                    {/* Botão que leva para tela de cadastro */}
                    <button className={`${styles.botao} ${styles.botaoSecundario}`}>
                        <Link to="/cadastrar" className={styles.cadastroLink}>
                            <img className={styles.btnCadastro} src="/images/botaoCadastro.png" alt="" />
                        </Link>
                    </button>
                </div>

                {/* Imagem da grama (rodapé visual da tela) */}
                <img className={styles.grama} src="/images/grama.jpeg" />

                {/* GIF do personagem “guri” */}
                <img className = {styles.guri} src="/images/guriGif.gif" alt="" />

            </div>
        )
}
