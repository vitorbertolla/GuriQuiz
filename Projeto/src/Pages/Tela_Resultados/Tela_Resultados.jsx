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
      <h1>Resultados</h1>
      <div>
        <h3>ACERTOS: {acertos}{ total ? ` / ${total}` : '' }</h3>
        <h3>SCORE: {pontuacao}</h3>

        <div>
          <p>RESPOSTAS</p>
          <div>
            {/* monte a lista de respostas se tiver enviado/armazenado */}
            <p>item</p>
          </div>
        </div>

        <button onClick={() => navigate('/menu')}>MENU</button>
      </div>
    </div>
  )
}