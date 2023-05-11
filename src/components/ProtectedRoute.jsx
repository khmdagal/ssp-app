import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    // Redirect to login page or any other desired route
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if the token exists
  return <div>{children}</div>;
}

export default ProtectedRoute;

/*
import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    
    const token = localStorage.getItem("token");



  return (
    <div>
      
    </div>
  )
}

export default ProtectedRoute
*/
