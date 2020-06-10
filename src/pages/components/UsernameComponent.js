import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(function UsernameComponent({ username, history }) {
  return (
    <span
      className="usernameSpan"
      onClick={() => history.push(`/userDetail/${username}/ideas`)}
    >
      {username}
    </span>
  );
});
