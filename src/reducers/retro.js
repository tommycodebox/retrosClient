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
} from '../actions/types';

const initialState = {
  single: null,
  all: null,
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
    case GET_ONE:
    case CREATE:
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
    case CREATE_FAILED:
    default:
      return state;
  }
}
