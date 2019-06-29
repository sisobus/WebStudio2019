import React from "react";
import { Pager } from "react-bootstrap";
import ReactPageScroller from "../../src/index";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import FifthComponent from "./FifthComponent";
import SixthComponent from "./SixthComponent";
import SeventhComponent from "./SeventhComponent";
import EighthComponent from "./EighthComponent";
import NinethComponent from "./NinethComponent";
import JindolDropdown from "./JindolDropdown";
import "./index.css";

export default class FullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    this._pageScroller = null;
  }

  goToPage = eventKey => {
    this._pageScroller.goToPage(eventKey);
  };

  pageOnChange = number => {
    this.setState({ currentPage: number });
  };

  render() {
    return (
      <React.Fragment>
        <JindolDropdown goToPage={this.goToPage} />
        <ReactPageScroller
          ref={c => (this._pageScroller = c)}
          pageOnChange={this.pageOnChange}
        >
          <FirstComponent />
          <SecondComponent />
          <ThirdComponent />
          <FourthComponent />
          <FifthComponent />
          <SixthComponent />
          <SeventhComponent />
          <EighthComponent />
          <NinethComponent />
        </ReactPageScroller>
        {/* <Pager className="pagination-additional-class" bsSize="large">
          {pagesNumbers}
        </Pager> */}
      </React.Fragment>
    );
  }
}
