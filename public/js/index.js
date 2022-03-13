/* eslint-disable */
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
// DOM
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const passwordUpdate = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
// VALUES

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.location);
  displayMap(locations);
}

//console.log('Hello from parcel');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

// SETTINGS

if (updateForm) {
  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    //console.log(form);
    updateSettings(form, 'data');
    //const name = document.getElementById('name').value;
    //const email = document.getElementById('email').value;
    //const photo = document.getElementById('photo').value;
    //updateSettings({ name, email, photo }, 'data');
  });
}

if (passwordUpdate) {
  passwordUpdate.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating ...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing ...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
