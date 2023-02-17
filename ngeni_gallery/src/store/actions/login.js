import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signupUser = (email, password) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const { data } = await axios.post(
      "http://localhost:5000/api/users/signup",
      {
        email,
        password,
      }
    );
    dispatch(signupSuccess(data));
  } catch (error) {
    dispatch(signupFailure(error.response.data.message));
  }
};
