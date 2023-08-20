import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { signUpValidations } from "../../helper/Validation";

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
    if (!signUpValidations(firstname, lastname, username, password)) {
      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
      setEmail("");

     alert(`
      1) First and Last names should be more 3 characters.
      2) Username should be more then 6 characters.
      3) Password should contain at :
                  * At least one number.
                  * At least one capital letter. 
                  * At least one small letter.
                  * At least one special character.
      `);
    } else {
      await loginUser({
        firstname,
        lastname,
        username,
        password,
        email,
      });
    }
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
