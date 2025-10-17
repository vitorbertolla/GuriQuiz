import { Routes, Route } from 'react-router-dom';
import Inicial from './Pages/Tela_Inicial/Tela_Inicial.jsx';
import Tela_Login from './Pages/Tela_Login/Tela_Login.jsx';
import Tela_Cadastro from './Pages/Tela_Cadastro/Tela_Cadastro.jsx';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/cadastrar" element={<Tela_Cadastro />} />
      <Route path="/login" element={<Tela_Login />} />
    </Routes>
    </>
  )
}

export default App
