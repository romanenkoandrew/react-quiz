import axios from "axios";
import { API_KEY } from "../../Constants/Constants";
import { ActionTypes } from "./ActionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = { email, password, returnSecureToken: true };
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    const response = await axios.post(url, authData);
    const { data } = response;
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function authSuccess(token) {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    token,
  };
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}
export function autoLogout(time) {
  return (dispatch) => {
    setTimeout((dispatch) => {
      dispatch(logout());
    }, time * 1000);
  };
}
export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
