import React from "react";
// import PropTypes from 'prop-types';
// import rightSccs from './right.module.scss'
// import styled from '@emotion/styled';
// import Header from '../rightComponets/header/Header';
// import ContentMang from '../rightComponets/contentManagment/ContentMang';
// import Header from '../rightComponets/header/Header';
import Home from "../rightComponets/home/Home";
const propTypes = {};
const defaultProps = {};

export default class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Home />
      </>
    );
  }
}

RightSide.propTypes = propTypes;
RightSide.defaultProps = defaultProps;
