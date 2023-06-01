

import { Route, Routes } from 'react-router-dom';
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
import ProdAdd from './Components/Prodadd';
import ProdLista from './Components/ProdLista';
import FornecedorVer from './Components/Fornecedorver';
import FornecedorLista from './Components/FornecedroLista';
import FornecedorAdd from './Components/FornecedorAdd';
import ProdEdit from './Components/ProdEdit';





function App() {
  return (
    < ><Navbar/>

      <Routes>
        <Route path="/funcionario" element={<FuncionarioLista />} />
        <Route path="/funcionario/add" element={<Funcionarioadd />} />
        <Route path="/funcionario/ver/:id" element={<FuncionarioVer />} />
        <Route path='/funcionario/edit/:id' element={<FuncionarioaEdit />} />
        <Route path='/cliente/add' element={<Clienteadd/>}/>
        <Route path='/cliente/edit/:id' element={<ClienteEdit/>}/>
        <Route path='/cliente' element={<ClienteLista/>}/>
        <Route path='/cliente/:id' element={<ClienteVer/>}/>
        <Route path='/produtos/add' element={<ProdAdd/>}/>
        <Route path='/produtos' element={<ProdLista/>}/>
        <Route path='/fornecedor/:id' element={<FornecedorVer/>}/>
        <Route path='/fornecedor' element={<FornecedorLista/>}/>
        <Route path='/fornecedor/add' element={<FornecedorAdd/>}/>
        <Route path='/produtos/edit/:id' element={<ProdEdit/>}/>
      </Routes>
    </>
  )
}

export default App;
