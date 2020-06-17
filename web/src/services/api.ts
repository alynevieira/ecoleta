import axios from 'axios';

// e não o fetch, usa o axios para usar uma baseurl que vai se repetir por todas as requisições
// quando for trocar a url, a alteração aqui muda em todos os lugares
const api = axios.create({
    baseURL: 'http://192.168.1.66:3333'
});

export default api;