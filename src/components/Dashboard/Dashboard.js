import React from "react";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import jwt from "jwt-decode";
import Words from "../words-and-practice/GetWords";
import Logout from "../authentication-Forms/Logout";
import UserOverallProgress from "../profile/UserOverallProgress";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = jwt(token);

const [userFirstName, setUserFirstName] = useState("")
const [userLastName, setUserLastName] = useState("");
const [userId, setUserId] = useState("");

 useEffect(() => {

   if (!!user) {
     setUserFirstName(user.firstname);
     setUserLastName(user.lastname);
     setUserId(user.id);
   }
 }, [user]);

   const userFullname = `${userFirstName} ${userLastName}`;

  return (
    <div>
      <Logout />
      <h2>Dashboard</h2>
      <p> <FaUserAlt /> {userFullname}</p>
      <UserOverallProgress user={user} />
      <Words user={user} />
    </div>
  );
}
