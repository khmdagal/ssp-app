import React, { useState } from "react";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import Video from "../tutorials/SignInExp.mp4";
const SignUpVideo = () => {
  const [display, setDisplay] = useState("none");

  const onClick = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <div>
      <Button onClick={onClick}>Example Video</Button>
      <ReactPlayer
        style={{ display: `${display}` }}
        url={`${Video}`}
        width="200px"
        height="200px"
        controls
      />
    </div>
  );
};

export default SignUpVideo;
