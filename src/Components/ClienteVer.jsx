import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ClientesServ from '../Services/ClientesServ';

const ClienteVer = () => {
    
    const { id } = useParams();
    const navigate = useNavigate()
    const [pessoa, setPessoa] = useState({
            id : id,
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
        
    });

    const editFunc = (e, id) => {
        e.preventDefault();
        navigate(`/cliente/edit/${id}`);
      };

    useEffect(() => {
        const fetchData = async () =>{
          try{
            const response = await ClientesServ.getPessoa(pessoa.id);
            setPessoa(response.data);
          }catch(error){
            console.log(error);
          }
        };
          fetchData();
      },[])

    return (
        <div className='flex h-80 max-w-4xl shadow border mx-auto w-auto font-light tracking-widest bg-slate-100 dark:bg-gray-600 '>
            <div className=' px-8 py-8 mx-15 '>
                <div className='mx-auto items-center justify-center h-14 w-full my-4'> 
                    <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Completo: </span>{pessoa.nomePessoa}</label>
                    <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{pessoa.numPessoa}</label>
                    <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Email: </span>{pessoa.emailPessoa}</label>
                    <label className='block' for="doc" name="docPessoa"><span className=' font-bold'>Documento: </span>{pessoa.docPessoa}</label>
                    <label className='block' for="birth" name="birthPessoa"><span className=' font-bold'>Data de Nascimento: </span>{pessoa.birthPessoa}</label>
                    <label className='block' for="rua" name="ruaPessoa"><span className=' font-bold'>Rua: </span>{pessoa.endereco.endereco}</label>
                    <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Bairo: </span>{pessoa.endereco.bairo}</label>
                    <button className='w-20 bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 mr-40' onClick={(e, id)=>editFunc(e, pessoa.id)}>Editar</button>
                    <span className=' right-10'><button className='w-70 px-3 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'onClick={() => navigate("/cliente")}>Voltar a lista</button></span>
                </div>
            </div>
        </div>
    )


}

export default ClienteVer;