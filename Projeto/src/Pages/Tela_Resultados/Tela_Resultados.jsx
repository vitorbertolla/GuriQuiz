import styles from './Tela_Resultados.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Tela_Resultados() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const pontuacao = parseInt(searchParams.get('pontuacao')) || 0
  const total = parseInt(searchParams.get('total')) || 0
  const acertos = Math.floor(pontuacao / 100)

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>RESULTADOS</h1>
        <div>
          <div className={styles.pontuacao}>
            <h3>ACERTOS: {acertos}{ total ? ` / ${total}` : '' }</h3>
            <h3>SCORE: {pontuacao}</h3>
          </div>
          <div className={styles.resultado}>
            <p>RESPOSTAS:</p>
            <div>
              {/* monte a lista de respostas se tiver enviado/armazenado */}
              <p>item</p>
            </div>
          </div>
          <div className={styles.btnOverlay}><button onClick={() => navigate('/menu')} className={styles.btnMenu}>MENU</button></div>
        </div>
      </div>
    </div>
  )
}