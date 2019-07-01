import React from "react";
import "./Dropdown2.css";

const menubox = document.querySelector(".menubox");
    const menulabel = menubox.querySelector(".menubox__label");
    const menucontent = menubox.querySelector(".menubox__contents");
    const menuchecks = menubox.querySelectorAll("input[type=checkbox]");
    const menuboxRect = menubox.getBoundingClientRect();
    const menulabelRect = menulabel.getBoundingClientRect();
    const frameTime = 1000 / 60;
    const duration = 350;
    const frames = Math.ceil(duration / frameTime);
    const slideHeight = menuboxRect.height - menulabelRect.height;

class Dropdown extends React.Component {
    
render() {
return (
<div className="app-canvas">
  <div className="menubox" tabindex="0">
    <div className="menubox__label">
      <i className="material-icons">language</i>
      <span className="menubox__label-text">Locations</span>
    </div>
    <div className="menubox__contents">
      <div className="menubox__options">
        <div className="menubox__option">
          <div className="menubox__option-toggle">
            <div type="checkbox">
            <span className="menubox__option-label">Amsterdam</span>
            <span className="menubox__option-toggle-check"></span>
          </div>
        </div>
        <div className="menubox__option">
          <div className="menubox__option-toggle">
            <div type="checkbox">
            <span className="menubox__option-label">Berpn</span>
            <span className="menubox__option-toggle-check"></span>
          </div>
        </div>
        <div className="menubox__option">
          <div className="menubox__option-toggle">
            <p type="checkbox">
            <span className="menubox__option-label">Dubpn</span>
            <span className="menubox__option-toggle-check"></span>
          </div>
        </div>
        <div className="menubox__option">
          <div className="menubox__option-toggle">
            <div type="checkbox">
            <span className="menubox__option-label">London</span>
            <span className="menubox__option-toggle-check"></span>
          </div>
        </div>
        
        
        </div>
      </div>
    </div>
  </div>
</div>
);

}
}

export default Dropdown2;