import React, { useEffect, useState } from "react"
import FuncionarioServ from "../Services/FuncionarioServ";
import { useNavigate, useParams } from 'react-router-dom';
import ClientesServ from "../Services/ClientesServ";


const ClienteEdit = () =>{

    const[loading,setLoading] =useState(true);
    const { id } = useParams();
    const navigate = useNavigate()
    const [pessoa, setPessoa] = useState({
            id : id,
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

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try{
            const response = await ClientesServ.getPessoa(pessoa.id);
            setPessoa(response.data);
          }catch(error){
            console.log(error);
          }
          setLoading(false);
        };
          fetchData();
      },[])

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

      const updateCliente = (e) => {
        e.preventDefault();
        ClientesServ.updatePessoa(pessoa, pessoa.id).then((Response)=>{
            console.log(Response);
            navigate("/cliente")
        }
        ).catch((Error)=>{
            console.log(Error);
        });
    };

    console.log(pessoa);
      

    return (
        <div className='flex max-w-4xl shadow border mx-auto w-auto font-light tracking-widest bg-slate-100 dark:bg-gray-600 '>
        <div className=' px-8 py-8 '>
            <div>
                <h1 className=' text-2xl'>Editar Cliente</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block' for="nome" name="nomePessoa">Nome Completo:</label>
                <input type=' text' className=' border border-black py-2 px-3' id='nome' name='nomePessoa' value={pessoa.nomePessoa} onChange={(e) => handleChange(e)}/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Numero de contato:</label>
                <input type='tel' className=' border border-black py-2 px-3' name="numPessoa" value={pessoa.numPessoa} onChange={(e) => handlePhone(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Email:</label>
                <input type='email' className=' border border-black py-2 px-3' name="emailPessoa" value={pessoa.emailPessoa} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Documento:</label>
                <input type='text' className=' border border-black py-2 px-3' value={pessoa.docPessoa} name="docPessoa" onChange={(e) => handleChange(e)} readOnly></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Data de Nascimento:</label>
                <input type='date' className=' border border-black py-2 px-3' name="birthPessoa" value={pessoa.birthPessoa} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Rua:</label>
                <input type='text' className=' border border-black py-2 px-3' name="endereco" value={pessoa.endereço.endereco} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'> 
                <label className='block'>Bairo:</label>
                <input type='text' className=' border border-black py-2 px-3' name="bairo" value={pessoa.endereço.bairo} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <button className='rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800  w-20 h-8 mr-5' onClick={updateCliente} >Salvar</button>
                <button className='rounded bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800 w-20 h-8' onClick={() => navigate("/cliente")} >Voltar</button>
            </div>
        </div>
    </div>
    )
  }

  export default ClienteEdit;
