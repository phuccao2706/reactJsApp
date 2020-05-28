import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

import HeaderLinks from "./HeaderLinks";
import HeaderUser from "./HeaderUser";
import "./index.less";

@withRouter
@inject(({ stores }) => stores)
class LayoutDasboard extends PureComponent {
  componentDidMount() {
    //This will not fire when we navigate the app.
    console.log("layout did mount.");
  }

  componentWillUnmount() {
    //This won't fire,
    // because our "shared page layout" doesn't unmount.
    console.log("layout will unmount");
  }

  render() {
    console.log("render");
    return (
      <div className="layoutDasboard">
        <div className="layoutDasboardHeader">
          <Row>
            <Col span={20}>
              <HeaderLinks />
            </Col>
            <Col className="layoutDasboardHeaderUser" span={4}>
              <HeaderUser />
            </Col>
          </Row>
        </div>
        <div className="layoutDasboardBody">{this.props.children}</div>
      </div>
    );
  }
}

export default LayoutDasboard;
