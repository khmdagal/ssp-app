import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Button from "react-bootstrap/Button";

function SignInSignUpForms() {
  const [signInForm, setSigninForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState("");

  let theForm;
  if (signInForm === true) {
    theForm = <LoginForm />;
  } else if (signUpForm === true) {
    theForm = <SignUpForm />;
  }

  return (
    <>
      {theForm}
      <div className="d-grid gap-2 col-6 mx-auto">
        <Button
          className="btn btn-primary"
          onClick={() => {
            setSigninForm(true);
            setSignUpForm(false);
            console.log(signInForm);
          }}
        >
          Sign In
        </Button>
        <button
          className="btn btn-success"
          onClick={() => {
            setSigninForm(false);
            setSignUpForm(true);
            console.log(signUpForm);
          }}
        >
          Sign Up
        </button>
        <p>Not Registered? Sign Up Here</p>
      </div>
    </>
  );
}

export default SignInSignUpForms;
