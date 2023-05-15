

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FuncionarioLista from './Components/FuncionarioLista';
import Funcionarioadd from './Components/Funcionarioadd';
import FuncionarioVer from './Components/FuncionarioVer';
import FuncionarioaEdit from './Components/FuncionarioEdit';
import Navbar from './Components/Navbar';
import Clienteadd from './Components/Clienteadd';
import ClienteEdit from './Components/ClienteEdit';
import ClienteLista from './Components/ClienteLista';
import ClienteVer from './Components/ClienteVer';





function App() {
  return (
    < ><Navbar/>

      <Routes>
        <Route path="/" element={<FuncionarioLista />} />
        <Route path="/add" element={<Funcionarioadd />} />
        <Route path="/ver/:id" element={<FuncionarioVer />} />
        <Route path='/edit/:id' element={<FuncionarioaEdit />} />
        <Route path='/cliente/add' element={<Clienteadd/>}/>
        <Route path='/cliente/edit/:id' element={<ClienteEdit/>}/>
        <Route path='/cliente' element={<ClienteLista/>}/>
        <Route path='/cliente/:id' element={<ClienteVer/>}/>
      </Routes>
    </>
  )
}

export default App;
