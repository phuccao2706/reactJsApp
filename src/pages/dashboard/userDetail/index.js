import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import ProfilePosts from "./ProfilePosts";
import Layout from "./Layout";

import { call } from "../../../services";
import "./index.less";

@withRouter
@inject(({ stores }) => stores)
@observer
class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetail: null,
    };
  }

  getUser = async (username) => {
    const userDetail = await call("get", `api/user/${username}`);
    if (userDetail && userDetail._id) {
      this.setState({
        userDetail,
      });
    }
  };

  componentDidMount() {
    const {
      props: {
        match: {
          params: { username },
        },
      },
    } = this;
    this.getUser(username);
  }
  render() {
    const {
      state: { userDetail },
      props: {
        match: { url, path },
      },
    } = this;

    return (
      <Layout userDetail={userDetail}>
        <Switch>
          <Route
            exact
            path={`${url}`}
            render={() => (
              <ProfilePosts userDetail={userDetail} getUser={this.getUser} />
            )}
          ></Route>
          <Route
            path={`${path}/:type`}
            render={() => (
              <ProfilePosts userDetail={userDetail} getUser={this.getUser} />
            )}
          ></Route>
        </Switch>
      </Layout>
    );
  }
}
export default UserDetail;
