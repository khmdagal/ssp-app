import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiginAndUp.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
    } else {
      console.log("response status is not okay! investigate");
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
          <h1>Please Log In Form</h1>

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
            <Button type="submit" data-cy="submitButton">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
