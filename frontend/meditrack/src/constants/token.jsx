// token.js

let token = "";

function setToken(newToken) {
  token = newToken;
  // Save token to localStorage or sessionStorage
  localStorage.setItem('token', token);
  // Alternatively, you can use sessionStorage if you want the token to be session-based
  // sessionStorage.setItem('token', token);
}

function retrieveToken() {
  // Retrieve token from localStorage or sessionStorage
  const storedToken = localStorage.getItem('token');
  // Alternatively, you can use sessionStorage if you used it to save the token
  // const storedToken = sessionStorage.getItem('token');
  //console.log("stored Token : "+ storedToken);
  return storedToken || "";
}

export { setToken, retrieveToken };
