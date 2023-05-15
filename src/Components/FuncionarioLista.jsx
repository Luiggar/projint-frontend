import React, {useState, useEffect } from 'react'
import FuncionarioServ from '../Services/FuncionarioServ';
import { useNavigate } from 'react-router-dom';

const FuncionarioLista = () => {

  const navigate =useNavigate()
  const [loading, setLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try{
        const response = await FuncionarioServ.getAllFunc();
        setFuncionarios(response.data);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    };
      fetchData();
  },[])
  
const deleteFunc = (id) => {

FuncionarioServ.deleteFuncionario(id).then((Response)=>{
   console.log(Response);
   window.location.reload();
  }
 ).catch((Error)=>{
    console.log(Error);
 });
};

const verFunc = (e, id) => {
  e.preventDefault();
  navigate(`/ver/${id}`);
};
const editFunc = (e, id) => {
  e.preventDefault();
  navigate(`/edit/${id}`);
};


  
    return (
      <div className='max-w-4xl shadow border relative overflow-x-auto mx-auto flex bg-slate-100 dark:bg-gray-600 '>
          <table className=' w-full text-left'>
            <thead  >
              <tr className=' border-black border-2 '>
                <th scope='col' className='px-130 py-3'>Nome</th>
                <th scope='col' className='px-130 py-3'>Telefone</th>
                <th scope='col' className='px-130 py-3'>Função</th>
                <th scope='col' className='px-130 py-3 text-center'>Ações</th>
              </tr>
              <tr className=' hover:bg-red-600 border-2 border-black text-left justify-center mt-24'>
                <th>
                  <button className=' w-full' onClick={() => navigate("/add")}>
                      + <span className='text-white'>Adicionar</span>
                  </button>
                </th>
              </tr>
            </thead>
              {!loading && (
              <tbody className='py-0 m-0'>
                {funcionarios.map((funcionario)=>(
              <tr className='w-full border-slate-400 border-b' key={funcionario.id}>
                {console.log(funcionario)}
                <th scope = "row" className='px-130 py-3 whitespace-nowrap'>{funcionario.pessoa.nomePessoa}
                <p><img src={funcionario.imageblob} alt='Foto'  className=' ml-1 w-15 h-20'/></p>
                </th>
                <td className='px-130 py-3 whitespace-nowrap'>{funcionario.pessoa.numPessoa}</td>
                <td className='px-130 py-3 whitespace-nowrap'>{funcionario.profFunc}</td>
                <td className='px-130 py-3 whitespace-nowrap text-center '>
                  <div className='  border-l-2 border-gray-800 py-0 h-full '>
                   <button className='w-20 me-5 rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 ' onClick={(e, id) => editFunc(e, funcionario.id)}>Editar</button>
                   <button className='w-20 me-5 bg-red-400 hover:bg-red-600 dark:bg-crimsonn dark:hover:bg-red-800' onClick={()=>deleteFunc(funcionario.id)}>Deletar</button>
                   <button className='w-20 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800' onClick={(e, id) => verFunc(e, funcionario.id)}>Ver</button>
                  </div>
                </td>
              </tr>))}
            </tbody>)}
          </table>
          {}
      </div>
    )
}


export default FuncionarioLista;