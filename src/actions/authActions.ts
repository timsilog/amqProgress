import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  CLEAR_ERRORS,
  SET_CURRENT_SONG,
  ActionType
} from "./actionTypes";
import { UserData, Song } from '../types';

// const url = `https://serene-temple-88689.herokuapp.com`
const url = `http://localhost:4000`;

// Register User
export const registerUser = (userData: UserData, history: any) => async (dispatch: any) => {
  const response = await fetch(`${url}/accounts/register`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (response.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: data
    });
    return;
  }
  history.push({ // re-direct to login on successful register
    pathname: '/login',
    state: { justRegistered: true }
  });
}


// Login - get user token
export const loginUser = (userData: UserData) => async (dispatch: any) => {
  const response = await fetch(`${url}/accounts/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  // Check for error
  if (response.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: data
    });
    return;
  }
  // Otherwise save to localStorage
  // Set token to localStorage
  const { token } = data;
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
};

export const clearErrors = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

// Set current song
export const setCurrentSong = (song: Song) => (dispatch: any) => {
  console.log('asdasd');
  dispatch({
    type: SET_CURRENT_SONG,
    payload: song
  })
}

// Set logged in user
export const setCurrentUser = (decoded: any): ActionType => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = (): ActionType => {
  return {
    type: USER_LOADING
  };
};

// Log user out
// 'any' required here due to some typescript redux issue
export const logoutUser = (): any => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken('');
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

