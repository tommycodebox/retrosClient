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
  TOGGLE_FAILED,
  CHOOSE,
  CHOOSE_FAILED,
  CONN,
  CONN_FAILED,
  START,
  RESET
} from './types';
import { setAlert } from './alert';

// Get all mob retros
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

// Get all retros
export const getAllRetros = () => async dispatch => {
  try {
    const res = await axios.get('/retros/all');

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

export const create = (
  { name, type, todos, awesomes, deltas },
  history
) => async dispatch => {
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
    dispatch(resetNew());
    history.push('/');
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
    dispatch(getAll());
    const editedTodo = res.data.todos.find(t => t._id === todo);
    dispatch(
      setAlert(
        `Todo marked as ${editedTodo.isDone ? 'done' : 'pending'}`,
        'success'
      )
    );
  } catch (err) {
    dispatch({
      type: TOGGLE_FAILED
    });
  }
};

// Choose retro fill type
export const chooseType = ({ type, people }) => dispatch => {
  if (type === 'one') {
    dispatch({
      type: CHOOSE,
      payload: { start: true, isChosen: true, type, people }
    });
  } else if (type === 'mob') {
    dispatch({
      type: CHOOSE,
      payload: { isChosen: true, type, people }
    });
  } else {
    dispatch({
      type: CHOOSE_FAILED
    });
  }
};
export const updateConnected = () => dispatch => {
  dispatch({
    type: CONN
  });
};

export const updateStart = () => dispatch => {
  dispatch({
    type: START
  });
};
export const resetNew = () => dispatch => {
  dispatch({
    type: RESET
  });
};
