import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import retro from './retro';

export default combineReducers({
  alert,
  auth,
  retro
});
