import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login({ getUserInfoFromLogin }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //const [token, setToken] = useState("");

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("token", data.token);

      // to navigate the
      navigate("/dashboard");
      console.log(localStorage.getItem("token"));

      //setToken(data);
      getUserInfoFromLogin(data.user); // Pass the token data back to the App component
    } else {
      // Handle login error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

/*
import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data);
      props.sendDataToParent(token); // Pass the token data back to the App component
    } else {
      console.log("ther is error");
    }

    // .then((response) => response.json()) // Extract JSON data from the response
    // .then((data) => setToken(data));
  }
  //JS LOCAL STORAGE  IN LINE 17

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };
  if (!!token) console.log(token);
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
*/
