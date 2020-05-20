import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";

import { call, openNotification } from "@services";

export default function Register() {
  const onFinish = ({ username, password }) => {
    call("post", "register", {
      username,
      password,
    }).then((data) => {
      if (data) {
        openNotification(
          { message: "Success", description: `Welcome ${data.username}` },
          "bottomLeft",
          "success"
        );
      }
    });
  };

  return (
    <div className="registerForm">
      <Form name="normal_login" className="register-form" onFinish={onFinish}>
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
            className="register-form-button"
          >
            Register
          </Button>
          Already a member? <Link to="/login">Log in now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
