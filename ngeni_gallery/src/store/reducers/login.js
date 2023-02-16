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
  user: {},
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
