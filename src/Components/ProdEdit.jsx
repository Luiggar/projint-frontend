import React, {useState, useEffect} from "react";
import ProdServ from "../Services/ProdServ";
import { useNavigate , useParams} from "react-router-dom";
import ServFornecedor from "../Services/FornecedorServ"

const ProdEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [produto, setProduto] = useState({
        id: id,
        imageBlob: "",
        nomeProd: "",
        precoCompra: null,
        precoVenda: null,
        quantidade: "",
        min: "",
        fornecedor: {
          idfornecedor: "",
          nome: "",
          contato: "",
          info: "",
        },
      });
    const [fornecedores,setFornecedores] = useState(null);
    const [addModal, setAddModal] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await ProdServ.getAllFornecedor();
                setFornecedores(response.data);
                const r2 = await ProdServ.getProduto(produto.id)
                setProduto(r2.data)
                setSelectedFornecedor(r2.data.fornecedor.idfornecedor);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[])



    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name.startsWith("fornecedor")) {
        setProduto((prevState) => ({
          ...prevState,
          fornecedor: {
            ...prevState.fornecedor,
            [name]: value,
          },
        }));
      } else {
        setProduto((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    };
    
    const saveHandler = (e) => {
        e.preventDefault();
        ProdServ.saveProd(produto);
        navigate("/produtos");
    }
    
    
    const saveFornecedor = async(e) => {
        e.preventDefault();
        await ServFornecedor.saveFornecedor(produto.fornecedor);
        const response = await ProdServ.getAllFornecedor();
        setFornecedores(response.data);
        setAddModal(false)
    }
  
    const uploadImage = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            setProduto({...produto, imageBlob : base64});
            console.log(produto.imageBlob)
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

      const [selectedFornecedor, setSelectedFornecedor] = useState(null);
      
      const handlePhone = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
          ...prevState,
          fornecedor: {
            ...prevState.fornecedor,
            [name]: value.replace(/\D/g,"").substring(0-11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') ,

        }}));
      }

      const handlePrice = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(',', '.').replace(/[^0-9.]/g, '');
        const floatValue = parseFloat(numericValue);       
        if (!isNaN(floatValue)) {
          const formattedValue = floatValue.toFixed(2);
          setProduto((prevState) => ({
            ...prevState,
            [name]: formattedValue,
          }));
        }
      };

      const handleFornecedorChange = (e) => {
        const selectedFornecedorId = e.target.value;
        const selectedFornecedor = fornecedores.find(
          (fornecedor) => String(fornecedor.idfornecedor) === String(selectedFornecedorId)
        );
        console.log(selectedFornecedor, selectedFornecedorId);
        setSelectedFornecedor(selectedFornecedorId);
      
        setProduto((prevState) => ({
          ...prevState,
          fornecedor: selectedFornecedor
            ? {
                idfornecedor: selectedFornecedor.idfornecedor,
                contato: selectedFornecedor.contato,
                nome: selectedFornecedor.nome,
                info: selectedFornecedor.info,
              }
            : {
                idfornecedor: "",
                nome: "",
                info: "",
                contato: "",
              },
        }));
      };
      
      

    return (
        
         <div className='flex h-auto max-w-xl shadow border mx-auto w-auto font-light tracking-widest grid-cols-2 gap-0 bg-slate-100 dark:bg-gray-600 '>
                <div className="mx-auto">
                  <label className='block -ml-10  text-center' for="foto" name="imageblob"><p className=' font-bold'>Foto </p></label>
                  <img src={produto.imageBlob} title="Foto" alt="Foto" className=" object-fill h-80 w-60 border-black border-2" ></img>
                  <input type="file" accept=".jpg,.jpeg,.png"  name='imageBlob' onChange={(e) => {uploadImage(e)}} className=" w-60 h-8"></input>
                  <label className='block'>Produto:</label>
                  <input type='text' className=' border border-black py-2 px-3 mb-2 w-60' name="nomeProd" value={produto.nomeProd} onChange={(e) => handleChange(e)}></input>
                  <label className='block'>Quantidade:</label>
                  <input type='number' className=' border border-black py-2 px-3 w-60'  name="quantidade" value={produto.quantidade} onChange={(e) => handleChange(e)}></input>
                  <label className='block'>Minimo:</label>
                  <input type='number' className=' border border-black py-2 px-3 w-60'  name="min" value={produto.min} onChange={(e) => handleChange(e)}></input>                  <p></p>
                  <p></p>
                  <button className='rounded bg-blue-400 hover:bg-blue-600 dark:bg-dblue dark:hover:bg-blue-800 w-20 h-8 mr-24 mt-5 mb-4' onClick={() => navigate("/produtos")} >Voltar</button> 
                </div>
        
        
                <div className="mx-auto">
                    <div className=' mx-auto'>
                    <label className='block' htmlFor="fornecedor" name="nomeFornecedor">Fornecedor:</label>
                    <select
                      id="fornecedor"
                      name="fornecedor"
                      value={selectedFornecedor}
                      onChange={(e) => handleFornecedorChange(e)}
                      className='border border-black py-2 px-3 mb-2 w-40 text-black'
                    >
                      <option value="">Selecione um fornecedor</option>
                      {fornecedores && fornecedores.map(fornecedor => ( 
                        <option key={fornecedor.idfornecedor} value={fornecedor.idfornecedor}>
                          {fornecedor.nome}
                        </option>
                      ))}
                      
                        </select>  <span className=" hover:text-red-900" ><button onClick={(e) => setAddModal(true)} >+ Adicionar</button></span>
                        <label className='block' for="nome" name="nomeFornecedor">Contato do fornecedor:</label>
                        <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='contato' name='contato' value={produto.fornecedor.contato} onChange={(e) => handleChange(e)} required pattern="^\d{2}-\d{9}$" title="Favor digitar telefone no formato (99) 99999-9999" maxLength={15}/>                         <p></p>
                        <label className='block' for="nome" name="nomeFornecedor">Preço de Compra:</label>
                        <input type='number' className=' border border-black py-2 px-3 mb-2 w-60 ' id='precoCompra' name='precoCompra' value={produto.precoCompra} onChange={(e) => handleChange(e)} onBlur={(e) => handlePrice(e)}/> 
                        <label className='block mt-3'>Preço de Venda:</label>
                        <input type='number' className=' border border-black py-2 px-3 w-60'  name="precoVenda" value={produto.precoVenda} onChange={(e) => handleChange(e)} onBlur={(e) => handlePrice(e)}></input>                          
                        <label className='block' for="nome" name="nomeFornecedor">Informações adicionais do fornecedor:</label>
                        <textarea className=' border border-black py-2 px-3 mb-2 w-60 text-black' id='info' name='info' rows={10} onChange={(e) => handleChange(e)} value={produto.fornecedor.info} /> 
                        <p></p>
                        <button className='rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 w-20 h-8 mt-2 ml-40 '  onClick={(e) => saveHandler(e)}>Salvar</button>
                    </div>
                </div>  
                {addModal && (
                <div className="flex absolute backdrop-blur-sm h-4/5 w-full grid-cols-">
                  <div className=" w-48 h-full "  onClick={() => setAddModal(false)}></div>
                  <div className=" w-96 h-5/6 bg-slate-100 dark:bg-gray-600 border-2 border-black"> <button className=" fixed left-200" onClick={()  => setAddModal(false)}>X</button>
                    <label className='block' for="nome" name="nomeFornecedor">Nome do Fornecedor:</label>
                    <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='nome' name='nome' value={produto.fornecedor.nome} onChange={(e) => handleChange(e)} />
                    <label className='block' for="nome" name="nomeFornecedor">Contato do fornecedor:</label>
                    <input type=' text' className=' border border-black py-2 px-3 mb-2 w-60 ' id='contato' name='contato' value={produto.fornecedor.contato} onChange={(e) => handlePhone(e)} required pattern="^\d{2}-\d{9}$" title="Favor digitar telefone no formato (99) 99999-9999" maxLength={15}/>
                    <label className='block' for="nome" name="nomeFornecedor">Informações adicionais:</label>
                    <textarea className=' border border-black py-2 px-3 mb-2 w-60 text-black' id='info' name='info'  rows={10} value={produto.fornecedor.info} onChange={(e) => handleChange(e)}/> 
                    <button className='rounded bg-green-400 hover:bg-green-600 dark:bg-dgreen dark:hover:bg-green-800 w-20 h-8 mt-2 ml-40 '  onClick={(e) => saveFornecedor(e)}>Salvar</button>
                  </div>
                </div>
              )}
              </div>    )


}

export default ProdEdit

