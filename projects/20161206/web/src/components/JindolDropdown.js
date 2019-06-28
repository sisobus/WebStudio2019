import React from "react";
import Scroll from "react-scroll";
import "./JindolDropdown.css";
import { Menu, Dropdown, Affix, Button } from "antd";

const Link = Scroll.Link;
const Element = Scroll.Element;

class JindolDropdown extends React.Component {
  render() {
    return (
      <div>
        <Affix offsetTop={100} onChange={affixed => console.log(affixed)}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a className="shortcut" href="/#illust1">
                    <div>
                      <li>
                        <Link
                          to="App-logo"
                          spy={true}
                          smooth={true}
                          duration={500}
                        >
                          Designed
                        </Link>
                      </li>
                    </div>
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a className="shortcut" href="/#illust2">
                    <div>
                      <li>
                        <Link
                          to="App-logo"
                          spy={true}
                          smooth={true}
                          duration={500}
                        >
                          Illustrated
                        </Link>
                      </li>
                    </div>
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a className="shortcut" href="/#illust3">
                    <div>
                      <li>
                        <Link
                          to="App-logo"
                          spy={true}
                          smooth={true}
                          duration={500}
                        >
                          Programmed
                        </Link>
                      </li>
                    </div>
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Link
                        to="App-logo"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        VR / AR
                      </Link>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Link
                        to="App-logo"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        3D Modeling / Animation
                      </Link>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Link
                        to="App-logo"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        Photographed
                      </Link>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <li>
                      <Link
                        to="App-logo"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        Filmed
                      </Link>
                    </li>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.tmall.com/"
                  >
                    <li>
                      <Link
                        to="App-logo"
                        spy={true}
                        smooth={true}
                        duration={500}
                      >
                        __________ of Jindogliani in Korea.
                      </Link>
                    </li>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <Button>__________ by Jindogliani in Korea.</Button>
          </Dropdown>
        </Affix>
      </div>
    );
  }
}

export default JindolDropdown;
