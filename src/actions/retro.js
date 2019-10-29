import axios from 'axios';
import {
  GET_ALL,
  GET_ALL_FAILED,
  GET_ONE,
  GET_ONE_FAILED,
  GET_LATEST,
  GET_LATEST_FAILED,
  CREATE,
  CREATE_FAILED,
  TOGGLE,
  TOGGLE_FAILED
} from './types';
import { setAlert } from './alert';

// Get all retros
export const getAll = () => async dispatch => {
  try {
    const res = await axios.get('/retros');

    dispatch({
      type: GET_ALL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_FAILED
    });
  }
};

// Get latest retro
export const getLatest = () => async dispatch => {
  try {
    const res = await axios.get('/retros/latest');

    dispatch({
      type: GET_LATEST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LATEST_FAILED
    });
  }
};

// Get one retro
export const getOne = id => async dispatch => {
  try {
    const res = await axios.get('/retros/' + id);

    dispatch({
      type: GET_ONE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ONE_FAILED
    });
  }
};

// Create retro

export const create = ({
  name,
  type,
  todos,
  awesomes,
  deltas
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    type,
    todos,
    awesomes,
    deltas
  });

  try {
    const res = await axios.post('/retros', body, config);

    dispatch({
      type: CREATE,
      payload: res.data
    });
    dispatch(setAlert('Retro created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_FAILED
    });
  }
};

// Toggle

export const toggle = (retro, todo) => async dispatch => {
  try {
    const res = await axios.patch(`/retros/${retro}/todo/${todo}`);

    dispatch({
      type: TOGGLE,
      payload: res.data
    });
    dispatch(setAlert('Todo updated', 'success'));
  } catch (err) {
    dispatch({
      type: TOGGLE_FAILED
    });
  }
};
