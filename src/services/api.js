import axios from 'axios';

import { LOGIN_URL, VALIDATE_TOKEN_URL, LOGOUT_URL } from '../constants';
import { store } from '../App';

const instance = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'someProductionURL',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const { accessToken, client, uid } = store.getState().authorization;

    if (accessToken && client && uid) {
      config.headers['access-token'] = accessToken;
      config.headers['client'] = client;
      config.headers['uid'] = uid;
    }

    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => {
    // do something in here, like update a state

    return response;
  },
  error => {
    const errors = error?.response?.data?.errors ?? [];

    if (errors.length > 0) {
      errors.forEach(error => console.log(`%c ${error}`, 'color: red; font-weight: bold'));
    }

    // return Promise.reject(error);
    // return { status: false }; // some custom response?
  },
);

export const userLogin = ({ email, password }) => instance.post(LOGIN_URL, { email, password });
export const checkAuth = () => instance.get(VALIDATE_TOKEN_URL);
export const userLogout = () => instance.delete(LOGOUT_URL);

export default { userLogin, checkAuth };
