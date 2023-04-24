class CpfValidação {


    validar(cpf){
        cpf = cpf.replace(/[^\d]+/g, '');

        //Cpf não pode ter o mesmo numero
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
          ) {
            return false;
          }

          //validação de primeiro digito
          let soma = 0;
          let digito1 = 0;
          for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i))*(10-i);
          }
          if (soma%11 > 1){
            digito1 = 11 - (soma%11)
          }
          if (parseInt(cpf.charAt(9)) !== digito1){
            return false;
          }
          console.log(digito1)

          //validação de digito 2

          soma = 0;
          let digito2 = 0;
          for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i))*(11-i);
          }
          if (soma%11 > 1){
            digito2 = 11 - (soma%11)
          }
          if (parseInt(cpf.charAt(10)) !== digito2){
            return false;
          }
          console.log(digito2)

          return true;

    };



}


export default new CpfValidação;