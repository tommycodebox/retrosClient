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
  DELETE,
  DELETE_FAILED,
  CONN,
  CONN_FAILED,
  START,
  RESET
} from '../actions/types';

const initialState = {
  single: null,
  all: null,
  new: {
    isChosen: false,
    type: null,
    people: null,
    connected: 1,
    start: false,
    completed: false
  },
  latest: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL:
      return {
        ...state,
        all: payload,
        loading: false
      };
    case CREATE:
      return {
        ...state,
        single: payload,
        loading: false,
        new: {
          ...state.new,
          completed: true
        }
      };
    case GET_ONE:
    case TOGGLE:
      return {
        ...state,
        single: payload,
        loading: false
      };
    case GET_LATEST:
      return {
        ...state,
        latest: payload,
        loading: false
      };
    case DELETE:
      return {
        ...state,
        single: null,
        all: state.all.filter(retro => retro.id !== payload)
      };
    case GET_ALL_FAILED:
    case GET_ONE_FAILED:
      return {
        ...state,
        all: null,
        single: null,
        latest: null,
        loading: false
      };
    case GET_LATEST_FAILED:
      return {
        ...state,
        latest: null,
        loading: false
      };
    case CHOOSE:
      return {
        ...state,
        new: {
          ...state.new,
          ...payload
        }
      };
    case CONN:
      return {
        ...state,
        new: {
          ...state.new,
          connected: state.new.connected + 1
        }
      };
    case START:
      return {
        ...state,
        new: {
          ...state.new,
          start: true
        }
      };
    case RESET:
      return {
        ...state,
        new: {
          isChosen: false,
          type: null,
          people: null,
          connected: 1,
          start: false,
          completed: false
        }
      };
    case DELETE_FAILED:
    case TOGGLE_FAILED:
    case CREATE_FAILED:
    default:
      return state;
  }
}
