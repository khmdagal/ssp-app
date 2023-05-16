import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Login from "./components/authentication-Forms/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInSignUpForms from "./components/authentication-Forms/SignInSignUpForms";

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1 className="App-header">Statutory Spelling Practice</h1>

        <Routes>
          <Route path="/" element={<SignInSignUpForms />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
