import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alert';
// updateData and call fonction dans l'index
console.log('hey');

export const updateSettings = async (data, type) => {
  try {
    //console.log(data);
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url: url,
      data
    });
    //console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
    //console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
