import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { call } from "@services";
import { GLOBAL_STATE } from "../../../constants/index";

@withRouter
@inject(({ stores }) => stores)
@observer
class AuthWrapper extends Component {
  componentDidMount() {
    const {
      globalState: { setState },
    } = this.props;

    call("get", "api/currentUser").then((data) => {
      if (data) {
        setState({ [GLOBAL_STATE.CURRENT_USER]: data });
      }
    });
  }

  render() {
    return <>{this.props.children}</>;
  }
}
export default AuthWrapper;
