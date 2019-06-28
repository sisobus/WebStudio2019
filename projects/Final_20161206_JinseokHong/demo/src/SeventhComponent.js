import React from "react";
import photo1 from "./image/photo1.png";
import photo2 from "./image/photo2.png";
import photo3 from "./image/photo3.png";
import photo4 from "./image/photo4.png";

export default () => {
  return (
    <div className="component second-component">
      <h1 className="componentTitle">Photographed</h1>
      <div className="photocontainer">
        <img src={photo1} className="photo" />
        <img src={photo2} className="photo" />
        <img src={photo3} className="photo" />
        <img src={photo4} className="photo" />
      </div>
    </div>
  );
};
