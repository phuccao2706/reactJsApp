import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Row } from "antd";
import * as _ from "lodash";
import I from "../../components/IconComponent";

import ProfileInfo from "./ProfileInfo";

import "./index.less";

@withRouter
@inject(({ stores }) => stores)
@observer
class Layout extends Component {
  render() {
    const {
      props: {
        userDetail,
        location: { pathname },
        history,
        match: { url, path },
      },
    } = this;

    const activeCond = _.trimStart(pathname, url);

    return (
      <div className="userDetailContainer">
        <Row>
          <Col span={16}>
            <div className="switchMenu">
              <span
                className={!!!activeCond ? "active" : ""}
                onClick={() => history.push(`${url}`)}
              >
                <I type="solid" icon="lightbulb-on" /> ideas
              </span>

              <span
                className={activeCond === "bookmarks" ? "active" : ""}
                onClick={() => history.push(`${url}/bookmarks`)}
              >
                <I type="solid" icon="bookmark" /> bookmarks
              </span>
            </div>

            <>{this.props.children}</>
          </Col>

          <Col span={8}>
            <ProfileInfo userToShow={userDetail} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Layout;
