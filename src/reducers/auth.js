import {
  REGISTER,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_FAILED,
  AUTH,
  AUTH_FAILED,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuth: false,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };
    case REGISTER:
    case LOGIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case AUTH_FAILED:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
