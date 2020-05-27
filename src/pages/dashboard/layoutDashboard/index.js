import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

import HeaderLinks from "./HeaderLinks";
import HeaderUser from "./HeaderUser";
import { call } from "@services";
import { GLOBAL_STATE } from "../../../constants/index";
import "./index.less";

export default withRouter(
  inject(({ stores }) => stores)(function LayoutDasboard(props) {
    const {
      globalState: { setState },
    } = props;
    useEffect(() => {
      call("get", "api/currentUser").then((data) => {
        if (data) {
          setState({ [GLOBAL_STATE.CURRENT_USER]: data });
        }
      });
    }, [setState]);

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
        <div className="layoutDasboardBody">{props.children}</div>
      </div>
    );
  })
);
