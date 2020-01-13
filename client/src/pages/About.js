import React from "react";
import { Row, Col } from "react-bootstrap";
import "./about.css";
const About = props => (
  <div className="About">
    <Row>
      <div>
        <Col sm={4} md={4}></Col>
      </div>
      <div>
        <Col sm={4} md={4}></Col>
      </div>
      <div className="content">
        <Col sm={4} md={4}>
          <h1>Social Momsies</h1>
          <p>
            A place to connect with other Moms Find better activities for the
            little ones
          </p>
        </Col>
      </div>
    </Row>
  </div>
);
export default About;
