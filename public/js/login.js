/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    //console.log(email, password);
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    //console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  //console.log('test');
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (error) {
    //console.log(error);
    showAlert('error', 'Error logging out! Try again');
  }
};
