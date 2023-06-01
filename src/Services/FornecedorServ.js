import axios from "axios";

const url = "http://localhost:8080/api/v1/fornecedor";

class FornecedorServ {
    saveFornecedor(fornecedor){
        return axios.post(url,fornecedor)
    }
    getProdOfFor(fornecedor) {
        return axios.put(url,fornecedor)
    }
    getForneId(id){
        return axios.get(url+"/"+id)
    }
    updateFornecedor(id,fornecedor){
        return axios.get(url+"/"+id,fornecedor)
    }
}

export default new FornecedorServ;