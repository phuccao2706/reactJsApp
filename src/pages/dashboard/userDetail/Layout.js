import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Row } from "antd";
import * as _ from "lodash";
import I from "../../components/IconComponent";

import ProfileInfo from "./ProfileInfo";

import "./index.less";
import { APP_CONSTANTS } from "../../../constants";

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
        isOwner,
        match: { url },
      },
    } = this;

    const activeCond = _.replace(pathname, url + "/", "");

    return (
      <div className="userDetailContainer">
        <Row>
          <Col span={16}>
            <div className="switchMenu">
              <span
                className={
                  activeCond === APP_CONSTANTS.ideaPreviewParamsType.ideas
                    ? "active"
                    : ""
                }
                onClick={() => history.push(`${url}/ideas`)}
              >
                <I type="solid" icon="lightbulb-on" /> ideas
              </span>

              {isOwner && (
                <span
                  className={
                    activeCond === APP_CONSTANTS.ideaPreviewParamsType.bookmarks
                      ? "active"
                      : ""
                  }
                  onClick={() => history.push(`${url}/bookmarks`)}
                >
                  <I type="solid" icon="bookmark" /> bookmarks
                </span>
              )}
            </div>

            <>{this.props.children}</>
          </Col>

          <Col span={8}>
            <ProfileInfo userToShow={userDetail} getUser={this.props.getUser} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Layout;
