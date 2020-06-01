import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Modal, Input, Button } from "antd";
import IdeaComponent from "../ideas/IdeaComponent";

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

  handleComment = async (topicId, comment) => {
    const {
      props: { fromUserDetail, getUser },
    } = this;
    const retrievedData = await call("post", `api/comment/idea/${topicId}`, {
      comment,
    });
    if (retrievedData) {
      this.setState({ idea: retrievedData });
      this.props.globalState.handleIdeaChange(retrievedData);
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

          <div>
            <div>
              <TextArea
                onChange={({ target: { value } }) =>
                  this.setState({ textboxState: value })
                }
                rows={4}
              />
              <Button
                onClick={() =>
                  this.handleComment(topicId, this.state.textboxState)
                }
              >
                Comment
              </Button>
            </div>

            <div>
              {this.state.idea &&
                this.state.idea.comments &&
                this.state.idea.comments.map(({ comment }, index) => (
                  <p key={index}>{comment}</p>
                ))}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IdeaDetailComponent;
