import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ClientesServ from '../Services/ClientesServ';

const ClienteLista = () => {
  

  const navigate =useNavigate()
  const [loading, setLoading] = useState(true);
  const [pessoas, setPessoas] = useState(null);
  const [verModal, setVerModal]= useState({
    show: false,
    pessoa : null
 })

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
  
  const deleteHandler = (id) => {
    if (ClientesServ.isFunc(id)) {
      if (window.confirm("É um funcionario se deletar o cliente deletara o registro do funcionario tem certeza?")){
        deletePessoa(id)
      }
    }else{
      if (window.confirm("Quer mesmo deletar esse registro de ?")){
        deletePessoa(id)
      }   
    }
  }
  
  const deletePessoa = (id) => {
    ClientesServ.deletePessoa(id).then((Response)=>{
       console.log(Response);
       window.location.reload();
      }
     ).catch((Error)=>{
        console.log(Error);
     });
    };

const editPessoa = async (e, id) => {
  if ((await ClientesServ.isFunc(id)).data){
    let fid = (await ClientesServ.funcId(id)).data
    navigate(`/funcionario/edit/${fid}`);
  }
  else{
  e.preventDefault();
  navigate(`/cliente/edit/${id}`);
  }
};

  
    return (
      <div className='max-w-4xl shadow border relative overflow-x-auto mx-auto flex bg-slate-100 dark:bg-gray-600 '>
          <table className=' w-full text-left'>
            <thead  >
              <tr className=' border-black border-2 '>
                <th scope='col' className='px-130 py-3'>Nome</th>
                <th scope='col' className='px-130 py-3'>Telefone</th>
                <th scope='col' className='px-130 py-3'>Endereço</th>
              </tr>
              <tr className='dark:hover:bg-red-800 hover:bg-red-600 border-2 border-black text-left justify-center mt-24'>
                <th>
                  <button className=' w-full' onClick={() => navigate("/cliente/add")}>
                      + <span >Adicionar</span>
                  </button>
                </th>
              </tr>
            </thead>
              {!loading && (
              <tbody className='py-0 m-0'>
                {pessoas.map((pessoa)=>(
              <tr className='w-full border-slate-400 border-b hover:border-2 hover:border-double hover:border-slate-800 dark:hover:border-white' key={pessoa.id} onClick={(e) => {e.preventDefault() ;setVerModal({show: true, pessoa: pessoa})}}>
                {console.log(pessoa)}
                <th scope = "row" className='px-130 py-3 whitespace-nowrap'>{pessoa.nomePessoa}</th>
                <td className='px-130 py-3 whitespace-nowrap'>{pessoa.numPessoa}</td>
                <td className='px-130 py-3 whitespace-nowrap'>{pessoa.endereco.endereco}</td>
              </tr>))}
            </tbody>)}
          </table>
          {verModal.show && (
            <div className=' flex z-0 fixed backdrop-blur-sm h-screen w-full grid-cols-2'> 
            <div className='w-200' onClick={(e) =>{e.preventDefault(); setVerModal(false,null)}}></div>
            <div className=' w-96 z-20 flex h-max  border-slate-950 border-2 bg-slate-100 dark:bg-gray-600 '>
              <button className=' absolute top-1 right-1 hover:text-red-600' onClick={(e) =>{e.preventDefault(); setVerModal(false,null)}}>X</button>
                <div>
                <div className=' px-8 py-8 mx-15 '>
                        <div className='mx-auto items-center justify-center h-auto w-full my-4'> 
                            <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Completo: </span>{verModal.pessoa.nomePessoa}</label>
                            <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{verModal.pessoa.numPessoa}</label>
                            <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Email: </span>{verModal.pessoa.emailPessoa}</label>
                            <label className='block' for="doc" name="docPessoa"><span className=' font-bold'>Documento: </span>{verModal.pessoa.docPessoa}</label>
                            <label className='block' for="birth" name="birthPessoa"><span className=' font-bold'>Data de Nascimento: </span>{verModal.pessoa.birthPessoa}</label>
                            <label className='block' for="rua" name="ruaPessoa"><span className=' font-bold'>Rua: </span>{verModal.pessoa.endereco.endereco}</label>
                            <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Bairo: </span>{verModal.pessoa.endereco.bairo}</label>
                            <span><button className='w-20 bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 mr-40' onClick={(e, id)=>editPessoa(e, verModal.pessoa.id)}>Editar</button>
                            <span className=' right-10'><button className='w-70 px-3 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'onClick={(id) => deleteHandler(verModal.pessoa.id)}>Deletar</button></span></span>
                        </div>
                </div>             
            </div> 
            </div>
                </div>
          )}
      </div>
    )
                }

export default ClienteLista;