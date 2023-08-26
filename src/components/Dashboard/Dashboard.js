import React from "react";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import jwt from "jwt-decode";
import UserProfile from "../profile/UserProfile";
import Logout from "../authentication-Forms/Logout";
import GetWords from "../words-and-practice/GetWords";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = jwt(token);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [updateUserRecord, setUpdateUserRecord] = useState()
 
  

  useEffect(() => {
    if (!!user) {
      setUserFirstName(user.firstname);
      setUserLastName(user.lastname);
    }
  }, [user]);

  const userFullname = `${userFirstName} ${userLastName}`;

  return (
    <div>
      <Logout />
      <h2>Dashboard</h2>
      {/* think about react route here */}
      <p>
        {" "}
        <FaUserAlt /> {userFullname}
      </p>
      <UserProfile updateUserRecord={updateUserRecord} user={user} />
      <GetWords setUpdateUserRecord={setUpdateUserRecord} user={user} />
    </div>
  );
}
