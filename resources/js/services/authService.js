import axios from 'axios';
import urljoin from 'url-join';
import { login as loginAction, logout as logoutAction, refresh as refreshAction } from '../slices/authSlice';
import store from '../store';


const getAxiosInstance = (token = null) => {
  return axios.create({
    baseURL: urljoin(process.env.MIX_API_BASE_URL, 'v1/auth'),
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
};

export const login = async (username, password) => {
  return getAxiosInstance()
    .post('login', { username, password })
    .then((response) => {
      if (response.data.access_token) {
        store.dispatch(loginAction({
          token: response.data.access_token,
        }));
      }
    });
};

export const refresh = async (token) => {
  return getAxiosInstance(token)
    .get('refresh')
    .then((response) => {
      if (response.data.token) {
        store.dispatch(refreshAction({
          token: response.data.access_token,
        }));
      }
    });
};

export const me = async (token) => {
  const response = await getAxiosInstance(token)
    .get('me');

  return response.data.username;
};

export const logout = async (token) => {
  return getAxiosInstance(token)
    .get('logout')
    .then(() => {
      store.dispatch(logoutAction());
    });
};

export const checkValidation = async (token,fullname, number, date, email, phone) => {
  const response = await getAxiosInstance(token)
    .post('checkValidation',{fullname, number, date, email, phone});

 
  console.log(response);
  
};