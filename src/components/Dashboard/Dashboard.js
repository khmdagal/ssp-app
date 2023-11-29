import React from "react";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import jwt from "jwt-decode";
import UserProfile from "../profile/UserProfile";
import Logout from "../authentication-Forms/Logout";
import GetWords from "../words-and-practice/GetWords";
import './dashboard.css'


export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = jwt(token);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [updateUserRecord, setUpdateUserRecord] = useState();
  const [selectedYearsWords, setSelectedYearsWords] =
    useState("year3and4words");

  useEffect(() => {
    if (!!user) {
      setUserFirstName(user.firstname);
      setUserLastName(user.lastname);
    }
  }, [user]);

  const handleSelectedYearWords = (e) => {
    e.preventDefault();
    const selectedYears = e.target.value;
    setSelectedYearsWords(selectedYears);
  };

 
  const userFullname = `${userFirstName} ${userLastName}`;

  return (
    <div>
      <Logout  />
      <h2>Dashboard</h2>
      {/* think about react route here */}
      <p>
        {" "}
        <FaUserAlt /> {userFullname}
      </p>

      <div  class="dropdown">
        <label for="floatingSelect">Select spelling words for </label>
        <select
          // class="btn btn-secondary"
          aria-expanded="false"
          id="wordsOption"
          name="wordsOption"
          onChange={handleSelectedYearWords}
        >
          <option value="year3and4words">Year 3 & 4 spelling words</option>
          <option value="year5and6words">Year 5 & 6 spelling words</option>
        </select>
      </div>

      {/* <div>
        <label htmlFor="wordsOption">Select the year</label>
        <select
          name="wordsOption"
          id="wordsOption"
          onChange={handleSelectedYearWords}
        >
          <option value="year3and4words">year 3 & 4 words</option>
          <option value="year5and6words">year 5 & 6 words</option>
        </select>
      </div> */}

      <UserProfile updateUserRecord={updateUserRecord} user={user} />
      <GetWords
        selectedYearsWords={selectedYearsWords}
        setUpdateUserRecord={setUpdateUserRecord}
        user={user}
      />
    </div>
  );
}
