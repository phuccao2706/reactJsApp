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
  render() {
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
