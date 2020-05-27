import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Row, Button } from "antd";

import "./index.less";
import { AvatarComponent } from "../../../services";

@withRouter
@inject(({ stores }) => stores)
@observer
class NewPostComponent extends Component {
  render() {
    const {
      props: {
        globalState: { currentUser },
      },
    } = this;

    return (
      <div className="addNewPost">
        <Row>
          <Col span={2} className="addNewPostLs">
            <AvatarComponent {...currentUser} />
          </Col>
          <Col span={22} className="addNewPostRs">
            <Button>Default</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewPostComponent;
