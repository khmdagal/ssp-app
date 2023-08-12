import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";

export default function UserDetails({ User}) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userId, setUserId] = useState("")

  useEffect(() => {
  
    if (!!User) {
      setUserFirstName(User.firstname);
      setUserLastName(User.lastname);
      setUserId(User.id);
    }
  }, [User]);

  const userFullname = `${userFirstName} ${userLastName}`;
  return (
    <div>
      <p>
        <FaUserAlt /> {userFullname}
      </p>
    </div>
  );
}
