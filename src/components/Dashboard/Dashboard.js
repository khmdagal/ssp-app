import React from "react";
import jwt from "jwt-decode";
import Words from "../words-and-practice/GetWords";
import Logout from "../authentication-Forms/Logout";
import UserOverallProgress from "../profile/UserOverallProgress";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = jwt(token);

  return (
    <div>
      <Logout />
      <h2>Dashboard</h2>

      <UserOverallProgress user={user} />
      <Words user={user} />
    </div>
  );
}
