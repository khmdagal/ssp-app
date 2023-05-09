import React, { useState } from "react";

import "./App.css";
//import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Login from "./components/Login/LoginForm";

function App() {
  const [token, setToken] = useState("");

  const sendDataToParent = (data) => {
    setToken(data);
  };

  return (
    <div>
      <h1 className="App-header">Authentication test {token}</h1>

       {token ? (
        <Dashboard token={token} />
      ) : (
        <Login sendDataToParent={sendDataToParent} />
      )}  




   {/* <BrowserRouter>
        <Routes>
          {token ? (
            <Route path="/dashboard" element={<Dashboard token={token} />} />
          ) : (
            <Route
              path="/"
              element={<Login sendDataToParent={sendDataToParent} />}
            />
          )}
        </Routes>
      </BrowserRouter>  */}
    </div>
  );
}

export default App;
