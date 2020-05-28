import React from "react";
import "./index.less";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";

const dualToneStyle = {
  style: { "--fa-primary-color": "#95b4cc", "--fa-secondary-color": "#fec9c9" },
};

export default withRouter(function AboutComponent() {
  return (
    <div className="aboutContainer">
      <div className="innerContainer">
        <Row className="header">
          <Col className="fistname" span={8} offset={3}>
            <span>Phuc</span>
          </Col>

          <Col span={2}>
            <img
              className="img"
              alt="img"
              src={require("./media/avatar.jpg")}
            />
          </Col>

          <Col className="lastname" span={8}>
            <span>Cao Hong</span>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="icon">
          <Col offset={11} span={2}>
            <i {...dualToneStyle} className="fad fa-seedling"></i>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="firstRow">
          <Col className="leftSide" span={12}>
            <div className="hello">
              <div className="title">Hello</div>

              <div className="nameHolder">
                <span>
                  I'm <span className="name">Phuc</span>
                </span>
                <span>born and raised in Thu Duc, Ho Chi Minh city.</span>
              </div>
            </div>
          </Col>

          <Col span={12} className="rightSide">
            <div className="contact">
              <div className="title">And I am a</div>
              <div className="infoHolder">
                <span style={{ fontWeight: 600 }}>
                  Web Application Developer
                </span>
                <span>it means I write code for a living.</span>
              </div>
              {/* </Col>
              </Row> */}
            </div>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="icon">
          <Col offset={11} span={2}>
            <i {...dualToneStyle} className="fad fa-books"></i>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="secondRow">
          <Col className="leftSide" span={12}>
            <div className="education">
              <div className="title">Education</div>

              <div className="educationHolder">
                <span>
                  <span className="bold">Sept 2015 - Current</span>
                </span>
                <span>
                  Bachelor of{" "}
                  <span className="bold">Information Technology</span>
                </span>
                <span>University of Information Technology, VNU</span>
              </div>
            </div>

            <div className="language" style={{ marginTop: "3rem" }}>
              <div className="title">Language</div>

              <div className="languageHolder">
                <span>
                  <span className="bold">Vietnamese</span>
                </span>
                <span> • Native.</span>
              </div>
              <div className="languageHolder">
                <span>
                  <span className="bold">English</span>
                </span>
                <div>
                  <div>
                    <div> • Score of 905 in TOEIC Listening and Reading.</div>
                    <div>
                      • Speak English fluently and listen well to English.
                    </div>
                    <div> • Able to research English documents.</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={12} className="rightSide">
            <div className="experience">
              <div className="title">Experience</div>

              <div className="experienceHolder">
                <span>
                  <span className="bold">2018</span>
                </span>
                <span style={{ fontStyle: "italic" }}>
                  Freelance PDF to HTML converter.
                </span>
                <span> • Turn PDF/PSD into websites.</span>
                <span>
                  {" "}
                  • Make responsive webpages using HTML/CSS/JQuery/JavaScript.
                </span>
              </div>

              <div className="experienceHolder">
                <span>
                  <span className="bold">Aug 2019 - May 2020</span>
                </span>
                <span style={{ fontStyle: "italic" }}>
                  Web Application Developer - Acexis JSC.
                </span>
                <span> • Build reusable components.</span>
                <span>
                  {" "}
                  • Mentor new hired coworkers/freshers on basic ReactJS.
                </span>
                <span>
                  {" "}
                  • Build web application on demand with ReactJS, NestJS,
                  <br />
                  MongoDB and GraphQL.
                </span>

                <span>
                  • Sketch wireframe, user's flow and draw database diagram.
                </span>
              </div>
            </div>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="icon">
          <Col offset={11} span={2}>
            <i {...dualToneStyle} className="fad fa-laptop-code"></i>
          </Col>
        </Row>
        {/* //////////////////////////////////////////////////////////// */}
        <Row className="thirdRow">
          <Col className="leftSide" span={12}>
            <div className="info">
              <div className="title">Dear whom it may concern</div>

              <div className="interests">
                <span className="bold">Interests</span>
                <div className="interestsLogos">
                  <i className="fas fa-camera-retro"></i>
                  <i className="fas fa-code"></i>
                  <i className="fas fa-headphones-alt"></i>
                  <i className="fas fa-gamepad"></i>
                </div>
              </div>

              <div className="contact">
                <div style={{ fontWeight: 600, lineHeight: "22px" }}>
                  You can reach me via
                </div>

                <div className="contactLogos">
                  <div>
                    <i className="far fa-phone-square"></i> (+84) 0909 759 447
                  </div>
                  <div>
                    <i className="far fa-envelope"></i> phuccao2706@gmail.com
                  </div>
                  <div>
                    <i className="fab fa-github-square"></i> /phuccao2706
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={12} className="rightSide">
            <div className="skill">
              <div className="title">Skills</div>

              <div className="skillHolder">
                <span>
                  <span className="bold">Frontend</span>
                </span>
                <span> • Experienced with ReactJS.</span>
                <span> • Global state management with MobX.</span>
                <span>
                  • Familar with UI frameworks such as Ant Design and Bootstrap.
                </span>
                <span>• Ability to build responsive website.</span>

                <span>• Good understanding of UX design.</span>
              </div>

              <div className="skillHolder">
                <span>
                  <span className="bold">Backend</span>
                </span>
                <span>
                  • Decent knowledge with NodeJS, <br />
                  especially with framework like NestJS.
                </span>
                <span> • Able to build GraphQL and RESTful API.</span>
                <span> • Familar with MongoDB and PostgreSQL.</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
});
