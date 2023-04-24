import React, { useState } from "react"
import FuncionarioServ from "../Services/FuncionarioServ";
import { useNavigate } from "react-router-dom";
import Cpfvalidação from "../Services/Cpfvalidação";


const Funcionarioadd = () =>{

    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        id : "",
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionario(prevState => ({
          ...prevState,
          pessoa: {
            ...prevState.pessoa,
            [name]: value,
            endereço: {
              ...prevState.pessoa.endereço,
              [name]: value
            }
          },
          [name]: value
        }));
      }
      const handlePhone = (e) => {
        const { name, value } = e.target;
        setFuncionario(prevState => ({
          ...prevState,
          pessoa: {
            ...prevState.pessoa,
            [name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') ,

        }}));
      }

      const handleDoc = (e) => {
        const { name, value } = e.target;
        setFuncionario(prevState => ({
          ...prevState,
          pessoa: {
            ...prevState.pessoa,
            [name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') ,

        }}));
      }


    const saveFunc = (e) => {
        e.preventDefault();
        if (Cpfvalidação.validar(funcionario.pessoa.docPessoa)){
            FuncionarioServ.saveFucionario(funcionario).then((Response)=>{
                console.log(Response);
                navigate("/")
            }
            ).catch((Error)=>{
                console.log(Error);
            });
        }else{
            alert("CPF invalido")
        }

    };



    const reset = (e) => {
        e.preventDefault();
        setFuncionario({
            id : "",
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
      };

      

    return (
        <div className='flex max-w-4xl shadow border mx-auto w-auto font-light tracking-widest'>
        <div className=' px-8 py-8 '>
            <div>
                <h1 className=' text-2xl'>Adicionar funcionario</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block' for="nome" name="nomePessoa">Nome Completo:</label>
                <input type=' text' className=' border border-black py-2 px-3' id='nome' name='nomePessoa' value={funcionario.pessoa.nomePessoa} onChange={(e) => handleChange(e)}/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Numero de contato:</label>
                <input type='tel' className=' border border-black py-2 px-3' name="numPessoa" value={funcionario.pessoa.numPessoa} onChange={(e) => handlePhone(e)} maxLength={15}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Email:</label>
                <input type='email' className=' border border-black py-2 px-3' name="emailPessoa" value={funcionario.pessoa.emailPessoa} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Documento:</label>
                <input type='text' className=' border border-black py-2 px-3' value={funcionario.pessoa.docPessoa} name="docPessoa" onChange={(e) => handleDoc(e)} maxLength={14}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Data de Nascimento:</label>
                <input type='date' className=' border border-black py-2 px-3' name="birthPessoa" value={funcionario.pessoa.birthPessoa} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Função:</label>
                <input type='text' className=' border border-black py-2 px-3' name="profFunc" value={funcionario.profFunc} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Salario:</label>
                <input type='number' className=' border border-black py-2 px-3'  name="salFunc" value={funcionario.salFunc} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Rua:</label>
                <input type='text' className=' border border-black py-2 px-3' name="endereco" value={funcionario.pessoa.endereço.endereco} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Bairo:</label>
                <input type='text' className=' border border-black py-2 px-3' name="bairo" value={funcionario.pessoa.endereço.bairo} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8 mr-5'  onClick={saveFunc}>Salvar</button>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8'  onClick={reset}>Limpar</button>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8 ml-5' onClick={() => navigate("/")} >Voltar</button>
            </div>
        </div>
    </div>
    )
  }

  export default Funcionarioadd;
