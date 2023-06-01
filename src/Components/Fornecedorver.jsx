import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FornecedorServ from '../Services/FornecedorServ';
import ProdServ from '../Services/ProdServ';

const FornecedorVer = () => {

    const [editModal, setEditModal] = useState(false);
    const navigate = useNavigate();
    const[loading,setLoading] = useState(true);
    const{id} = useParams();
    const[fornecedor,setFornecedor] = useState({
        idfornecedor: id,
        nome: "",
        contato: "",
        info: "",
    });
    const [produtos,setProdutos] = useState(null);

    const updateFornecedor = (e) => {
        e.preventDefault();
        FornecedorServ.updateFornecedor(fornecedor.idfornecedor,fornecedor).then((Response)=>{
            console.log(Response);
            setEditModal(false)
        }
        ).catch((Error)=>{
            console.log(Error);
        });
    };
    
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

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try{
            console.log(id)
            const response = await FornecedorServ.getForneId(fornecedor.idfornecedor);
            setFornecedor(response.data);
            console.log(fornecedor);
            const response2 = await FornecedorServ.getProdOfFor(fornecedor);
            setProdutos(response2.data);
          }catch(error){
            console.log(error);
          }
          setLoading(false);
        };
          fetchData();
      },[])

      return (
      <div className='flex h-auto max-w-4xl shadow border mx-auto w-auto font-light tracking-widest bg-slate-100 dark:bg-gray-600'>
        {!loading && (<div className='w-full'><div>
        <label className='block' for="nome" name="nomePessoa"><span className=' font-bold'>Nome Fornecedor: </span>{fornecedor.nome}</label>
        <label className='block' for="num" name="numPessoa"><span className=' font-bold'>Numero de Contato: </span>{fornecedor.contato}</label>
        <label className='block' for="email" name="emailPessoa"><span className=' font-bold'>Informações idicionais: </span>{fornecedor.info}</label> 
        <span className=' right-10'><button className='ml-2 w-70 px-3 me-5 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'onClick={() => navigate("/fornecedor")}>Voltar a lista</button></span>
        <button className='w-20 me-5 rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 ' onClick={(e) => setEditModal(true)}>Editar</button> 
        </div>
        <div className='border-2 border-black w-full'>
            <h1 className=' text-center mx-auto w-full'>Produtos</h1>
            <table className=' w-full table-auto text-left mt-4'>
            <thead  >
              <tr className=' border-black border-2 '>
                <th scope='col' className='px-130 py-3'>Produto</th>
                <th scope='col' className='px-130 py-3'>Quantidade</th>
                <th scope='col' className='px-130 py-3'>Preço</th>
              </tr>
              <tr className='dark:hover:bg-red-800 hover:bg-red-600 border-2 border-black text-left justify-center '>
                <th>
                  <button className=' w-full' onClick={() => navigate("/produtos/add")}>
                      + <span >Adicionar</span>
                  </button>
                </th>
              </tr>
            </thead>
              {!loading && (
              <tbody className='py-0 m-0 w-full'>
                {produtos.map((produto)=>(
              <tr className="max-h-10 border-slate-400 border-b " key={produto.id}  >
                {console.log(produto)}

                <th scope = "row" className='px-130 py-3 whitespace-nowrap'  >{produto.nomeProd}</th>
                <td className='px-10 py-3 whitespace-nowrap'>{produto.quantidade}</td>
                <td className='px-10 py-3 whitespace-nowrap'>{produto.precoVenda}</td>
              </tr>))}
            </tbody>)}
          </table>
        </div></div>) 
        }
        {editModal && (
                <div className="flex absolute backdrop-blur-sm h-auto w-full grid-cols-">
                  <div className=" w-48 h-full "  onClick={() => setEditModal(false)}></div>
                  <div className=" w-96 h-5/6 bg-slate-100 dark:bg-gray-600 border-2 border-black"> <button className=" fixed left-200" onClick={()  => setEditModal(false)}>X</button>
                    <label className='block' for="nome" name="nomeFornecedor">Nome do Fornecedor:</label>
                    <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='nome' name='nome' value={fornecedor.nome} onChange={(e) => handleChange(e)} />
                    <label className='block' for="nome" name="nomeFornecedor">Contato do fornecedor:</label>
                    <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='contato' name='contato' value={fornecedor.contato} onChange={(e) => handlePhone(e)} required pattern="^\d{2}-\d{9}$" title="Favor digitar telefone no formato (99) 99999-9999" maxLength={15}/>
                    <label className='block' for="nome" name="nomeFornecedor">Informações adicionais:</label>
                    <textarea className=' border border-black py-2 px-3 mb-2 w-60 text-black' id='info' name='info'  rows={10} value={fornecedor.info} onChange={(e) => handleChange(e)}/> 
                    <button className='rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 w-20 h-8 mt-2 ml-40 '  onClick={(e) => updateFornecedor(e)}>Salvar</button>
                  </div>
                </div>
              )}       
      </div>)
}

export default FornecedorVer;