import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiginAndUp.css";
import SingInSpinner from "../spinners/SingInSpinner";


export default function Login() { 
  const navigate = useNavigate();
  const [loader, setLoader]= useState(false)
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // console.log("response status is not okay! investigate");
      console.log("===>>>",loader)
      setLoader(true)
     setTimeout(() => {
        alert("Incorrect Login details");
      }, 5000)
      
     
    } else {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      // to navigate the
      navigate("/dashboard");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((previousEntries) => ({
      ...previousEntries,
      [name]: value
    }));
}

  
  const handleSubmit = e => {
    e.preventDefault();
    setTimeout(() => {
     loginUser(loginData);
    }, 5000);
    
    console.log(loginData)
  }

  
    return (
      <div>
        {loader ? <SingInSpinner /> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-control">
            <label></label>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );

}


/*

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiginAndUp.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SingInSpinner from "../spinners/SingInSpinner";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)

//   const showloginErrorMessage = (errorMessage) => {
//    return errorMessage
//  }

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/logi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // console.log("response status is not okay! investigate");
      alert("Incorrect Login details");
      setUserName("");
      setPassword("");
      setLoader(true);
    } else {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      // to navigate the
      navigate("/dashboard");
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
    <>
      <div className="login-wrapper">
        <Form className="signIn-form" onSubmit={handleSubmit}>
          <h1>Log In Form</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="labels">Username</Form.Label>
            <Form.Control
              className="inputFields"
              value={username}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              data-cy="userNameInputField"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="labels">Password</Form.Label>
            <Form.Control
              className="inputFields"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              data-cy="passwordInputField"
            />
          </Form.Group>

          <div>
            <Button className="btn-signIn" type="submit" data-cy="submitButton">
              Sign in
            </Button>
            
          </div>
        </Form>
      </div>
    </>
  );
}



*/