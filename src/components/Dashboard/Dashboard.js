import React from "react";
import PracticePage from "../words-and-practice/PracticePage";
import Words from "../words-and-practice/GetWords";

export default function Dashboard({ token }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        welcome {token.firstname} {token.lastname} ...
      </p>
      <Words />
      {/* <PracticePage /> */}
    </div>
  );
}
