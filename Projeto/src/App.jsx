import { Routes, Route } from 'react-router-dom';
import Inicial from './Pages/Tela_Inicial/Tela_Inicial.jsx';
import Tela_Login from './Pages/Tela_Login/Tela_Login.jsx';
import Tela_Cadastro from './Pages/Tela_Cadastro/Tela_Cadastro.jsx';
import Tela_Start from './Pages/Tela_Start/Tela_Start.jsx';
import Tela_Menu from './Pages/Tela_Menu/Tela_Menu.jsx';
import Tela_Ranking from './Pages/Tela_Ranking/Tela_Ranking.jsx';
import Tela_Cadastro_Pergunta from './Pages/Tela_Cadastro_Pergunta/Tela_Cadastro_Pergunta.jsx';
import Tela_Config_Quiz from './Pages/Tela_Config_Quiz/Tela_Config_Quiz.jsx';
import Tela_Jogo from './Pages/Tela_Jogo/Tela_Jogo.jsx';
import Tela_Fim_Jogo from './Pages/Tela_Fim_Jogo/Tela_Fim_Jogo.jsx';
import Tela_Resultados from './Pages/Tela_Resultados/Tela_Resultados.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/cadastrar" element={<Tela_Cadastro />} />
      <Route path="/login" element={<Tela_Login />} />
      <Route path="/start" element={<Tela_Start/>} />
      <Route path="/menu" element={<Tela_Menu/>} />
      <Route path="/ranking" element={<Tela_Ranking/>} />
      <Route path="/cadastroPergunta" element={<Tela_Cadastro_Pergunta/>} />
      <Route path="/configuraçãoQuiz" element={<Tela_Config_Quiz/>} />
      <Route path="/jogo" element={<Tela_Jogo/>} />
      <Route path="/fimJogo" element={<Tela_Fim_Jogo/>} />
      <Route path="/resultados" element={<Tela_Resultados/>} />

    </Routes>
    </>
  )
}

export default App
