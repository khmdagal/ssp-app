import Table from "react-bootstrap/Table";
import "./ProfileStyle.css";

export default function UserOverallProgress({ progressData, userFullName }) {


 

  return (
   
      <Table className="dataTable" striped bordered hover>
        <thead>
          <tr>
            <th colSpan={2}>{`${userFullName} Sessions Record Progress`}</th>
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
      </Table>
  );
}
