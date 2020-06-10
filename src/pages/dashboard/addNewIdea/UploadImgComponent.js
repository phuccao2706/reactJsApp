import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { APP_CONSTANTS } from "../../../constants";

class UploadImgComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imageUrl: props.imageUrl ? APP_CONSTANTS.BE_URI + props.imageUrl : "",
    };
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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

  handleChange = ({ file }) => {
    if (file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (file.status === "done") {
      let imageUrl = [...file.response.split("/")];
      imageUrl.shift();
      this.props.getImgUrl(imageUrl.join("/"));
      this.getBase64(file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">select photo</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="rawImage"
        type="file"
        accept="image/*"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${APP_CONSTANTS.BE_URI}api/uploadImg`}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default UploadImgComponent;
