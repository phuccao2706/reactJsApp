import React, { Component } from "react";

import AvatarComponent from "../../components/AvatarComponent";

export default class ProfileInfo extends Component {
  render() {
    const {
      props: { userToShow },
    } = this;

    return (
      userToShow && (
        <div className="profileInfo">
          <div className="row row1">
            <AvatarComponent size={64} {...userToShow} />

            <div className="nameHolder">
              <span className="fullname">
                {userToShow.firstname} {userToShow.lastname}
              </span>

              <span className="username">{`@${userToShow.username}`}</span>
            </div>
          </div>

          <div className="row about">
            Welcome to r/dadjokes - a homely place for the best and worst of
            jokes that make you laugh and cringe in equal measure. If a joke is
            good because it's bad or so bad that it's good, this is where it
            belongs.
          </div>

          <div className="row row2">
            <div>
              <span>Call me:</span>

              <span>{userToShow.phoneNumber}</span>
            </div>

            <div>
              <span>Or write me:</span>

              <span>{userToShow.email}</span>
            </div>
          </div>
        </div>
      )
    );
  }
}
