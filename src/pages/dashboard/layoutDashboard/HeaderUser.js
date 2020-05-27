import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Popover } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { setToken, AvatarComponent } from "../../../services";
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
        setToken(false);
      };

      const handleVisibleChange = (visible) => {
        setPopoverVisible(visible);
      };

      const popoverContent = () => (
        <div className="popoverContent">
          <span>My Profile</span>

          <span onClick={handleLogout} className="loggout">
            Logout
          </span>
        </div>
      );

      return (
        currentUser && (
          <>
            <div className="addNewIdea">
              <i
                {...APP_CONSTANTS.dualToneStyle}
                class="fad fa-plus-square"
              ></i>{" "}
              <span>Add new post</span>
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
