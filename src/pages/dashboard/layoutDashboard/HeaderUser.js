import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { setToken } from "../../../services";
import { CloseOutlined } from "@ant-design/icons";
export default withRouter(
  inject(({ stores }) => stores)(
    observer(function HeaderUser(props) {
      const { globalState } = props;
      const currentUser = globalState?.currentUser;

      return (
        <div className="layoutDasboardHeaderUser">
          <div>
            {currentUser?.firstname} {currentUser?.lastname}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => {
              window.localStorage.clear();
              props.globalState.setState({ isAuth: false, currentUser: null });
              props.history.push("/");
              setToken(false);
            }}
          >
            <CloseOutlined /> Logout
          </Button>
        </div>
      );
    })
  )
);
