import React from "react";
// import Scroll from "react-scroll";

import { Pager } from "react-bootstrap";
import ReactPageScroller from "../../src/index";
import { Menu, Dropdown, Affix, Button } from "antd";

import "./JindolDropdown.css";

import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import FifthComponent from "./FifthComponent";

// const Link = Scroll.Link;
// const Element = Scroll.Element;

export default ({ goToPage }) => (
  <div>
    <div>
      <Pager.Item eventKey={0} onSelect={goToPage}>
        타이틀1
      </Pager.Item>
    </div>
    <div>
      <Pager.Item eventKey={1} onSelect={goToPage}>
        ㄴ=김버그짱
      </Pager.Item>
    </div>
  </div>
);
