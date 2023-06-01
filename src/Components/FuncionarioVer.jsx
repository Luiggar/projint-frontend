import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FuncionarioServ from '../Services/FuncionarioServ';

const FuncionarioVer = () => {
    
    const[loading,setLoading] =useState(true);
    const { id } = useParams();
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState({
        id : id,
        profFunc : "",
        salFunc : "",
        pessoa : {
            id : "",
            nomePessoa : "",
            numPessoa : "",
            emailPessoa : "",
            docPessoa: "",
            birthPessoa : "",
            endereco : {
                idendereco: "",
                endereco: "",
                bairo: ""
            }
        },
        imageblob:""
    });

    const editFunc = (e, id) => {
        e.preventDefault();
        navigate(`/edit/${id}`);
      };

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try{
            const response = await FuncionarioServ.getFunc(funcionario.id);
            setFuncionario(response.data);
          }catch(error){
            console.log(error);
          }
          setLoading(false);
        };
          fetchData();
      },[])
      if (loading === true){console.log("ok")}
    return (
      
       <div className='flex h-auto max-w-xl shadow border mx-auto w-auto font-light tracking-widest grid-cols-2 gap-4 bg-slate-100 dark:bg-gray-600 '>
          <div>
            <label className='block mx-4 text-center' for="foto" name="imageblob"><p className=' font-bold'>Foto </p><img alt="Imagen de funcionario"src={funcionario.imageblob} className=" object-fill h-40 w-30 mt-4 border-black border-2"/></label>
          </div>
          <div className='mx-auto'>
                    <div className=' mx-auto'>
                      <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Completo: </span>{funcionario.pessoa.nomePessoa}</label>
                      <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{funcionario.pessoa.numPessoa}</label>
                      <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Email: </span>{funcionario.pessoa.emailPessoa}</label>
                      <label className='block' for="doc" name="docPessoa"><span className=' font-bold'>Documento: </span>{funcionario.pessoa.docPessoa}</label>
                      <label className='block' for="birth" name="birthPessoa"><span className=' font-bold'>Data de Nascimento: </span>{funcionario.pessoa.birthPessoa}</label>
                      <label className='block' for="funç" name="~profPessoa"><span className=' font-bold'>Função: </span>{funcionario.profFunc}</label>
                      <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Salario: </span>R$ {funcionario.salFunc}</label>
                      <label className='block' for="rua" name="ruaPessoa"><span className=' font-bold'>Rua: </span>{funcionario.pessoa.endereco.endereco}</label>
                      <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Bairo: </span>{funcionario.pessoa.endereco.bairo}</label>
                      <div className=' object-right-bottom my-4'>
                        <button className='w-20 rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800  mr-5 ' onClick={(e, id)=>editFunc(e, funcionario.id)}>Editar</button>
                        <span className=' right-10'><button className='w-70 px-3 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'onClick={() => navigate("/")}>Voltar a lista</button></span>
                      </div>
                    </div>
          </div>      
        </div>
    )


}

export default FuncionarioVer;