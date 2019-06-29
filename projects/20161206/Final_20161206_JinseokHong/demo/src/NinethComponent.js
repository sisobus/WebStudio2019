import React from "react";
import ReactPlayer from "react-player";

export default () => {
  return (
    <div className="component nineth-component">
      <h1 className="componentTitle">3D Modeling / Animation</h1>
      <div className="VideoContainer">
        <ReactPlayer url="https://youtu.be/QPU83UsEyv0" controls />
      </div>
    </div>
  );
};
