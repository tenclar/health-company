import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });
const abort = axios.CancelToken;
export { api, abort };
export default api;
