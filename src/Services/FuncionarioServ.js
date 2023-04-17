import axios from "axios";

const URL_DE_FUNCIONARIO = "http://localhost:8080/api/v1/func";

class FuncionarioServ{
    
    saveFucionario(funcionario){
        return axios.post(URL_DE_FUNCIONARIO, funcionario)
    };

    getAllFunc(){
       return axios.get(URL_DE_FUNCIONARIO);
    };
    deleteFuncionario(id) {
        return axios.delete(URL_DE_FUNCIONARIO + "/" + id);
      };
    getFunc(id){
        return axios.get(URL_DE_FUNCIONARIO+"/"+id);
    }
    updateFunc(funcionario, id){
        return axios.post(URL_DE_FUNCIONARIO+"/" + id, funcionario);
    }
}



export default new FuncionarioServ; 