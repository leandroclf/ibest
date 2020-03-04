import { apiCaller } from '@/api/apiCaller';

const getCep = (cep) => apiCaller.getFullUrl(`https://viacep.com.br/ws/${cep}}/json`); 

export const cepApi = {
    getCep,
};
