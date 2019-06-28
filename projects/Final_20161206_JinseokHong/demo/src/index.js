import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./index.css";
import FullPage from "./FullPage";

import "./index.css";

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="link">
          <Link to="/fullpage"> __________ by Jindogliani in Korea.</Link>
        </div>
        {/* <h1 className="title">React Page Scroller Demo</h1> */}
      </div>
    );
  }
}

ReactDOM.render(
  <Router basename="/demos">
    <div>
      <Switch>
        <Route exact path="/" component={Demo} />
        <Route path="/fullpage" component={FullPage} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
