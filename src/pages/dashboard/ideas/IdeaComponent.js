import React, { Component } from "react";
import { PageHeader, Typography, Row, Tag, Col } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CommentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { call } from "@services";
import { APP_CONSTANTS } from "../../../constants";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import * as _ from "lodash";

const { Paragraph } = Typography;
const { VOTE_TYPE } = APP_CONSTANTS;

@withRouter
@inject(({ stores }) => stores)
// @observer
class IdeaComponent extends Component {
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
        console.log(retrievedData.bookmarks);
        globalState.setState({ currentUser: retrievedData });
      }
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
          nextProps.globalStateRef.currentUser?.bookmarks.map(
            (item) => item._id
          ),
          this.props.globalStateRef.currentUser?.bookmarks.map(
            (item) => item._id
          )
        ),
        ..._.difference(
          this.props.globalStateRef.currentUser?.bookmarks.map(
            (item) => item._id
          ),
          nextProps.globalStateRef.currentUser?.bookmarks.map(
            (item) => item._id
          )
        ),
      ][0] !== this.props.ideaToShow._id
    ) {
      if (!this.props.globalStateRef.currentUser) return true;
      return false;
    }
    return true;
  }

  render() {
    const {
      // props: {
      ideaToShow,
      match: { url },
      globalStateRef: { currentUser },
      // },
    } = this.props;

    const bookmarkedYet = currentUser
      ? currentUser.bookmarks.some(
          (bookmark) => bookmark._id === ideaToShow._id
        )
      : false;

    console.log("render");

    let isVoted = ideaToShow.upvotes.find(
      (item) => item._id === currentUser?._id
    )
      ? 1
      : ideaToShow.downvotes.find((item) => item._id === currentUser?._id)
      ? -1
      : 0;

    return (
      ideaToShow && (
        <div className="ideaComponent">
          <Row>
            <Col span={2} className="voteBtnsHolder">
              <div>
                <CaretUpOutlined
                  className={isVoted === 1 && "voted"}
                  style={{ fontSize: 22 }}
                  onClick={() => this.vote(VOTE_TYPE.UP)}
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
                  onClick={() => this.vote(VOTE_TYPE.DOWN)}
                />
              </div>
            </Col>
            <Col span={22}>
              <PageHeader
                title={
                  <div className="titleHolder">
                    <div className="title">{ideaToShow.idea}</div>

                    <div className="subTitle">
                      <span>{ideaToShow.createdBy.username}</span> •{" "}
                      <span>{moment(ideaToShow.createdAt).fromNow()}</span>
                    </div>
                  </div>
                }
                className="pageHeader"
              >
                <Row>
                  <div style={{ flex: 1 }}>
                    <Paragraph>{ideaToShow.description}</Paragraph>
                  </div>
                  <div>
                    <img
                      src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                      alt="content"
                      width="100%"
                    />
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
                      {/* <Link to={`${url}/${ideaToShow._id}`}> */}
                      <CommentOutlined />{" "}
                      {this.props.ideaToShow.comments.length} comments
                      {/* </Link> */}
                    </span>

                    <span onClick={() => this.handleBookmark(ideaToShow._id)}>
                      <TagOutlined />{" "}
                      {bookmarkedYet ? "bookmarked" : "bookmark"}
                    </span>
                  </div>
                </div>
              </PageHeader>
            </Col>
          </Row>
        </div>
      )
    );
  }
}
export default IdeaComponent;
