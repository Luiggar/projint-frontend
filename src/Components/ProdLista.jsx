import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProdServ from '../Services/ProdServ';

const ProdLista = () => {
    const [loading,setLoading] = useState(true)
    const [produtos,setProdutos] = useState(null)
    
const [prodModal, setProdModal]= useState({
   show: false,
   prod : null
})
    useEffect(() => {
        fetchData();
    },[])
  const deleteProd = (id) => {
    console.log(id)
    ProdServ.deleteProd(id).then((Response)=>{
        console.log(Response);
        
        window.location.reload();
    }
    ).catch((Error)=>{
        console.log(Error);
    });
    };
    const fetchData = async () => {
      setLoading(true);
      try{
          const response = await ProdServ.getAllProd();
          setProdutos(response.data);
      }
      catch(error){
          console.log(error);
      }
      setLoading(false)
  };

    const verFornecedor = (e, id) => {
      e.preventDefault();
      navigate(`/fornecedor/${id}`);
    }
    const navigate = useNavigate()
    const [trequinho,setTrequinho] = useState(true);
    const corEstoque = (qt,min) => {
      const quant = parseInt(qt);
      const minimal = parseFloat(min);
      if (quant <= minimal) {
        return "bg-red-700 text-white "
      } else if (quant <= (min+(min/5))) {
        return "bg-yellow-700"
      } else {
        return ""
      }
    }

    const editProd = async(id,produto) => {
      await ProdServ.editProduto(id,produto);
      setProdModal(false , null);
      fetchData();
    }

    const handleIncrement = () => {
      setProdModal((prevState) => ({
        ...prevState,
        prod: {
          ...prevState.prod,
          quantidade: prevState.prod.quantidade + 1
        }
      }));
    };
  
    const handleDecrement = () => {
      if (prodModal.prod.quantidade > 0) {
        setProdModal((prevState) => ({
          ...prevState,
          prod: {
            ...prevState.prod,
            quantidade: prevState.prod.quantidade - 1,
          },
        }));
      }
    };
    
    return (
        <div className=' max-w-4xl shadow border relative overflow-x-auto mx-auto flex bg-slate-100 dark:bg-gray-600 '>
          {trequinho && (<div className="fixed top-48 w-52 border-2 border-black bg-slate-100 dark:bg-gray-600">
                <button className='absotule right-1' onClick={() => setTrequinho(false)}>X</button>
                <h2>Clique na na coluna do produto para obter mais Informações ou editar</h2>
            </div>)}
          <table className=' w-full text-left'>
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
              <tr className={`max-h-10 box-border border-slate-400 border-b hover:border-2 hover:border-double hover:border-slate-800 dark:hover:border-white ${corEstoque(produto.quantidade,produto.min )}`} onClick={(e) => {e.preventDefault() ;setProdModal({show: true, prod: produto})}} key={produto.id}  >
                {console.log(produto)}

                <th scope = "row" className='px-130 py-3 whitespace-nowrap'  >{produto.nomeProd}</th>
                <td className='px-10 py-3 whitespace-nowrap'>{produto.quantidade}</td>
                <td className='px-10 py-3 whitespace-nowrap'>{produto.precoVenda}</td>
              </tr>))}
            </tbody>)}
          </table>

          {prodModal.show && (<div className=' flex absolute backdrop-blur-sm h-screen w-full grid-cols-2'> 
            <div className='w-200' onClick={(e) =>{e.preventDefault(); setProdModal(false,null)}}></div>
            <div className=' w-96 h-fit  border-slate-950 border-2 bg-slate-100 dark:bg-gray-600'>
              <button className=' absolute top-1 right-1 hover:text-red-600' onClick={(e) =>{e.preventDefault(); setProdModal(false,null)}}>X</button>
                <div>
                <img className=' h-30 w-auto mx-auto mt-5' src={prodModal.prod.imageBlob} alt='Imagem produto'/>
                  <p>Produto: {prodModal.prod.nomeProd}</p>    
                  <span>Quantidade em Estoque: {prodModal.prod.quantidade}</span><span>
                    <button className="text-gray-700 leading-none px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 absolute right-32" onClick={handleDecrement}>-</button><button className="text-gray-700 leading-none px-1 py-1 rounded-full bg-gray-200 hover:bg-gray-300 absolute right-24" onClick={handleIncrement}>+</button>
                    </span>
                  <p>Preço: {prodModal.prod.precoVenda}</p>
                  <p>Fornecedor<span className=' text-blue-700 hover:text-gray-400 mb-20' onClick={(e, id)  => verFornecedor(e , prodModal.prod.fornecedor.idfornecedor)}>"{prodModal.prod.fornecedor.nome}"</span></p>   
                </div>
                <button className=' mb-2 ml-2 px-2 bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800'  onClick={(id,produto) => editProd(prodModal.prod.id, prodModal.prod)}>Salvar Modificações</button>
                <button className=' mb-2 ml-2 px-2 bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800'  onClick={(e) => navigate(`/produtos/edit/${prodModal.prod.id}`) }>Editar</button>
                <button className=' mb-2 ml-2 px-2 bg-red-400 hover:bg-red-600 dark:bg-red-950 dark:hover:bg-red-800'  onClick={(id) => deleteProd(prodModal.prod.id) }>Deletar</button>

            </div> 
            </div>)
          }
        <di className="fixed w-52 border-2 border-black right-52 bg-slate-100 dark:bg-gray-600">
          <h2>A Cor da tabela indica o quão perto o obejeto está da quantidade minima estipulada</h2>
          <div className="bg-red-700 text-white"> Se já chegou ao minimo</div>
          <div className='bg-yellow-700'> Se estiver chegando perto</div>
        </di>
      </div>
    )


                }
export default ProdLista