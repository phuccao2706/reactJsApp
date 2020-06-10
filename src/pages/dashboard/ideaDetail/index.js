import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Modal, Input, Button, Popover } from "antd";
import IdeaComponent from "../ideas/IdeaComponent";
import AvatarComponent from "../../components/AvatarComponent";
import moment from "moment";

import { call } from "../../../services";

const { TextArea } = Input;

@withRouter
@inject(({ stores }) => stores)
@observer
class IdeaDetailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idea: null,
      loading: true,
      textboxState: "",
    };
  }

  getIdea = async (topicId) => {
    const retrievedIdea = await call("get", `api/idea/${topicId}`);
    if (retrievedIdea && retrievedIdea._id) {
      this.setState({
        idea: retrievedIdea,
        loading: false,
      });
    }
  };

  handleComment = async (topicId, comment, event) => {
    if (event) {
      event.preventDefault();
    }
    const {
      props: { fromUserDetail, getUser },
    } = this;

    if (comment.length === 0) return;

    const retrievedData = await call("post", `api/comment/idea/${topicId}`, {
      comment,
    });
    if (retrievedData) {
      this.setState({ idea: retrievedData });
      this.props.globalState.handleIdeaChange(retrievedData);
      this.setState({ textboxState: "" });
      if (fromUserDetail) {
        getUser();
      }
    }
  };

  componentDidMount() {
    const {
      props: {
        match: {
          params: { topicId },
        },
      },
    } = this;

    this.getIdea(topicId);
  }

  render() {
    const {
      props: {
        globalState,
        match: {
          params: { topicId },
        },
      },
    } = this;
    return (
      <div>
        <Modal
          visible={true}
          className="ideaDetailModal"
          onCancel={() => this.props.history.goBack()}
          maskStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          footer={false}
        >
          <div>
            {this.state.loading ? (
              <p>loading</p>
            ) : (
              <IdeaComponent
                ideaToShow={this.state.idea}
                globalStateRef={{ ...globalState }}
                detail={true}
                returnIdea={(idea) => this.setState({ idea })}
              />
            )}
          </div>

          <div className="commentSection">
            <div className="commentInput">
              <TextArea
                onChange={({ target: { value } }) =>
                  this.setState({ textboxState: value })
                }
                onPressEnter={(event) =>
                  this.handleComment(topicId, this.state.textboxState, event)
                }
                value={this.state.textboxState}
                rows={4}
                autoSize={{ maxRows: 4, minRows: 4 }}
              />
              <Button
                onClick={() =>
                  this.handleComment(topicId, this.state.textboxState)
                }
              >
                Comment
              </Button>
            </div>

            <div className="comments">
              {this.state.idea &&
                this.state.idea.comments &&
                this.state.idea.comments.map(
                  ({ comment, createdAt, createdBy }, index) => (
                    <div className="commentElement" key={index}>
                      <div className="lSide"></div>
                      <div className="rSide">
                        <div className="row1">
                          <AvatarComponent size={"small"} {...createdBy} />
                          <span className="name">{createdBy.username}</span>
                          <span> · </span>
                          <Popover
                            content={
                              <span className="popoverDateStyle">
                                {moment(createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </span>
                            }
                            placement={"right"}
                          >
                            <span className="time">
                              {moment(createdAt).fromNow()}
                            </span>
                          </Popover>
                        </div>
                        <div className="row2">
                          <p>{comment}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IdeaDetailComponent;
