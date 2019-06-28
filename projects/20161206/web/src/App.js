import React from "react";
import Scroll from "react-scroll";
import logo from "./logo.svg";
import i1 from "./images/i1.png";
import i2 from "./images/i2.png";
import i3 from "./images/i3.png";
import p1 from "./images/p1.png";
import p2 from "./images/p2.png";
import JindolDropdown from "./components/JindolDropdown";
import Articles from "./components/Articles";
import "./components/JindolDropdown.css";
import "./App.css";

const Link = Scroll.Link;
const Element = Scroll.Element;

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <Element name="test1" className="element">
            test 1
          </Element>

          <Element name="test2" className="element">
            test 2
          </Element>

          <Element name="test3" className="element">
            test 3
          </Element>

          <Element name="test4" className="element">
            test 4
          </Element>

          <Element name="test5" className="element">
            test 5
          </Element>
        </div>

        <header className="App-header">
          <a className="shortcut" href="/#illust3">
            test
          </a>
          <JindolDropdown />
          <p>__________ by Jindogliani in Korea.</p>
          <img src={i1} className="illust" alt="logo" id="illust1" />
          <img src={i1} className="illust" alt="logo" id="illust1" />
          <img src={i1} className="illust" alt="logo" id="illust1" />
          <img src={i1} className="illust" alt="logo" id="illust1" />
          <div className="articlesholder">
            <div className="image-container">
              <img src={i2} className="illust" alt="logo" id="illust2" />
              <p> hihihi</p>
            </div>
            <div className="image-container">
              <img src={i1} className="illust" alt="img" id="illust1" />
              <p> hihihi asdas d</p>
            </div>
            <img src={i3} className="illust" alt="logo" id="illust3" />
            <img src={p1} className="illust" alt="logo" id="illust3" />
            <img src={p2} className="illust" alt="logo" id="illust3" />
            <img src={i3} className="illust" alt="logo" id="illust3" />
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <img src={logo} className="App-logo" alt="logo" />
          <Articles />
        </header>
      </div>
    );
  }
}

export default App;
