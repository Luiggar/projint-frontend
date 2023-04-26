import React, { useEffect, useState } from "react"
import FuncionarioServ from "../Services/FuncionarioServ";
import { useNavigate, useParams } from 'react-router-dom';


const FuncionarioEdit = () =>{

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

      const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFuncionario({...funcionario, imageblob : base64});
      }

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.readAsDataURL(file);
            
            leitor.onload = () =>{
                resolve(leitor.result)
            }
            leitor.onerror = (error) =>{
                reject(error)
            }
        })
      }

      const updateFuncionario = (e) => {
        e.preventDefault();
        FuncionarioServ.updateFunc(funcionario, funcionario.id).then((Response)=>{
            console.log(Response);
            navigate("/")
        }
        ).catch((Error)=>{
            console.log(Error);
        });
    };

    console.log(funcionario);
      

    return (
      <div className='flex h-auto max-w-xl shadow border mx-auto w-auto font-light tracking-widest grid-cols-2 gap-0'>
      <div className="mx-auto">
        <label className='block -ml-10  text-center' for="foto" name="imageblob"><p className=' font-bold'>Foto </p></label>
        <img src={funcionario.imageblob} title="Foto" alt="Foto" className=" object-fill h-80 w-60 border-black border-2" ></img>
        <input type="file" accept=".jpg,.jpeg,.png"  name='imageblob' onChange={(e) => {uploadImage(e)}} className=" w-60 h-8"></input>
        <label className='block'>Função:</label>
        <input type='text' className=' border border-black py-2 px-3 mb-2 w-60' name="profFunc" value={funcionario.profFunc} onChange={(e) => handleChange(e)}></input>
        <label className='block'>Salario:</label>
        <input type='number' className=' border border-black py-2 px-3 w-60'  name="salFunc" value={funcionario.salFunc} onChange={(e) => handleChange(e)}></input>
        <p></p>
        <button className='rounded bg-blue-300 hover:bg-blue-600 w-20 h-8 mr-24 mt-5 mb-4' onClick={() => navigate("/")} >Voltar</button>
      </div>
      
      

      <div className="mx-auto">
                <div className=' mx-auto'>
                    <label className='block' for="nome" name="nomePessoa">Nome Completo:</label>
                    <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='nome' name='nomePessoa' value={funcionario.pessoa.nomePessoa} onChange={(e) => handleChange(e)}/>
                    <label className='block'>Numero de contato:</label>
                    <input type='tel' className=' border border-black py-2 px-3 mb-2 w-60' name="numPessoa" value={funcionario.pessoa.numPessoa} onChange={(e) => handlePhone(e)} maxLength={15}></input>
                    <label className='block'>Email:</label>
                    <input type='email' className=' border border-black py-2 px-3 mb-2 w-60' name="emailPessoa" value={funcionario.pessoa.emailPessoa} onChange={(e) => handleChange(e)}></input>
                    <label className='block'>Documento:</label>
                    <input type='text' className=' border border-black py-2 px-3 mb-2 w-60' value={funcionario.pessoa.docPessoa} name="docPessoa" onChange={(e) => handleDoc(e)} maxLength={14}></input>
                    <label className='block'>Data de Nascimento:</label>
                    <input type='date' className=' border border-black py-2 px-3 mb-3 w-60' name="birthPessoa" value={funcionario.pessoa.birthPessoa} onChange={(e) => handleChange(e)}></input>
                    
                    <label className='block'>Rua:</label>
                    <input type='text' className=' border border-black py-2 px-3 mb-2 w-60' name="endereco" value={funcionario.pessoa.endereço.endereco} onChange={(e) => handleChange(e)}></input>
                    <label className='block'>Bairo:</label>
                    <input type='text' className=' border border-black py-2 px-3 mb-2 w-60' name="bairo" value={funcionario.pessoa.endereço.bairo} onChange={(e) => handleChange(e)}></input>
                    <p></p>
                    <button className='rounded bg-green-200 hover:bg-green-500 w-20 h-8 mt-3 ml-40 '  onClick={updateFuncionario}>Salvar</button>
                </div>
      </div>      
    </div>
    )
  }

  export default FuncionarioEdit;
