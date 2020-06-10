import React from "react";
import { Link, withRouter } from "react-router-dom";
import { APP_CONSTANTS } from "../../../constants";

export default withRouter(function HeaderLinks() {
  return (
    <div className="layoutDasboardHeaderLinks">
      <ul>
        <li>
          <Link to={APP_CONSTANTS.routes.IDEAS}>Về trang chủ</Link>
        </li>

        <li>
          <Link to={APP_CONSTANTS.routes.ABOUT}>Về trang about</Link>
        </li>
      </ul>
    </div>
  );
});
