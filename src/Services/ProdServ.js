import axios from "axios";
const URL = "http://localhost:8080/api/v1/produtos";
const URL_FOR = "http://localhost:8080/api/v1/fornecedor";
class ProdServ {
    getAllProd() {
       return axios.get(URL)
    }

    saveProd(produto){
        return axios.post(URL,produto)
    }

    getAllFornecedor(){
        return axios.get(URL_FOR)
    }
    getProduto(id){
        return axios.get(URL+"/"+id)
    }

    editProduto(id,produto){
        return axios.post(URL+"/"+id+"/edit",produto)
    }
    deleteProd(id){
        return axios.delete(URL+"/"+id)
    }
}

export default new ProdServ