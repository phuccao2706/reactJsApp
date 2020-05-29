import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { Popover } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { AvatarComponent } from "../../../services";
import { APP_CONSTANTS } from "../../../constants";
export default withRouter(
  inject(({ stores }) => stores)(
    observer(function HeaderUser(props) {
      const { globalState } = props;
      const currentUser = globalState?.currentUser;

      const [popoverVisible, setPopoverVisible] = useState(false);

      const handleLogout = () => {
        window.localStorage.clear();
        props.globalState.setState({ isAuth: false, currentUser: null });
        props.history.push("/");
      };

      const handleVisibleChange = (visible) => {
        setPopoverVisible(visible);
      };

      const popoverContent = () => (
        <div className="popoverContent">
          <span onClick={() => props.history.push("/userDetail/aaaaa")}>
            <i className="fas fa-home"></i> My Profile
          </span>

          <span onClick={handleLogout} className="loggout">
            <i className="fas fa-portal-exit"></i> Logout
          </span>
        </div>
      );

      return (
        currentUser && (
          <>
            <div
              className="addNewIdea"
              onClick={() =>
                props.history.push(APP_CONSTANTS.routes.ADD_NEW_IDEA)
              }
            >
              <i
                {...APP_CONSTANTS.dualToneStyle}
                className="fad fa-plus-square"
              ></i>{" "}
              {/* <Link to={APP_CONSTANTS.routes.ADD_NEW_IDEA}> */}
              <span>new idea</span>
              {/* </Link> */}
            </div>
            <Popover
              placement="bottomRight"
              content={popoverContent()}
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={handleVisibleChange}
              className="layoutPopover"
            >
              <div
                className={`wrapInsidePopover ${!popoverVisible || "active"}`}
              >
                <AvatarComponent {...currentUser} />

                <div className="nameHolder">
                  <span className="fullname">
                    {currentUser?.firstname} {currentUser?.lastname}
                  </span>

                  <span className="username">
                    {currentUser ? `@${currentUser.username}` : ""}
                  </span>
                </div>
                <span className="dropDownBtn">
                  <CaretDownOutlined />
                </span>
              </div>
            </Popover>
          </>
        )
      );
    })
  )
);
