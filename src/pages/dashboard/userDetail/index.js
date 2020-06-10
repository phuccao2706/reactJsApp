import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import ProfilePosts from "./ProfilePosts";
import Layout from "./Layout";

import { call } from "../../../services";
import "./index.less";
import { APP_CONSTANTS } from "../../../constants";

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
      console.log(userDetail);
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

  componentDidUpdate(
    {
      match: {
        params: { username: prevUsername },
      },
    },
    prevState
  ) {
    const {
      props: {
        match: {
          params: { username },
        },
      },
    } = this;

    if (username !== prevUsername) {
      this.getUser(username);
    }
  }

  render() {
    const {
      state: { userDetail },
      props: {
        match: { path, params },
        globalState,
      },
    } = this;

    const isOwner = globalState.currentUser?._id === userDetail?._id;
    return (
      userDetail && (
        <Layout
          isOwner={isOwner}
          userDetail={userDetail}
          getUser={this.getUser}
        >
          <Switch>
            <Route
              exact
              path={`${path}/${APP_CONSTANTS.ideaPreviewParamsType.ideas}`}
              key={params.type}
              render={() => (
                <ProfilePosts
                  userDetail={userDetail}
                  isOwner={isOwner}
                  type={APP_CONSTANTS.ideaPreviewParamsType.ideas}
                />
              )}
            />

            {isOwner && (
              <Route
                exact
                path={`${path}/${APP_CONSTANTS.ideaPreviewParamsType.bookmarks}`}
                key={params.type}
                render={() => (
                  <ProfilePosts
                    userDetail={userDetail}
                    isOwner={isOwner}
                    type={APP_CONSTANTS.ideaPreviewParamsType.bookmarks}
                  />
                )}
              />
            )}
          </Switch>
        </Layout>
      )
    );
  }
}
export default UserDetail;
