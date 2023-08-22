import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SiginAndUp.css";

export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      console.log("response status is not okay! investigate");
    }
  }

  return (
    <div className="login-wrapper">
      <Form className="signUp-form" onSubmit={handleSubmit(loginUser)}>
        <h1>Registration Form</h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            {...register("firstname", {
              required: true,
            })}
          />
          {errors.firstname && (
            <p className="errorMsg">First name is required</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            {...register("lastname", {
              required: "Please enter your last name😀",
            })}
          />
          {errors.lastname && <p className="errorMsg">Last name is required</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...register("username", {
              required: true,
              minLength: {
                value: 6,
                message: "Username must be at least 6 character long",
              },
            })}
          />
          {errors.username?.type === "required" && (
            <p className="errorMsg">Username is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="errorMsg">{errors.username.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                checkLength: (passwordValue) => passwordValue.length >= 7,
                matchPattern: (passwordPatternValue) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    passwordPatternValue
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
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please input valid email",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>

        <Button className="btn-signUp" type="submit">
          Sign up
        </Button>
      </Form>
    </div>
  );
}

/*

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
//import { signUpValidations } from "../../helper/Validation";

function SignUpForm() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      console.log("response status is not okay! investigate");
    }
  }

  console.log(firstname, lastname, username, password, email);

  // const handleFirstName = (e) => {
  //   const value = e.target.value;
  //   if (value === "" || value.length < 3) {
  //     alert("First name should more then 3 digit");
  //     // return (
  //     //   <p style={{ color: "#FF0000" }}>First name should more then 3 digit</p>
  //     // );
  //   } else {
  //     setFirstName(value);
  //   }
  // };

  // success and error messages

  // const successMessage = () => {
  //   return (
  //     <div
  //       className="success"
  //       style={{
  //         display: submitted ? "" : "none",
  //       }}
  //     >
  //       <h1>User {name} successfully registered!!</h1>
  //     </div>
  //   );
  // };

  // // Showing error message if error is true
  // const errorMessage = () => {
  //   return (
  //     <div
  //       className="error"
  //       style={{
  //         display: error ? "" : "none",
  //       }}
  //     >
  //       <h1>Please enter all the fields</h1>
  //     </div>
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await loginUser({
     firstname,
     lastname,
     username,
     password,
     email,
   });
  };

  return (
    <div className="login-wrapper">
      <Form className="signUp-form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">First Name</Form.Label>
          <Form.Control
            className="inputFields"
            value={firstname}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Last Name</Form.Label>
          <Form.Control
            className="inputFields"
            value={lastname}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Username</Form.Label>
          <Form.Control
            className="inputFields"
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Email</Form.Label>
          <Form.Control
            className="inputFields"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>

        <Button className="btn-signUp" type="submit">
          Sign up
        </Button>
      </Form>
    </div>
  );
}

export default SignUpForm;


*/
