import React from "react";
// import PropTypes from "prop-types";
// import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
// import { Button } from "react-bootstrap";
// import dashbordCss from './dashbord.module.scss'
const propTypes = {};

const defaultProps = {};

export default class Deshbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <RightSide />
        <div
          style={{ height: "100%", maxWidth: "70%", marginLeft: "30%" }}
        ></div>
      </>
    );
  }
}

Deshbord.propTypes = propTypes;
Deshbord.defaultProps = defaultProps;
