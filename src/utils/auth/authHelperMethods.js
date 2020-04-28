import decode from "jwt-decode";
import { postFetch } from '../fetch/fetchMethods'

const domain = "http://localhost:8081/user";


export const login = ({ email, password}) => {
  return postFetch(`${domain}/login`, {email: email, password: password})
  .then((data) => {
    _setToken(data.token);
    return data;
  })
  .catch((e) => {
    throw(e)
  });
}

export const logout = () => localStorage.removeItem("id_token");

export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && isTokenExpired(token); // handwaiving here
};

const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp > Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      console.log("expired check failed! Line 42: AuthService.js", err);
      return false;
    }
};

export const getToken = () => localStorage.getItem("id_token");

export const _setToken = (token) => localStorage.setItem("id_token", token);

export const _checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    var error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
};

export const getConfirm = () => {
  let answer = decode(getToken());
  return answer;
};
