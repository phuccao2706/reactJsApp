import React from "react";
import { PageHeader, Typography, Row, Tag, Col, Popover, Modal } from "antd";
import moment from "moment";
import { inject } from "mobx-react";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import { call, openNotification } from "@services";
import { APP_CONSTANTS } from "../../../constants";
import IconComponent from "../../components/IconComponent";
import UsernameComponent from "../../components/UsernameComponent";
// import EditComponent from "./EditComponent";
import NewIdeaComponent from "../addNewIdea";

const { Paragraph } = Typography;
const { VOTE_TYPE, BE_URI } = APP_CONSTANTS;

@withRouter
@inject(({ stores }) => stores)
// @observer
class IdeaComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleModalDelete: false,
      visibleModalEdit: false,
    };

    // this.editComponentRef = React.createRef();
  }

  vote = (type) => {
    const { ideaToShow, returnIdea, globalState, detail } = this.props;

    call("post", `api/idea/${ideaToShow._id}/${type}`).then((retrievedData) => {
      if (retrievedData && retrievedData._id) {
        globalState.handleIdeaChange(retrievedData);
        if (detail) {
          returnIdea(retrievedData);
        }
      }
    });
  };

  handleBookmark = (topicId) => {
    const {
      props: { globalState },
    } = this;

    call("post", `api/idea/${topicId}/bookmark`).then((retrievedData) => {
      if (retrievedData && retrievedData._id) {
        globalState.setState({ currentUser: retrievedData });
      }
    });
  };

  handleDelete = async (itemId) => {
    const {
      props: { globalState, detail, history },
    } = this;

    const retrievedData = await call("delete", `api/idea/${itemId}`);
    if (retrievedData) {
      openNotification(
        { message: "Success", description: "deletedItem" },
        "bottomLeft",
        "success"
      );

      this.toggleVisibleModal("Delete", false);

      globalState.setState({
        ideasToShow: globalState.ideasToShow.filter(
          (item) => item._id !== itemId
        ),
      });

      if (detail) {
        history.goBack();
      }
    }
  };

  handleUpdate = async (itemId) => {
    const {
      editComponentRef: {
        state: { ideaValue, descriptionValue, imageUrl, hashtagsValue },
      },
      props: { globalState, returnIdea, detail },
    } = this;

    const retrievedData = await call("put", `api/idea/${itemId}`, {
      idea: ideaValue,
      description: descriptionValue,
      imageUrl,
      hashtags: hashtagsValue,
    });

    if (retrievedData) {
      openNotification(
        { message: "Success", description: "deletedItem" },
        "bottomLeft",
        "success"
      );

      this.toggleVisibleModal("Edit", false);

      globalState.handleIdeaChange(retrievedData);

      if (detail) {
        returnIdea(retrievedData);
      }
    }
  };
  toggleVisibleModal = (name, state) => {
    this.setState({
      [`visibleModal${name}`]: state,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      // comments
      nextProps.ideaToShow.comments.length ===
        this.props.ideaToShow.comments.length &&
      //voting
      this.props.ideaToShow.upvotes.length ===
        nextProps.ideaToShow.upvotes.length &&
      this.props.ideaToShow.downvotes.length ===
        nextProps.ideaToShow.downvotes.length &&
      //for bookmarking
      [
        ..._.difference(
          nextProps.globalStateRef.currentUser?.bookmarks?.map(
            (item) => item._id
          ),
          this.props.globalStateRef.currentUser?.bookmarks?.map(
            (item) => item._id
          )
        ),
        ..._.difference(
          this.props.globalStateRef.currentUser?.bookmarks?.map(
            (item) => item._id
          ),
          nextProps.globalStateRef.currentUser?.bookmarks?.map(
            (item) => item._id
          )
        ),
      ][0] !== this.props.ideaToShow._id &&
      this.state.visibleModalEdit === nextState.visibleModalEdit &&
      this.state.visibleModalDelete === nextState.visibleModalDelete &&
      this.props.ideaToShow._id === nextProps.ideaToShow._id &&
      //for updating
      this.props.ideaToShow.idea === nextProps.ideaToShow.idea &&
      this.props.ideaToShow.description === nextProps.ideaToShow.description &&
      this.props.ideaToShow.imageUrl === nextProps.ideaToShow.imageUrl &&
      this.props.ideaToShow.hashtags === nextProps.ideaToShow.hashtags
    ) {
      if (!this.props.globalStateRef.currentUser) return true;
      return false;
    }
    return true;
  }

  forwardEditComponentRef = (ref) => (this.editComponentRef = ref);

  render() {
    const {
      // props: {
      ideaToShow,
      match: { url },
      globalStateRef: { currentUser },
      // },
    } = this.props;

    const bookmarkedYet = currentUser
      ? currentUser.bookmarks?.some(
          (bookmark) => bookmark._id === ideaToShow._id
        )
      : false;

    let isVoted = ideaToShow.upvotes.find(
      (item) => item._id === currentUser?._id
    )
      ? 1
      : ideaToShow.downvotes.find((item) => item._id === currentUser?._id)
      ? -1
      : 0;

    const isOwner = ideaToShow.createdBy._id === currentUser?._id;

    return (
      ideaToShow && (
        <>
          <div className="ideaComponent">
            <Row>
              <Col span={2} className="voteBtnsHolder">
                <div>
                  <span
                    className={`iconHolder ${isVoted === 1 && "voted"}`}
                    onClick={() => this.vote(VOTE_TYPE.UP)}
                  >
                    <IconComponent type="solid" icon="arrow-alt-up" />
                  </span>

                  <span
                    className={`point ${
                      isVoted === 1
                        ? "upvoted"
                        : isVoted === -1
                        ? "downvoted"
                        : ""
                    }`}
                  >
                    {ideaToShow.upvotes.length - ideaToShow.downvotes.length}
                  </span>
                  <span
                    className={`iconHolder ${isVoted === -1 && "voted"}`}
                    onClick={() => this.vote(VOTE_TYPE.DOWN)}
                  >
                    <IconComponent type="solid" icon="arrow-alt-down" />
                  </span>
                </div>
              </Col>
              <Col span={22}>
                <PageHeader
                  title={
                    <div className="titleHolder">
                      <div
                        className="title"
                        onClick={() =>
                          this.props.history.push(`${url}/${ideaToShow._id}`)
                        }
                      >
                        {ideaToShow.idea}
                      </div>

                      <div className="subTitle">
                        <UsernameComponent {...ideaToShow.createdBy} /> •{" "}
                        <Popover
                          content={
                            <span className="popoverDateStyle">
                              {moment(ideaToShow.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          }
                          placement={"right"}
                        >
                          <span>{moment(ideaToShow.createdAt).fromNow()}</span>
                        </Popover>
                      </div>
                    </div>
                  }
                  className="pageHeader"
                >
                  <Row>
                    <div
                      style={{
                        marginBottom: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="ideaImg"
                        src={`${BE_URI}${ideaToShow.imageUrl}`}
                        alt="content"
                        onClick={() =>
                          this.props.history.push(`${url}/${ideaToShow._id}`)
                        }
                      />
                    </div>
                    <div>
                      <Paragraph>{ideaToShow.description}</Paragraph>
                    </div>
                  </Row>
                  <div className="ideaFooter">
                    <div className="ideaTags">
                      {ideaToShow.hashtags.map((item, index) => (
                        <Tag key={index} color="blue">
                          #{item}
                        </Tag>
                      ))}
                    </div>

                    <div className="ideaFunctionalBtns">
                      <span
                        onClick={() =>
                          this.props.history.push(`${url}/${ideaToShow._id}`)
                        }
                      >
                        <IconComponent type="solid" icon="comments" />{" "}
                        {this.props.ideaToShow.comments.length} Comments
                      </span>

                      {!isOwner && (
                        <span
                          onClick={() => this.handleBookmark(ideaToShow._id)}
                        >
                          {bookmarkedYet ? (
                            <>
                              <IconComponent type="solid" icon="check-square" />{" "}
                              Unsave
                            </>
                          ) : (
                            <>
                              <IconComponent type="solid" icon="bookmark" />{" "}
                              Save
                            </>
                          )}
                        </span>
                      )}

                      {isOwner && (
                        <>
                          <span
                            onClick={() =>
                              this.toggleVisibleModal("Edit", true)
                            }
                          >
                            <IconComponent type="solid" icon="edit" /> Edit
                          </span>

                          <span
                            onClick={() =>
                              this.toggleVisibleModal("Delete", true)
                            }
                          >
                            <IconComponent type="solid" icon="trash-alt" />{" "}
                            Delete
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </PageHeader>
              </Col>
            </Row>
          </div>

          <Modal
            title="Are you sure?"
            visible={this.state.visibleModalDelete}
            onOk={() => this.handleDelete(ideaToShow._id)}
            onCancel={() => this.toggleVisibleModal("Delete", false)}
          >
            <p>Your changes cannot be un-done.</p>
          </Modal>

          <Modal
            title="Edit"
            className="editIdeaModal"
            visible={this.state.visibleModalEdit}
            onOk={() => this.handleUpdate(ideaToShow._id)}
            onCancel={() => this.toggleVisibleModal("Edit", false)}
          >
            <NewIdeaComponent
              ideaToShow={ideaToShow}
              childRef={(ref) => (this.editComponentRef = ref)}
            />
          </Modal>
        </>
      )
    );
  }
}
export default IdeaComponent;
