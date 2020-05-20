import React, { useState } from "react";
import { PageHeader, Typography, Row, Tag, Button, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { call } from "@services";
import { APP_CONSTANTS } from "../../../constants";
import moment from "moment";

const { Paragraph } = Typography;
const { VOTE_TYPE } = APP_CONSTANTS;

export default function IdeaComponent(props) {
  const {
    _id,
    createdAt,
    createdBy: { username },
    description,
    idea,
    upvotes,
    downvotes,
  } = props;

  const [upvotesState, setUpvotesState] = useState([upvotes]);
  const [downvotesState, setDownvotesState] = useState([downvotes]);

  const subTitle = () => (
    <div className="subTitle">
      <span>{username}</span> • <span>{moment(createdAt).fromNow()}</span>
    </div>
  );

  const vote = (type) => {
    call("post", `api/idea/${_id}/${type}`).then((retrievedData) => {
      console.log(retrievedData);

      if (retrievedData && retrievedData._id) {
        console.log(retrievedData);
        setUpvotesState(retrievedData.upvotes);
        setDownvotesState(retrievedData.downvotes);
      }
    });
  };

  return (
    <div className="ideaComponent">
      <Row>
        <Col span={2} className="voteBtnsHolder">
          <div>
            <CaretUpOutlined
              style={{ fontSize: 22 }}
              onClick={() => vote(VOTE_TYPE.UP)}
            />
            <span className="point">
              {upvotesState.length - downvotesState.length}
            </span>{" "}
            <CaretDownOutlined
              style={{ fontSize: 22 }}
              onClick={() => vote(VOTE_TYPE.DOWN)}
            />
          </div>
        </Col>
        <Col span={22}>
          <PageHeader
            title={idea}
            className="pageHeader"
            subTitle={subTitle()}
            avatar={{
              src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
            }}
          >
            <Row>
              <div style={{ flex: 1 }}>
                <Paragraph>{description}</Paragraph>
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
                {["#something", "#else", "#to", "#tags"].map((item, index) => (
                  <Tag key={index} color="blue">
                    {item}
                  </Tag>
                ))}
              </div>

              <div className="ideaFunctionalBtns">
                <Button type="default">Comment</Button>
              </div>
            </div>
          </PageHeader>
        </Col>
      </Row>
    </div>
  );
}
