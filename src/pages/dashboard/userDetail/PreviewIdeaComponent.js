import React, { Component } from "react";
import { Typography, Popover, Modal } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import moment from "moment";
import { APP_CONSTANTS } from "../../../constants";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

import I from "../../components/IconComponent";
import { call, openNotification } from "../../../services";
import UsernameComponent from "../../components/UsernameComponent";

const { BE_URI, ideaPreviewParamsType } = APP_CONSTANTS;
const { Paragraph } = Typography;
const skipClasname = [
  "expandSpan",
  "deleteSpan",
  "commentSpan",
  "fas",
  "fad",
  "handleBookmark",
  "usernameSpan",
];

@withRouter
@inject(({ stores }) => stores)
class PreviewIdeaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      visibleModal: false,
      bookmarkedYet: props.userDetail
        ? props.userDetail.bookmarks?.some(
            (bookmark) => bookmark._id === props.ideaToShow._id
          )
        : false,
    };
  }

  toggleExpand = () => {
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };

  jumpToItem = (event, itemId) => {
    const {
      props: { history },
    } = this;

    if (skipClasname.includes([...event.target.classList].shift())) {
      return;
    }

    history.push(`${APP_CONSTANTS.routes.IDEAS}/${itemId}`);
  };

  toggleVisibleModal = (visibleModal) => {
    this.setState({
      visibleModal,
    });
  };

  handleDelete = async (itemId) => {
    const {
      props: { userDetail, getIdeasToShow },
    } = this;
    const retrievedData = await call("delete", `api/idea/${itemId}`);
    if (retrievedData) {
      openNotification(
        { message: "Success", description: "deletedItem" },
        "bottomLeft",
        "success"
      );

      this.toggleVisibleModal(false);

      getIdeasToShow(
        userDetail.username,
        APP_CONSTANTS.ideaPreviewParamsType.ideas
      );
    }
  };

  handleBookmark = (topicId) => {
    const {
      props: { globalState },
    } = this;

    call("post", `api/idea/${topicId}/bookmark`).then((retrievedData) => {
      if (retrievedData && retrievedData._id) {
        this.setState((prevState) => ({ bookmarkedYet: !prevState }));
        globalState.setState({ currentUser: retrievedData });
      }
    });
  };

  render() {
    const {
      state: { isExpanded, bookmarkedYet },
      props: {
        ideaToShow,
        userDetail,
        isOwner,
        match: { params },
      },
    } = this;

    const isVoted = ideaToShow.upvotes.find(
      (item) => item._id === userDetail._id
    )
      ? 1
      : ideaToShow.downvotes.find((item) => item._id === userDetail._id)
      ? -1
      : 0;

    const paramsType = !!!params.type
      ? ideaPreviewParamsType.ideas
      : params.type;

    // const bookmarkedYet = userDetail
    //   ? userDetail.bookmarks?.some(
    //       (bookmark) => bookmark._id === ideaToShow._id
    //     )
    //   : false;

    return (
      <>
        {ideaToShow && (
          <div
            onClick={(e) => this.jumpToItem(e, ideaToShow._id)}
            className="previewIdeaComponent"
          >
            <div className="previewIdeaComponentInner">
              <div className="pointsHolder">
                <CaretUpOutlined
                  className={isVoted === 1 && "voted"}
                  style={{ fontSize: 22 }}
                />
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
                </span>{" "}
                <CaretDownOutlined
                  className={isVoted === -1 && "voted"}
                  style={{ fontSize: 22 }}
                />
              </div>

              <div className="imageHolder">
                <img src={`${BE_URI}${ideaToShow.imageUrl}`} alt="content" />
              </div>

              <div className="otherHolder">
                <div className="titleHolder">
                  <div className="title">{ideaToShow.idea}</div>

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

                <div className="functionalBtns">
                  <span className="expandSpan" onClick={this.toggleExpand}>
                    {isExpanded ? (
                      <I
                        className="expandSpan"
                        type="solid"
                        icon="compress-alt"
                      />
                    ) : (
                      <I
                        className="expandSpan"
                        type="solid"
                        icon="expand-alt"
                      />
                    )}
                  </span>
                  <span className="pseudo"></span>
                  <span className="commentSpan">
                    <I className="expandSpan" type="solid" icon="comments" />{" "}
                    {ideaToShow.comments.length} comments
                  </span>
                  <span className="pseudo"></span>

                  {paramsType === ideaPreviewParamsType.ideas && isOwner && (
                    <span
                      className="deleteSpan"
                      onClick={() => this.toggleVisibleModal(true)}
                    >
                      <I className="expandSpan" type="solid" icon="trash-alt" />{" "}
                      delete
                    </span>
                  )}

                  {paramsType === ideaPreviewParamsType.bookmarks &&
                    (bookmarkedYet ? (
                      <span
                        className="handleBookmark"
                        onClick={() => this.handleBookmark(ideaToShow._id)}
                      >
                        <I type="solid" icon="check-square" /> Unsave
                      </span>
                    ) : (
                      <span
                        className="handleBookmark"
                        onClick={() => this.handleBookmark(ideaToShow._id)}
                      >
                        <I type="solid" icon="bookmark" /> Save
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="expandedSection">
                <img src={`${BE_URI}${ideaToShow.imageUrl}`} alt="content" />
                <Paragraph>{ideaToShow.description}</Paragraph>
              </div>
            )}
          </div>
        )}

        <Modal
          title="Are you sure?"
          visible={this.state.visibleModal}
          onOk={() => this.handleDelete(ideaToShow._id)}
          onCancel={() => this.toggleVisibleModal(false)}
        >
          <p>Your changes cannot be un-done.</p>
        </Modal>
      </>
    );
  }
}
export default PreviewIdeaComponent;
