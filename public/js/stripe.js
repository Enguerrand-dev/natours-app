/* eslint-desabdle */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51KcplvHIZxiA3tW8zDpZIDBPGCqoWWbC4CMsWdG3ivrEwoabL8sYLy5hx8sUKG9wP1hlTRM43yZxhsbz6MSrZCOy00js9HaGuF'
);

export const bookTour = async tourId => {
  try {
    // 1) Get the session checkout from the server

    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
    console.log(session);
  } catch (err) {
    showAlert('error', err);
  }
};
