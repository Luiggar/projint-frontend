import React, { Component, useState, useEffect } from 'react'
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
            endereço : {
                idendereco: "",
                endereco: "",
                bairo: ""
            }
        }
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

    return (
        <div className='flex h-80 max-w-4xl shadow border mx-auto w-auto font-light tracking-widest'>
            <div className=' px-8 py-8 mx-15 '>
                <div className='mx-auto items-center justify-center h-14 w-full my-4'> 
                    <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Completo: </span>{funcionario.pessoa.nomePessoa}</label>
                    <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{funcionario.pessoa.numPessoa}</label>
                    <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Email: </span>{funcionario.pessoa.emailPessoa}</label>
                    <label className='block' for="doc" name="docPessoa"><span className=' font-bold'>Documento: </span>{funcionario.pessoa.docPessoa}</label>
                    <label className='block' for="birth" name="birthPessoa"><span className=' font-bold'>Data de Nascimento: </span>{funcionario.pessoa.birthPessoa}</label>
                    <label className='block' for="funç" name="~profPessoa"><span className=' font-bold'>Função: </span>{funcionario.profFunc}</label>
                    <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Salario: </span>R$ {funcionario.salFunc}</label>
                    <label className='block' for="rua" name="ruaPessoa"><span className=' font-bold'>Rua: </span>{funcionario.pessoa.endereço.endereco}</label>
                    <label className='block' for="sal" name="salPessoa"><span className=' font-bold'>Bairo: </span>{funcionario.pessoa.endereço.bairo}</label>
                    <button className='w-20 bg-green-200 hover:bg-green-500 mr-40' onClick={(e, id)=>editFunc(e, funcionario.id)}>Editar</button>
                    <span className=' right-10'><button className='w-70 px-3 me-5 bg-teal-200 hover:bg-teal-400'onClick={() => navigate("/")}>Voltar a lista</button></span>
                </div>
            </div>
        </div>
    )


}

export default FuncionarioVer;