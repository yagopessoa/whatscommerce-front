import axios from 'axios';

import { LOGIN_URL } from '../contansts';

const instance = axios.create({
  baseURL:
    window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('user-token')}`
  },
});

instance.interceptors.request.use(
  config => {
    // do something in here, like set auth token
    return config;
  },
  () => {},
);

instance.interceptors.response.use(
  response => {
    // do something in here, like update a state
    return response;
  },
  error => {
    // do something in here, like show an error toast

    const errors = error?.response?.data?.errors ?? [];

    if (errors.length > 0) {
      errors.forEach(error => console.log(`%c ${error}`, 'color: red; font-weight: bold'));
    }

    // return Promise.reject(error);
    // return { status: false }; // some custom response?
  },
);

export const userLogin = ({ email, password }) => instance.post(LOGIN_URL, { email, password });

export default { userLogin };
