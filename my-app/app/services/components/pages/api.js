import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
});

api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const register = (username, password, email) => {
  return api.post('/register', { username, password, email });
};

export const login = (username, password) => {
  return api.post('/login', { username, password });
};

export const getUserInfo = () => {
  return api.get('/me');
};
