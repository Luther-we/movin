import decode from "jwt-decode";

const domain = "http://localhost:8081/user";

const authFetch = (url, options) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (loggedIn()) {
    headers["Authorization"] = "Bearer " + getToken();
  }

  return fetch(url, {
    headers,
    ...options,
  })
    .then(_checkStatus)
    .then((res) => res.json());
};

export const login = ({ email, password, res, rej }) => {
  authFetch(`${domain}/login`, {
    method: "POST",
    // headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((data) => {
      setToken(data.token);
      res(data);
    })
    .catch((e) => {
      rej(e);
    });
};

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
    console.log("expired check failed! Line 42: AuthService.js");
    return false;
  }
};

const getToken = () => localStorage.getItem("id_token");

const setToken = (token) => localStorage.setItem("id_token", token);

const _checkStatus = (res) => {
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
