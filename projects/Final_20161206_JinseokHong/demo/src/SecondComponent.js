import React from "react";
import profilephoto from "./image/profilephoto.jpg";

export default () => {
  return (
    <div className="component second-component">
      <h1 className="componentTitle">Jindogliani</h1>
      <div className="paragraphs">
        <img src={profilephoto} className="paragraph" />
        <p className="paragraph">
          Jindogliani <br />
          <br />
          Undergraduate at <br />
          Art & Technology,
          <br />
          Sogang University <br />
          <br />
          Seoul, South Korea
          <br />
        </p>
        <p className="paragraph">
          Languages <br />
          <br />
          한국어 🇰🇷
          <br />
          English 🇬🇧🇺🇸
          <br />
          Français 🇫🇷
          <br />
          日本語 🇯🇵
          <br />
          <br />
          Processing <br />
          Java <br />
          C# <br />
          HTML / CSS / JavaScript - Learning Lately 😊 <br />
        </p>
        <p className="paragraph">
          Skillset <br />
          <br />
          Illustration <br />
          <br />
          Graphic/Layout/Web Design
          <br />
          <br />
          VR / AR
          <br />
          <br />
          Media Art
          <br />
          Front-end Web
          <br />
          <br />
          3D Modeling / Animation
        </p>
        <p className="paragraph">
          Tools <br />
          <br />
          Adobe Illustrator
          <br />
          Adobe Photoshop
          <br />
          Adobe InDesign
          <br />
          Adobe Lightroom
          <br />
          Adobe Premiere Pro
          <br />
          Adobe After Effects
          <br />
          <br />
          Autodesk Maya
          <br />
          <br />
          Unity
          <br />
          Processing
        </p>
        <p className="paragraph">
          Social Media
          <br />
          <br />
          <a href="https://www.instagram.com/jindogliani/">Instagram</a>
          <br />
          <a href="https://www.facebook.com/jinseog.hong">Facebook</a>
          <br />
          <a href="https://www.youtube.com/channel/UCSO9YbM8iaJzhH25kx96O4g?view_as=subscriber">
            Youtube
          </a>
          <br />
          <a href="https://vimeo.com/user71035021">Vimeo</a>
          <br />
          <a href="https://github.com/jindogliani">Github</a>
        </p>
      </div>
    </div>
  );
};
