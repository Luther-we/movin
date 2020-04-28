import { loggedIn, getToken, _checkStatus} from '../auth/authHelperMethods'



export async function postFetch(url, body) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (loggedIn()) {
    headers["Authorization"] = "Bearer " + getToken();
  }
  
  return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(_checkStatus)
      .then(res => res.json())
      
  }