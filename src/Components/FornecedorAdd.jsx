import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FornecedorServ from '../Services/FornecedorServ';

const FornecedorAdd = () => {
    const navigate = useNavigate();
    const{id} = useParams();
    const[fornecedor,setFornecedor] = useState({
        idfornecedor: id,
        nome: "",
        contato: "",
        info: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFornecedor((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handlePhone = (e) => {
        const value = e.target.value;
        setFornecedor({ ...fornecedor, [e.target.name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') });
      }
      const saveFornecedor = (e) => {
        e.preventDefault();
        FornecedorServ.saveFornecedor(fornecedor).then((Response)=>{
            console.log(Response);
            navigate("/fornecedor")
        }
        ).catch((Error)=>{
            console.log(Error);
        });
    };
    return (
        <div className='flex max-w-4xl justify-center shadow border mx-auto w-auto font-light tracking-widest bg-slate-100 dark:bg-gray-600 '>
          <div className=" mx-autos w-96 h-5/6 bg-slate-100 dark:bg-gray-600 "> 
                <label className='block' for="nome" name="nomeFornecedor">Nome do Fornecedor:</label>
                <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='nome' name='nome' value={fornecedor.nome} onChange={(e) => handleChange(e)} />
                <label className='block' for="nome" name="nomeFornecedor">Contato do fornecedor:</label>
                <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='contato' name='contato' value={fornecedor.contato} onChange={(e) => handlePhone(e)} required pattern="^\d{2}-\d{9}$" title="Favor digitar telefone no formato (99) 99999-9999" maxLength={15}/>
                <label className='block' for="nome" name="nomeFornecedor">Informações adicionais:</label>
                <textarea className=' border border-black py-2 px-3 mb-2 w-60 text-black' id='info' name='info'  rows={10} value={fornecedor.info} onChange={(e) => handleChange(e)}/> 
                <div className='items-center justify-center h-14 w-full my-4'>
                    <button className='rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800  w-20 h-8 mr-5'  onClick={(e) => saveFornecedor(e)}>Salvar</button>
                    <button className='rounded bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800 w-20 h-8 ml-5' onClick={() => navigate("/fornecedor")} >Voltar</button>
                </div>           
            </div>  
        </div>
    )
}
export default FornecedorAdd;