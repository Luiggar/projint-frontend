import React, {useState, useEffect } from 'react'
import ProdServ from '../Services/ProdServ';
import { useNavigate } from 'react-router-dom';

const FornecedorLista = () => {
    const [fornecedores,setFornecedores] = useState(null);
    const navigate =useNavigate()
    const [loading, setLoading] = useState(true);
    const [trequinho,setTrequinho] = useState(true)

    const [fornecedorModal, setFornecedorModal]= useState({
        show: false,
        forne : null
     })

     const verFornecedor = (e, id) => {
        e.preventDefault();
        navigate(`/fornecedor/${id}`);
      }
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true)
            try{
            const response = await ProdServ.getAllFornecedor();
            setFornecedores(response.data);
            
        }
        catch(error){
            console.log(error);
        }
        setLoading(false)
    };
    fetchData();
    },[])

    return (
        <div className=' max-w-4xl shadow border relative overflow-x-auto mx-auto flex bg-slate-100 dark:bg-gray-600'>
            {trequinho && (<div className="fixed top-48 w-52 border-2 border-black bg-slate-100 dark:bg-gray-600">
                <button className='absotule right-1' onClick={() => setTrequinho(false)}>X</button>
                <h2>Clique na na coluna do fornecedor para obter mais Informações ou editar</h2>
            </div>)}
            
            <table className=' w-full text-left'>
                <thead  >
                <tr className=' border-black border-2 '>
                    <th scope='col' className='px-130 py-3'>Fornecedor</th>
                    <th scope='col' className='px-130 py-3'>Contato</th>
                </tr>
                <tr className='dark:hover:bg-red-800 hover:bg-red-600 border-2 border-black text-left justify-center '>
                    <th>
                    <button className=' w-full' onClick={() => navigate("/fornecedor/add")}>
                        + <span >Adicionar</span>
                    </button>
                    </th>
                </tr>
                </thead>
                {!loading && (
                <tbody className='py-0 m-0 w-full'>
                    {fornecedores.map((fornecedor)=>(
                <tr className="max-h-10 box-border border-slate-400 border-b hover:border-2 hover:border-double hover:border-slate-800 dark:hover:border-white " onClick={(e) => {e.preventDefault() ;setFornecedorModal({show: true, forne: fornecedor})}} key={fornecedor.id}  >
                    {console.log(fornecedor)}

                    <th scope = "row" className='px-130 py-3 whitespace-nowrap'  >{fornecedor.nome}</th>
                    <td className='px-10 py-3 whitespace-nowrap'>{fornecedor.contato}</td>
                </tr>))}
                </tbody>)}
            </table>

            {fornecedorModal.show && (<div className=' flex absolute backdrop-blur-sm h-screen w-full grid-cols-2'> 
            <div className='w-200' onClick={(e) =>{e.preventDefault(); setFornecedorModal(false,null)}}></div>
            <div className=' w-96 h-fit  border-slate-950 border-2 bg-slate-100 dark:bg-gray-600'>
              <button className=' absolute top-1 right-1 hover:text-red-600' onClick={(e) =>{e.preventDefault(); setFornecedorModal(false,null)}}>X</button>
                <div>
                  <p>Fornecedor: {fornecedorModal.forne.nome}</p>    
                  <p>Contato: {fornecedorModal.forne.contato}</p>
                  <p>Infor,ações Adicionais: {fornecedorModal.forne.info}</p>
                  <p>Clique para editar ou ter<span className=' text-blue-700 hover:text-gray-400 mb-20' onClick={(e, id)  => verFornecedor(e , fornecedorModal.forne.idfornecedor)}>"Mais Informações"</span></p>   
                </div>
            </div> 
            </div>)
          }

          </div>
    )

}
export default FornecedorLista