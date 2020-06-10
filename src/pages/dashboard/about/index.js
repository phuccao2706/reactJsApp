import React, { Component } from "react";
import { Row, Col } from "antd";
import I from "../../components/IconComponent";
import "./index.less";

export default class AboutComponent extends Component {
  render() {
    return (
      <div id="container">
        <img
          className="bg bgUpper"
          alt="backgroud"
          src={require("./media/bg.jpeg")}
        />
        <img
          className="bg bgDowner"
          alt="backgroud"
          src={require("./media/bg.jpeg")}
        />

        <div className="body">
          <div className="header">
            <div>
              <div className="subHeader">
                {/* <div className="avatarHolder"> */}
                <img
                  className="img"
                  alt="img"
                  src={require("./media/avatar2.jpg")}
                />
                {/* </div> */}
                <div className="fullname">
                  <div className="subFullname">
                    <span>Cao Hồng</span>
                    <span className="name"> Phúc</span>
                  </div>

                  <div className="title">FULL STACK DEVELOPER</div>
                </div>
              </div>
            </div>
          </div>

          <Row className="content">
            <Col className="leftSide" span={12}>
              <div className="section infoSection">
                <div className="sectionTitle">PERSONAL INFO</div>
                <div className="sectionBody">
                  <div>
                    <div>
                      <I type="solid" icon="map-marker-alt" /> Thu Duc, Ho Chi
                      Minh
                    </div>
                    <div>
                      <I type="solid" icon="phone-square" /> 0909 759 447
                    </div>
                    <div>
                      <I type="solid" icon="envelope-square" />{" "}
                      phuccao2706@gmail.com
                    </div>
                    <div>
                      <i className="fab fa-github-square"></i>{" "}
                      github.com/phuccao2706
                    </div>
                  </div>
                </div>
              </div>

              <div className="section skillSection">
                <div className="sectionTitle">SKILLS</div>
                <div className="sectionBody">
                  <div style={{ marginBottom: "0.55rem" }}>
                    <div className="bold">Frontend</div>
                    <div>• Experienced with ReactJS.</div>
                    <div>• Global state management with MobX.</div>
                    <div>
                      • Familiar with UI frameworks such as Ant Design and
                      Bootstrap.
                    </div>
                    <div>
                      • Good understanding of UI/UX design, responsive website.
                    </div>
                  </div>

                  <div className="bold">Backend</div>
                  <div>
                    • Decent knowledge with NodeJS especially with framework
                    like NestJS.
                  </div>
                  <div>• Able to build GraphQL and RESTful API.</div>
                  <div>• Familiar with MongoDB and PostgreSQL.</div>
                </div>
              </div>

              <div className="section languageSection">
                <div className="sectionTitle">LANGUAGE</div>
                <div className="sectionBody">
                  <div>• Score of 905 in TOEIC Listening and Reading.</div>
                  <div>
                    • Speak English fluently and listen well to English.
                  </div>
                  <div>• Able to research English documents.</div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="section infoSection">
                <div className="sectionTitle">EDUCATION</div>
                <div className="sectionBody">
                  <div className="bold">Bachelor of Information Technology</div>
                  <div>University of Information Technology, VNU</div>
                  <div>Sept 2015 - Current</div>
                </div>
              </div>

              <div className="section expSection">
                <div className="sectionTitle">EXPERIENCE</div>
                <div className="sectionBody">
                  <div>
                    <div className="bold">Freelance PDF to HTML converter.</div>
                    <div>2018</div>
                    <div>• Build reusable components.</div>
                    <div>• Turn PDF/PSD into websites.</div>
                    <div>
                      • Make responsive webpages using
                      HTML/CSS/JQuery/JavaScript.
                    </div>
                  </div>
                  <div>
                    <div className="bold">
                      Acexis JSC. - Web Application Developer
                    </div>
                    <div>Aug 2019 - May 2020</div>
                    <div>• Build reusable components.</div>
                    <div>
                      • Mentor new hired coworkers/freshers on basic ReactJS.
                    </div>
                    <div>
                      • Build web application on demand with ReactJS, NestJS,
                      MongoDB and GraphQL.
                    </div>
                    <div>
                      • Sketch wireframe, user's flow and draw database diagram.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
