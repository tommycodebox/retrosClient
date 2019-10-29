import axios from 'axios';
import {
  REGISTER,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_FAILED,
  AUTH,
  AUTH_FAILED,
  LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth');

    dispatch({
      type: AUTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAILED
    });
  }
};

// Register user
export const register = ({ name, email, password, mob }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password, mob });

  try {
    const res = await axios.post('/users', body, config);

    dispatch({
      type: REGISTER,
      payload: res.data
    });
    dispatch(setAlert('Registration successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAILED
    });
  }
};
// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth', body, config);

    dispatch({
      type: LOGIN,
      payload: res.data
    });
    dispatch(setAlert('Login successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

// Logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Logged out', 'success'));
};
