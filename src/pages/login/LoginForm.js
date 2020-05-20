import React from "react";
import { Link, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { call, openNotification, setToken } from "@services";

export default inject(({ stores }) => stores)(
  observer(
    withRouter(function LoginForm(props) {
      const {
        globalState: { setState },
        history,
      } = props;

      const onFinish = ({ username, password }) => {
        console.log(username, password);
        call("post", "login", {
          username,
          password,
        }).then((data) => {
          if (data && data.token) {
            const currentUser = { ...data };
            delete currentUser.token;
            setState({ currentUser, isAuth: true });
            setToken(data.token);
            history.push("/");
            return openNotification(
              { message: "Success", description: `Login as ${data.username}` },
              "bottomLeft",
              "success"
            );
          }
        });
      };
      return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      );
    })
  )
);
