import React, { Component } from "react";
import { Upload, Modal, message, Button } from "antd";

import AvatarComponent from "../../components/AvatarComponent";
import IconComponent from "../../components/IconComponent";
import { APP_CONSTANTS } from "../../../constants";
import { call } from "../../../services";
import { inject, observer } from "mobx-react";

@inject(({ stores }) => stores)
@observer
class ProfileInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalChangeAvatar: false,
      avatarLoading: false,
    };
  }

  handleModalOk = () => {};

  handleModalCancel = async () => {
    this.setState({ modalChangeAvatar: false });
  };

  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = async ({ file }) => {
    const {
      props: { userToShow, getUser, globalState },
    } = this;
    if (file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (file.status === "done") {
      const imageUrl = file.response.split("/").slice(1).join("/");

      await call("put", `api/user/${userToShow.username}/avatar`, {
        imageUrl: APP_CONSTANTS.BE_URI + imageUrl,
      });

      await getUser(userToShow.username);
      await globalState.getCurrentUser();

      this.setState({
        avatarLoading: false,
      });
    }
  };

  render() {
    const {
      props: { userToShow },
      state: { avatarLoading },
    } = this;

    return (
      userToShow && (
        <>
          <div className="profileInfo">
            <div className="row row1">
              <div className="avatarHolder">
                <div
                  className="avatarBtns"
                  onClick={() => this.setState({ modalChangeAvatar: true })}
                >
                  <IconComponent type="regular" icon="camera-retro" />
                </div>
                <AvatarComponent size={64} {...userToShow} />
              </div>

              <div className="nameHolder">
                <span className="fullname">
                  {userToShow.firstname} {userToShow.lastname}
                </span>

                <span className="username">{`@${userToShow.username}`}</span>
              </div>
            </div>

            <div className="row about">
              Welcome to r/dadjokes - a homely place for the best and worst of
              jokes that make you laugh and cringe in equal measure. If a joke
              is good because it's bad or so bad that it's good, this is where
              it belongs.
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

          <Modal
            title="Change Avatar"
            className="modalChangeAvatar"
            visible={this.state.modalChangeAvatar}
            onOk={this.handleModalOk}
            onCancel={this.handleModalCancel}
            footer={null}
          >
            <div className="avatarOutter">
              <AvatarComponent size={250} {...userToShow} />
            </div>

            <div className="btnsOutter">
              <Upload
                name="rawImage"
                type="file"
                accept="image/*"
                // listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${APP_CONSTANTS.BE_URI}api/uploadImg`}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                <Button className="primaryBtn" type="primary">
                  <IconComponent type="solid" icon="upload" /> upload
                </Button>
              </Upload>
            </div>
          </Modal>
        </>
      )
    );
  }
}

export default ProfileInfo;
