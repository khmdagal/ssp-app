import { useState, useEffect } from "react";

export default function UserOverallProgress({ user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(user.id);
  const [sessionData, setSessionsData] = useState("");
  const [progressData, setProgressData] = useState([]);

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

  useEffect(() => {
    
    if (!!user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setUserId(user.id);
    }
    getUserOverallProgressData(user.id);
    
  }, [user, userId]);// adding here sessionData variable will help the practice record to be updated with out refreshing the page




  if (!progressData) {
    return <p>Loading...</p>;
  } else if (progressData.length === 0) {
    return <p>No progress data available.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              colSpan={2}
            >{`${firstName} ${lastName} Sessions Record Progress`}</th>
          </tr>
          <tr>
            <th>Session Number</th>
            <th>Session Score Percentage</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((data) => (
            <tr key={data.session_id}>
              <td>{data.session_id}</td>
              <td>{data.session_accuracy_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
