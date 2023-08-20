

export function signUpValidations(firstname, lastname, username, password) {
  const correctPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;

  if (firstname === "" || firstname.length > 3) {
    alert("First name should more then 3 digit");
  }
  if (lastname === "" || lastname.length > 3) {
    alert("Last name should more then 3 digit");
  }

  if (username === "" || username.length > 6) {
    alert("Username should more then 6 digit");
  }

  if (password !== correctPassword) {
    alert(
      "password should have at least one number, capital letter and small letter and special character"
    );
  }
}
