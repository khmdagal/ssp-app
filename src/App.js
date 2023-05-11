import React, { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Login from "./components/Login/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  //
  const [userInfo, setUserInfo] = useState("");

  const getUserInfoFromLogin = (data) => {
    setUserInfo(data);
  };

  console.log("--->>>", userInfo.id);
  return (
    <div>
      <BrowserRouter>
        <h1 className="App-header">Statutory Spelling Practice</h1>

        <Routes>
          <Route
            path="/"
            element={<Login getUserInfoFromLogin={getUserInfoFromLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard userInfo={userInfo} />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
