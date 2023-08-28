import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SiginAndUp.css";
import SingInSpinner from "../spinners/SingInSpinner";
import { trimWhiteSpaces } from "../helpers/Helpers";

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchLoginDetails(credentials) {
    const response = await fetch("https://spelling-server.glitch.me/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      //Reading error messages coming from the server
      const getErrorFromResponse = await response.json();
      getErrorFromResponse.error === "Invalid username"
        ? setInvalidUsername("Invalid username")
        : setInvalidPassword("Invalid password");
    }

    if (response.ok) {
      setLoader(false);
      const data = await response.json();
      localStorage.setItem("token", data.token);
      // to navigate the dashboard
      navigate("/dashboard");
    }
  }

  const onSubmit = (data) => {
    setLoader(true);

    const dataWithNoWhiteSpaces = trimWhiteSpaces(data);

    setTimeout(() => {
      fetchLoginDetails(dataWithNoWhiteSpaces);
    }, 5000);
  };

  return (
    <div className="login-wrapper">
      {loader && <SingInSpinner />}
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
          {invalidUsername && <p className="errorMsg">{invalidUsername}</p>}
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
              npm Password should be at-least 7 characters.
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
          {invalidPassword && <p className="errorMsg">{invalidPassword}</p>}
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