import React, { Component, useState, useEffect } from 'react'
import FuncionarioServ from '../Services/FuncionarioServ';
import { useNavigate } from 'react-router-dom';
import ClientesServ from '../Services/ClientesServ';

const ClienteLista = () => {

  const navigate =useNavigate()
  const [loading, setLoading] = useState(true);
  const [pessoas, setPessoas] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try{
        const response = await ClientesServ.getAllPessoa();
        setPessoas(response.data);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    };
      fetchData();
  },[])
  
const deleteFunc = (id) => {

ClientesServ.deletePessoa(id).then((Response)=>{
   console.log(Response);
   window.location.reload();
  }
 ).catch((Error)=>{
    console.log(Error);
 });
};

const verPessoa = (e, id) => {
  e.preventDefault();
  navigate(`/cliente/${id}`);
};
const editPessoa = (e, id) => {
  e.preventDefault();
  navigate(`/cliente/edit/${id}`);
};

  
    return (
      <div className='max-w-4xl shadow border relative overflow-x-auto mx-auto flex'>
          <table className=' w-full text-left'>
            <thead  >
              <tr className=' border-black border-2 '>
                <th scope='col' className='px-130 py-3'>Nome</th>
                <th scope='col' className='px-130 py-3'>Telefone</th>
                <th scope='col' className='px-130 py-3'>Endereço</th>
                <th scope='col' className='px-130 py-3 text-center'>Ações</th>
              </tr>
              <tr className=' hover:bg-red-600 border-2 border-black text-left justify-center mt-24'>
                <th>
                  <button className=' w-full' onClick={() => navigate("/cliente/add")}>
                      + <span className='text-white'>Adicionar</span>
                  </button>
                </th>
              </tr>
            </thead>
              {!loading && (
              <tbody className='py-0 m-0'>
                {pessoas.map((pessoa)=>(
              <tr className='w-full border-slate-400 border-b' key={pessoa.id}>
                {console.log(pessoa)}
                <th scope = "row" className='px-130 py-3 whitespace-nowrap'>{pessoa.nomePessoa}</th>
                <td className='px-130 py-3 whitespace-nowrap'>{pessoa.numPessoa}</td>
                <td className='px-130 py-3 whitespace-nowrap'>{pessoa.emailPessoa}</td>
                <td className='px-130 py-3 whitespace-nowrap text-center '>
                  <div className='  border-l-2 border-gray-800 py-0 h-full '>
                   <button className='w-20 me-5 bg-green-200 hover:bg-green-500 ' onClick={(e, id) => editPessoa(e, pessoa.id)}>Editar</button>
                   <button className='w-20 me-5 bg-red-300 hover:bg-red-600' onClick={()=>deleteFunc(pessoa.id)}>Deletar</button>
                   <button className='w-20 me-5 bg-blue-300 hover:bg-blue-600' onClick={(e, id) => verPessoa(e, pessoa.id)}>Ver</button>
                  </div>
                </td>
              </tr>))}
            </tbody>)}
          </table>
      </div>
    )
}


export default ClienteLista;