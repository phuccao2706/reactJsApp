import React from "react";
import { Link, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FieldStringOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./index.less";

import { call, openNotification, setToken } from "@services";

export default withRouter(
  inject(({ stores }) => stores)(
    observer(function Register(props) {
      const {
        globalState: { setState },
        history,
      } = props;
      const onFinish = (data) => {
        call("post", "register", {
          ...data,
        }).then((data) => {
          if (data && data.token) {
            const currentUser = { ...data };
            delete currentUser.token;
            setState({ currentUser, isAuth: true });
            setToken(data.token);
            history.push("/ideas");
            return openNotification(
              { message: "Success", description: `Welcome ${data.username}` },
              "bottomLeft",
              "success"
            );
          }
        });
      };

      return (
        <div className="registerForm">
          <div>
            <div>
              <span>become a member</span>
              <div className="arrow-up "></div>
            </div>
            <Form
              // labelCol={{
              //   span: 6,
              // }}
              // wrapperCol={{
              //   span: 18,
              // }}
              name="normal_login"
              className="register-form"
              onFinish={onFinish}
              hideRequiredMark={true}
              colon={false}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                label="Fullname"
                name="firstname"
                rules={[
                  { required: true, message: "Please input your Fullname!" },
                ]}
              >
                <Input
                  prefix={
                    <FieldStringOutlined className="site-form-item-icon" />
                  }
                  placeholder="Firstname"
                />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  Register
                </Button>
                <span className="link">
                  Already a member? <Link to="/login">Log in now!</Link>
                </span>
              </Form.Item>{" "}
            </Form>
          </div>
        </div>
      );
    })
  )
);
