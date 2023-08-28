import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SiginAndUp.css";
import { trimWhiteSpaces } from "../helpers/Helpers";


export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginUser(credentials) {
    const response = await fetch("https://spelling-server.glitch.me/signup", {
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

const onSubmit = (data) => {

  const dataWithNoWhiteSpaces = trimWhiteSpaces(data);
   
    loginUser(dataWithNoWhiteSpaces);
};

  return (
    <div className="login-wrapper">
      <Form className="signUp-form" onSubmit={handleSubmit(onSubmit)}>
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
