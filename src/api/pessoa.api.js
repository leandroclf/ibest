import { apiCaller } from '@/api/apiCaller';
import { config } from '@/api/urls';

const cadastrarPessoa = (dadosPessoa) => apiCaller.post('/pessoa/cadastrarpessoa', config.apiHost, dadosPessoa); 

export const pessoaApi = {
    cadastrarPessoa,
};
