import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import PreviewIdeaComponent from "./PreviewIdeaComponent";

@withRouter
@inject(({ stores }) => stores)
@observer
class ProfilePosts extends Component {
  render() {
    const {
      props: {
        userDetail,
        match: { params },
      },
    } = this;
    const ideaToShow = userDetail
      ? !!!params.type
        ? [...userDetail.ideas]
        : [...userDetail.bookmarks]
      : [];

    return (
      <div className="profilePostContainer">
        {ideaToShow.map((idea, index) => (
          <PreviewIdeaComponent
            key={index}
            ideaToShow={idea}
            userDetail={userDetail}
            getUser={this.props.getUser}
          />
        ))}
      </div>
    );
  }
}
export default ProfilePosts;
