import axios from 'axios';

import {
  LOGIN_URL,
  SIGNUP_URL,
  VALIDATE_TOKEN_URL,
  LOGOUT_URL,
  SHOW_COMPANY_URL,
} from '../constants';
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

    // console.log('error object ->\n', error?.response?.data);

    const { full_messages } = errors;

    if (full_messages) {
      console.log(`%c ${full_messages[0]}`, 'color: red; font-weight: bold');
    } else if (errors.length > 0) {
      errors.forEach(error => console.log(`%c ${error}`, 'color: red; font-weight: bold'));
    }
    // TODO: set above message in store to show an error alert/toast

    // return Promise.reject(error);
    // return { status: false }; // some custom response?
  },
);

export const userLogin = credentials => instance.post(LOGIN_URL, { ...credentials });

export const userSignup = ({ passwordConfirmation: password_confirmation, ...rest }) => {
  return instance.post(SIGNUP_URL, { password_confirmation, ...rest });
};

export const checkAuth = () => instance.get(VALIDATE_TOKEN_URL);

export const userLogout = () => instance.delete(LOGOUT_URL);

export const getCompany = () => instance.get(SHOW_COMPANY_URL);

export default { userLogin, userSignup, checkAuth, userLogout, getCompany };
