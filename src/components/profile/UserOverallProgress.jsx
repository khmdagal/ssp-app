import { useState, useEffect } from "react";

export default function UserOverallProgress({ user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(user.id);
  const [sessionData, setSessionsData] = useState("");

  const [progressData, setProgressData] = useState([]);

  try {
    // to get the specific user progress data
    const getUserOverallProgressData = async () => {
      const progressData = await fetch(
        `http://localhost:8080/overall_progress_data/${userId}`
      );
      const overallProgressData = await progressData.json();

      setProgressData(overallProgressData);
    };

    // to get most updated sessions data
    const updateSessionsRecordData = async () => {
      const getData = await fetch(`http://localhost:8080/sessions_data`);
      const sessionsData = await getData.json();

      setSessionsData(sessionsData);
    };

    useEffect(() => {
      if (!!user) {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setUserId(user.id);
      }

      getUserOverallProgressData();
      updateSessionsRecordData();
    }, [user]);
  } catch (error) {
    console.error(error);
  }

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
