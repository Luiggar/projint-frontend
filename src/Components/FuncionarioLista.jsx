import React, {useState, useEffect } from 'react'
import FuncionarioServ from '../Services/FuncionarioServ';
import { useNavigate } from 'react-router-dom';

const FuncionarioLista = () => {

  const navigate =useNavigate()
  const [loading, setLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState(null);
  const [verModal, setVerModal]= useState({
    show: false,
    func : null
 })
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
  

  const deleteHandler = (id) => {

      if (window.confirm("Quer mesmo deletar esse registro ?")){
        deleteFuncionario(id)
      }   
    }
  
    const deleteFuncionario = (id) => {
      FuncionarioServ.deleteFuncionario(id).then((Response)=>{
         console.log(Response);
         window.location.reload();
        }
       ).catch((Error)=>{
          console.log(Error);
       });
      };


const editFunc = (e, id) => {
  e.preventDefault();
  navigate(`/funcionario/edit/${id}`);
};


  
    return (
      <div className='max-w-4xl shadow border relative overflow-x-auto mx-auto flex bg-slate-100 dark:bg-gray-600 '>
          <table className=' w-full text-left'>
            <thead  >
              <tr className=' border-black border-2 '>
                <th scope='col' className='px-130 py-3'>Nome</th>
                <th scope='col' className='px-130 py-3'>Telefone</th>
                <th scope='col' className='px-130 py-3'>Função</th>
              </tr>
              <tr className=' hover:bg-red-600 border-2 border-black text-left justify-center mt-24'>
                <th>
                  <button className=' w-full' onClick={() => navigate("/funcionario/add")}>
                      + <span className='text-white'>Adicionar</span>
                  </button>
                </th>
              </tr>
            </thead>
              {!loading && (
              <tbody className='py-0 m-0'>
                {funcionarios.map((funcionario)=>(
              <tr className='w-full border-slate-400 border-b hover:border-2 hover:border-double hover:border-slate-800 dark:hover:border-white' onClick={(e) => {e.preventDefault() ;setVerModal({show: true, func: funcionario})}} key={funcionario.id} >
                {console.log(funcionario)}
                <th scope = "row" className='px-130 py-3 whitespace-nowrap'>{funcionario.pessoa.nomePessoa}
                <p><img src={funcionario.imageblob} alt='Foto'  className=' ml-1 w-15 h-20'/></p>
                </th>
                <td className='px-130 py-3 whitespace-nowrap'>{funcionario.pessoa.numPessoa}</td>
                <td className='px-130 py-3 whitespace-nowrap'>{funcionario.profFunc}</td>
              </tr>))}
            </tbody>)}
          </table>

          {verModal.show && (
          <div className=' flex z-0 fixed backdrop-blur-sm h-screen w-full grid-cols-2'> 
          <div className=' w-96' onClick={(e) =>{e.preventDefault(); setVerModal(false,null)}}></div>
          <div className='flex h-fit max-w-xl shadow border w-auto font-light tracking-widest grid-cols-2 gap-4 bg-slate-100 dark:bg-gray-600 '>
          <div>
            <label className='block mx-4 text-center' for="foto" name="imageblob"><p className=' font-bold'>Foto </p><img alt="Imagen de funcionario"src={verModal.func.imageblob} className=" object-fill h-40 w-30 mt-4 border-black border-2"/></label>
          </div>
          <div className='mx-auto'>
                    <div className=' mx-auto'>
                      <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Completo: </span>{verModal.func.pessoa.nomePessoa}</label>
                      <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{verModal.func.pessoa.numPessoa}</label>
                      <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Email: </span>{verModal.func.pessoa.emailPessoa}</label>
                      <label className='block' for="doc" name="docPessoa"><span className=' font-bold'>Documento: </span>{verModal.func.pessoa.docPessoa}</label>
                      <label className='block' for="birth" name="birthPessoa"><span className=' font-bold'>Data de Nascimento: </span>{verModal.func.pessoa.birthPessoa}</label>
                      <label className='block' for="funç" name="~profPessoa"><span className=' font-bold'>Função: </span>{verModal.func.profFunc}</label>
                      <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Salario: </span>R$ {verModal.func.salFunc}</label>
                      <label className='block' for="rua" name="ruaPessoa"><span className=' font-bold'>Rua: </span>{verModal.func.pessoa.endereco.endereco}</label>
                      <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Bairo: </span>{verModal.func.pessoa.endereco.bairo}</label>
                      <div className=' object-right-bottom my-4'>
                        <button className='w-20 rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800  mr-5 ' onClick={(e, id)=>editFunc(e, verModal.func.id)}>Editar</button>
                        <span className=' right-10'><button className='w-70 px-3 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'onClick={(id)=>deleteHandler(verModal.func.id)}>Deletar</button></span>
                      </div>
                    </div>
          </div>      
        </div>
        </div>
        )}
      </div>
    )
}


export default FuncionarioLista;