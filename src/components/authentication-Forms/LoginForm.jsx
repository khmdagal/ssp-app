import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SiginAndUp.css";
//import SingInSpinner from "../spinners/SingInSpinner";

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchLoginDetails(credentials) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // console.log("response status is not okay! investigate");
      console.log("===>>>", loader);
      setLoader(true);
      setTimeout(() => {
        alert("Incorrect Login details");
      }, 5000);
    } else {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      // to navigate the
      navigate("/dashboard");
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    //fetchLoginDetails(data)
  };

  return (
    <div className="login-wrapper">
      <Form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <label className="labels">Username</label>
          <Form.Control
            type="text"
            name="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must be at least 6 character long",
              },
            })}
          />
          {errors.username && (
            <p className="errorMsg">{errors.username.message} </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <label className="labels">Password</label>
          <Form.Control
            type="text"
            name="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length > 7,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 7 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <ul className="errorMsg">
              <li>Password must be at least 7 characters long</li>
              <li>At least one number 0-9</li>
              <li>At least one Uppercase Letter A-Z</li>
              <li>At lease one lowercase letter a-z</li>
              <li>At lease one special characters !@#$* </li>
            </ul>
          )}
        </Form.Group>
        <div>
          <Button className="btn-signIn" type="submit" data-cy="submitButton">
            Sign in
          </Button>
        </div>
      </Form>
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
