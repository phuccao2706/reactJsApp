import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import PreviewIdeaComponent from "./PreviewIdeaComponent";
import { call } from "../../../services";

@withRouter
@inject(({ stores }) => stores)
@observer
class ProfilePosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ideasToShow: [],
    };
  }

  getIdeasToShow = async (username, type) => {
    const recivedData = await call("get", `api/user/${username}/${type}`);
    if (recivedData) {
      // console.log(recivedData);
      this.setState({ ideasToShow: recivedData });
    }
  };

  componentDidMount() {
    const {
      props: { userDetail, type },
    } = this;
    this.getIdeasToShow(userDetail.username, type);
  }

  componentDidUpdate(
    {
      type: prevType,
      match: {
        params: { username: prevUsername },
      },
    },
    prevState
  ) {
    const {
      props: {
        type,
        match: {
          params: { username },
        },
      },
    } = this;

    if (type !== prevType || username !== prevUsername) {
      this.getIdeasToShow(
        // userDetail.username,
        username,
        type
        // type || APP_CONSTANTS.ideaPreviewParamsType.ideas
      );
    }
  }

  render() {
    const {
      state: { ideasToShow },
      props: { isOwner, userDetail },
    } = this;

    return (
      <div className="profilePostContainer">
        {ideasToShow.map((idea, index) => (
          <PreviewIdeaComponent
            key={index}
            ideaToShow={idea}
            userDetail={userDetail}
            getIdeasToShow={this.getIdeasToShow}
            isOwner={isOwner}
          />
        ))}
      </div>
    );
  }
}
export default ProfilePosts;
