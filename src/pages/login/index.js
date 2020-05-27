import React from "react";
import LoginForm from "./LoginForm";

import "./index.less";

const Login = () => {
  return (
    <div className="loginForm">
      <div>
        <div>
          <span>get inside</span>
          <div className="arrow-up "></div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
