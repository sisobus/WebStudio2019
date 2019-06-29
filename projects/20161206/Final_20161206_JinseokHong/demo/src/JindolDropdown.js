import React from "react";
import { Pager } from "react-bootstrap";
import ReactPageScroller from "../../src/index";
import { Menu, Dropdown, Affix, Button } from "antd";
import "./JindolDropdown.css";

class JindolDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    this._pageScroller = null;
  }

  render() {
    return (
      <div className="jindol">
        <Affix offsetTop={50} onChange={affixed => console.log(affixed)}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={2}
                        eventKey={1}
                        onSelect={this.props.goToPage}
                      >
                        Jindogliani
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={3}
                        eventKey={2}
                        onSelect={this.props.goToPage}
                      >
                        Designed
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={4}
                        eventKey={3}
                        onSelect={this.props.goToPage}
                      >
                        Illustrated
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={5}
                        eventKey={4}
                        onSelect={this.props.goToPage}
                      >
                        Programmed
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={6}
                        eventKey={5}
                        onSelect={this.props.goToPage}
                      >
                        Filmed
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={7}
                        eventKey={6}
                        onSelect={this.props.goToPage}
                      >
                        Photographed
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={8}
                        eventKey={7}
                        onSelect={this.props.goToPage}
                      >
                        VR / AR
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Pager.Item
                        key={9}
                        eventKey={8}
                        onSelect={this.props.goToPage}
                      >
                        3D Modeling / Animation
                      </Pager.Item>
                    </li>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <Button className="dropdownButton">
              <Pager.Item key={1} eventKey={0} onSelect={this.props.goToPage}>
                <span className="dropdownUnderbar" />
                <div className="jindoltitle">by Jindogliani in Korea.</div>
              </Pager.Item>
            </Button>
          </Dropdown>
        </Affix>
      </div>
    );
  }
}

export default JindolDropdown;
