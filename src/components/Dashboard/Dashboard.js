import React from "react";
//import PracticePage from "../words-and-practice/PracticePage";
import Words from "../words-and-practice/GetWords";

export default function Dashboard({ userInfo }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <Words userInfo={userInfo} />
    </div>
  );
}
