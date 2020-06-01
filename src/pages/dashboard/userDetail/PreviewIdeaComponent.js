import React, { Component } from "react";
import { Typography, Popover, Modal } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import moment from "moment";
import { APP_CONSTANTS } from "../../../constants";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

import I from "../../components/IconComponent";
import { call, openNotification } from "../../../services";

const { VOTE_TYPE, BE_URI } = APP_CONSTANTS;
const { Paragraph } = Typography;
const skipClasname = ["expandSpan", "deleteSpan", "commentSpan", "fas", "fad"];

@withRouter
@inject(({ stores }) => stores)
class PreviewIdeaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      visibleModal: false,
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
      props: { getUser, userDetail },
    } = this;
    const retrievedData = await call("delete", `api/idea/${itemId}`);
    if (retrievedData) {
      openNotification(
        { message: "Success", description: "deletedItem" },
        "bottomLeft",
        "success"
      );

      getUser(userDetail.username);
    }
  };

  render() {
    const {
      state: { isExpanded },
      props: { ideaToShow, userDetail },
    } = this;

    const isVoted = ideaToShow.upvotes.find(
      (item) => item._id === userDetail._id
    )
      ? 1
      : ideaToShow.downvotes.find((item) => item._id === userDetail._id)
      ? -1
      : 0;

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
                    <span>{ideaToShow.createdBy.username}</span> •{" "}
                    <Popover
                      content={
                        <span
                          style={{
                            padding: "0.25rem",
                            backgroundColor: "#dbdbdb",
                            borderRadius: "3px",
                            color: "rgba(0, 0, 0, 0.65)",
                          }}
                        >
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

                  <span
                    className="deleteSpan"
                    onClick={() => this.toggleVisibleModal(true)}
                  >
                    <I className="expandSpan" type="solid" icon="trash-alt" />{" "}
                    delete
                  </span>
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
