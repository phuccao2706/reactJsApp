import React, { useEffect } from "react";
import { Form, Input, Button, Slider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";

import service from "@services";
import services from "../../services";

export default function Login() {
  const onFinish = ({ username, password }) => {
    services.call("post", "login", {
      username,
      password,
    });
  };

  return (
    <div className="loginForm">
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
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
