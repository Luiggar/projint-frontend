import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import ClientesServ from "../Services/ClientesServ";
import Cpfvalidação from "../Services/Cpfvalidação";


const Clienteadd = () =>{

    const navigate = useNavigate();
    const [pessoa, setPessoa] = useState({
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
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPessoa(prevState => ({
          ...prevState,
          endereço: {
            ...prevState.endereço,
            [name]: value,
          },
          [name]: value
        }));
      }
      const handlePhone = (e) => {
        const value = e.target.value;
        setPessoa({ ...pessoa, [e.target.name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') });
      }

      const handleDoc = (e) => {
        const value = e.target.value;
        setPessoa({ ...pessoa, [e.target.name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') });
      }


    const saveFunc = (e) => {
        e.preventDefault();
        if (Cpfvalidação.validar(pessoa.docPessoa)){
            ClientesServ.savePessoa(pessoa);
            navigate("/cliente")
        }else{
            alert("CPF invalido")
        }
    };



    const reset = (e) => {
        e.preventDefault();
        setPessoa({

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
        );
      };

      

    return (
        <div className='flex max-w-4xl shadow border mx-auto w-auto font-light tracking-widest'>
        <div className=' px-8 py-8 '>
            <div>
                <h1 className=' text-2xl'>Adicionar Cliente</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block' for="nome" name="nomePessoa">Nome Completo:</label>
                <input type=' text' className=' border border-black py-2 px-3' id='nome' name='nomePessoa' value={pessoa.nomePessoa} onChange={(e) => handleChange(e)} required/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Numero de contato:</label>
                <input type='tel' className=' border border-black py-2 px-3' name="numPessoa" value={pessoa.numPessoa} onChange={(e) => handlePhone(e)} required pattern="^\d{2}-\d{9}$" title="Favor digitar telefone no formato (99) 99999-9999" maxLength={15}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Email:</label>
                <input type='email' className=' border border-black py-2 px-3' name="emailPessoa" value={pessoa.emailPessoa} onChange={(e) => handleChange(e)} required></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Documento:</label>
                <input type='text' className=' border border-black py-2 px-3' value={pessoa.docPessoa} name="docPessoa" onChange={(e) => handleDoc(e)} required maxLength={15}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Data de Nascimento:</label>
                <input type='date' className=' border border-black py-2 px-3' name="birthPessoa" value={pessoa.birthPessoa} onChange={(e) => handleChange(e)} required></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Rua:</label>
                <input type='text' className=' border border-black py-2 px-3' name="endereco" value={pessoa.endereço.endereco} onChange={(e) => handleChange(e)} required></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Bairo:</label>
                <input type='text' className=' border border-black py-2 px-3' name="bairo" value={pessoa.endereço.bairo} onChange={(e) => handleChange(e)} required></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8 mr-5'  onClick={saveFunc}>Salvar</button>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8'  onClick={reset}>Limpar</button>
                <button className='rounded bg-slate-400 hover:bg-slate-blue hover:text-white w-20 h-8 ml-5' onClick={() => navigate("/cliente")} >Voltar</button>
            </div>
        </div>
    </div>
    )
  }

  export default Clienteadd;
