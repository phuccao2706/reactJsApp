import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@withRouter
@inject(({ stores }) => stores)
@observer
class UserDetail extends Component {
  render() {
    return <div>aaa</div>;
  }
}
export default UserDetail;
