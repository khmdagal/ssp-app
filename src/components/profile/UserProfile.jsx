import { useState, useEffect } from "react";
import "./ProfileStyle.css";

import Charts from "./Charts";
import UserOverallProgress from "./UserOverallProgress";

export default function UserProfile({ user, updateUserRecord }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [chartData, setChartData] = useState({});

  const getUserOverallProgressData = async (user_id) => {
    try {
      // Perform asynchronous operations, such as fetching data
      const response = await fetch(
        `https://spelling-server.glitch.me/overall_progress_data/${user_id}`
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

  useEffect(() => {
    if (!!user) {
      setUserFirstName(user.firstname);
      setUserLastName(user.lastname);
    }
    getUserOverallProgressData(user.id);
  }, [user]);

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

  }, [updateUserRecord, progressData]);

  const userFullName = `${userFirstName} ${userLastName}`;

  if (!progressData) {
    return <p>Loading...</p>;
  } else if (progressData.length === 0) {
    return <p>No progress data available.</p>;
  }

  return (
    <div>
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
