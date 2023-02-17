import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/login.js";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
