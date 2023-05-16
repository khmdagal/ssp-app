import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    // Redirect to login page
    return <Navigate to="/" replace />;
  }
  if (!!token) {
    return <div>{children}</div>;
  }
  // Render the dashboard if the token exists
}

export default ProtectedRoute;
