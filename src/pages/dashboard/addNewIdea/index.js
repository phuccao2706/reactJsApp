import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { call } from "../../../services";
import { Input, Button, Tag, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";

import UploadImgComponent from "./UploadImgComponent";
import { inject } from "mobx-react";
import { GLOBAL_STATE } from "../../../constants";

const { TextArea } = Input;

@withRouter
@inject(({ stores }) => stores)
class AddNewIdea extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ideaValue: props.ideaToShow ? props.ideaToShow.idea : "",
      descriptionValue: props.ideaToShow ? props.ideaToShow.description : "",
      imageUrl: props.ideaToShow ? props.ideaToShow.imageUrl : "",
      // for tags
      hashtagsValue: props.ideaToShow ? props.ideaToShow.hashtags : [],
      tagsInputVisible: false,
      tagsInputValue: "",
      editTagsInputIndex: -1,
      editTagsInputValue: "",
    };
  }

  handleSubmitIdea = async () => {
    const {
      state: { ideaValue, descriptionValue, hashtagsValue, imageUrl },
      props: { history, globalState },
    } = this;

    await call("post", "api/idea", {
      idea: ideaValue,
      description: descriptionValue,
      hashtags: hashtagsValue,
      imageUrl,
    }).then((data) => {
      if (data && data._id) {
        globalState.setState({
          [GLOBAL_STATE.initDashboardFromCreate]: true,
          ideasToShow: [data, ...globalState.ideasToShow],
        });
        history.push({
          pathname: "/ideas",
        });
      }
    });
  };

  handleClose = (removedTag) => {
    const hashtagsValue = this.state.hashtagsValue.filter(
      (tag) => tag !== removedTag
    );
    this.setState({ hashtagsValue });
  };

  showInput = () => {
    this.setState({ tagsInputVisible: true }, () => this.input.focus());
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ tagsInputValue: value });
  };

  handleInputConfirm = () => {
    const { tagsInputValue } = this.state;
    let { hashtagsValue } = this.state;
    if (tagsInputValue && hashtagsValue.indexOf(tagsInputValue) === -1) {
      hashtagsValue = [...hashtagsValue, tagsInputValue];
    }

    this.setState({
      hashtagsValue,
      // tagsInputVisible: false,
      tagsInputValue: "",
    });
  };

  handleEditInputChange = ({ target: { value } }) => {
    this.setState({ editTagsInputValue: value });
  };

  handleEditInputConfirm = () => {
    this.setState(
      ({ hashtagsValue, editTagsInputIndex, editTagsInputValue }) => {
        const newTags = [...hashtagsValue];
        newTags[editTagsInputIndex] = editTagsInputValue;

        return {
          hashtagsValue: newTags,
          editTagsInputIndex: -1,
          editTagsInputValue: "",
        };
      }
    );
  };

  saveInputRef = (input) => (this.input = input);

  saveEditInputRef = (input) => (this.editInput = input);

  componentDidMount() {
    const { childRef } = this.props;
    if (childRef) childRef(this);
  }

  render() {
    const {
      state: {
        ideaValue,
        descriptionValue,
        imageUrl,
        hashtagsValue,
        tagsInputVisible,
        tagsInputValue,
        editTagsInputIndex,
        editTagsInputValue,
      },
      props: { ideaToShow },
    } = this;

    return (
      <div className="addNewIdeaContainer">
        {!ideaToShow && (
          <div className="title">
            <span>got any idea?</span>
            <div className="arrow-up "></div>
          </div>
        )}
        <Input
          onChange={({ target: { value } }) =>
            this.setState({ ideaValue: value })
          }
          value={ideaValue}
          placeholder="idea"
        />

        <div className="row2">
          <TextArea
            onChange={({ target: { value } }) =>
              this.setState({ descriptionValue: value })
            }
            value={descriptionValue}
            placeholder="description"
            rows={4}
          />
          <UploadImgComponent
            imageUrl={imageUrl}
            getImgUrl={(returnedImageUrl) =>
              this.setState({ imageUrl: returnedImageUrl })
            }
          />
        </div>

        <div className="hashtagsHolder">
          {hashtagsValue.map((tag, index) => {
            if (editTagsInputIndex === index) {
              return (
                <Input
                  ref={this.saveEditInputRef}
                  key={tag}
                  size="small"
                  className="tag-input"
                  value={editTagsInputValue}
                  onChange={this.handleEditInputChange}
                  onBlur={this.handleEditInputConfirm}
                  onPressEnter={this.handleEditInputConfirm}
                />
              );
            }

            const isLongTag = tag.length > 20;

            const tagElem = (
              <Tag
                className="edit-tag"
                color="blue"
                key={index}
                closable
                onClose={() => this.handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      this.setState(
                        { editTagsInputIndex: index, editTagsInputValue: tag },
                        () => {
                          this.editInput.focus();
                        }
                      );
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {tagsInputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              className="tag-input"
              value={tagsInputValue}
              onChange={this.handleInputChange}
              onBlur={() =>
                this.setState({
                  tagsInputValue: "",
                  tagsInputVisible: false,
                })
              }
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!tagsInputVisible && (
            <Tag className="site-tag-plus" onClick={this.showInput}>
              <PlusOutlined /> add tag
            </Tag>
          )}
        </div>

        {!ideaToShow && (
          <div className="functionalBtns">
            <Button className="cancelBtn">Cancel</Button>
            <Button
              onClick={this.handleSubmitIdea}
              className="primaryBtn"
              type="primary"
            >
              Post
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AddNewIdea;
