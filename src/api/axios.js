import axios from 'api/axios';

const instance = axios.create({
  baseURL: '/',
  headers: {},
});

export default instance;
