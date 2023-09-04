import React, { useState } from "react";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";

const SignUpVideo = () => {
  const [display, setDisplay] = useState("none");

  const Video = "https://www.youtube.com/watch?v=_d2ufg0sUo4";

  const onClick = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };
  //

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
