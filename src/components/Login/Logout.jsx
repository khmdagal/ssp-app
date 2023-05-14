import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    console.log("logout is clicked");
    navigate("/");
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
