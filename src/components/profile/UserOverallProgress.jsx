import { useState, useEffect } from "react";

export default function UserOverallProgress({ user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(user.id);
 

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

   

    useEffect(() => {
      if (!!user) {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setUserId(user.id);
      }

      getUserOverallProgressData();
     
    }, [user]);
  } catch (error) {
    console.error(error);
  }

  if (!progressData) {
    return <p>Loading...</p>;
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
