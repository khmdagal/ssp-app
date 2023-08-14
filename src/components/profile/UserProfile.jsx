import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./ProfileStyle.css"

import Charts from "./Charts";
import UserOverallProgress from "./UserOverallProgress";

export default function UserProfile({ user }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [chartData, setChartData] = useState({});

  const getUserOverallProgressData = async (user_id) => {
    try {
      // Perform asynchronous operations, such as fetching data
      const response = await fetch(
        `http://localhost:8080/overall_progress_data/${user_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch progress data");
      }

      const overallProgressData = await response.json();
      setProgressData(overallProgressData);
    } catch (error) {
      console.error(error);
      // Handle the error here if needed
    }
  };
console.log(progressData);
  useEffect(() => {
    if (!!user) {
      setUserFirstName(user.firstname);
      setUserLastName(user.lastname);
      setUserId(user.id);
    }
    getUserOverallProgressData(user.id);
  }, [user]); // adding here sessionData variable will help the practice record to be updated with out refreshing the page

  useEffect(() => {

      setChartData({
        labels: progressData.map((data) => data.session_id),
        datasets: [
          {
            label: "Sessions",
            data: progressData.map((data) => data.session_accuracy_percentage),
          },
        ],
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId,progressData]);

  const userFullName = `${userFirstName} ${userLastName}`;
  console.log(userFullName)

 if (!progressData) {
   return <p>Loading...</p>;
 } else if (progressData.length === 0) {
   return <p>No progress data available.</p>;
 }

  return (
    <div>
      <p>
        <FaUserAlt /> {userFullName}
      </p>
      <div className="TableAndCharDiv">
        <UserOverallProgress
          userFullName={userFullName}
          progressData={progressData}
        />
        <Charts chartData={chartData} />
      </div>
    </div>
  );
}
