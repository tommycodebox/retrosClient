import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  Toastify({
    text: msg,
    duration: 5000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    // close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    backgroundColor:
      alertType === 'success'
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))',
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function() {} // Callback after click
  }).showToast();

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, 5000);
};
