

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FuncionarioLista from './Components/FuncionarioLista';
import Funcionarioadd from './Components/Funcionarioadd';
import FuncionarioVer from './Components/FuncionarioVer';
import FuncionarioaEdit from './Components/FuncionarioEdit';
import Navbar from './Components/Navbar';





function App() {
  return (
    <><Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FuncionarioLista />} />
        <Route path="/add" element={<Funcionarioadd />} />
        <Route path="/ver/:id" element={<FuncionarioVer />} />
        <Route path='/edit/:id' element={<FuncionarioaEdit />} />
      </Routes>
    </BrowserRouter></>
  )
}

export default App;
