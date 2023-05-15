import axios, { Axios } from "axios";

const URL_DE_CLIENTE = "http://localhost:8080/api/v1/cliente";

class ClientesServ{
    
    savePessoa(pessoa){
        return axios.post(URL_DE_CLIENTE, pessoa);
    };

    getAllPessoa(){
       return axios.get(URL_DE_CLIENTE);
    };
    deletePessoa(id) {
        return axios.delete(URL_DE_CLIENTE+ "/" + id);
      };
    getPessoa(id){
        return axios.get(URL_DE_CLIENTE+"/"+id);
    }
    updatePessoa(pessoa, id){
        return axios.post(URL_DE_CLIENTE+"/" + id, pessoa);
    }
    isFunc(id) {
        return axios.put(URL_DE_CLIENTE+ "/" + id)
    }
}



export default new ClientesServ;