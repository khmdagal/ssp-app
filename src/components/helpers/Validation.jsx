export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  if (password.length < 6) {
    return "Password must be at least 7 character long";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain al least one uppercase letter";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character";
  }

  // if password is valid return nothing
  return "";
}
