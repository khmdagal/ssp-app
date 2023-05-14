import React from "react";
import jwt from "jwt-decode";
import Words from "../words-and-practice/GetWords";
import Logout from "../Login/Logout";

export default function Dashboard() {
  const token = localStorage.getItem("token") 
const user = jwt(token);

  return (
    <div>
      <Logout />
      <h2>Dashboard</h2>
      <Words user={user} />
    </div>
  );
}
