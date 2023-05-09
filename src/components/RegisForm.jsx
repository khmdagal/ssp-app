import React, { useState } from "react";

//const tokenString = localStorage.getItem('token');
import App from "../App";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/lognin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function LoginForm({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      userName,
      password,
    });
    setToken(token);
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
