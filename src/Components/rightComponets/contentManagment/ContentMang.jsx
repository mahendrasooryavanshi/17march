import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Tab, Box, styled, TabList, Table } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Header from "../header/Header";
// import { Tabs,Tab } from '@mui/material';
import Tabs from "@mui/material/Tabs";
// import Tab from '@mui/material/Tab';
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import LeftSide from "../../dashbord/LeftSide";
const propTypes = {};

const defaultProps = {};

export default class ContentMang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: null,
    };
  }
  handleChange = (event, value) => {
    this.setState({
      index: "value",
    });
  };

  handleChangeIndex = (index) => {
    this.setState({ index });
  };
  contain = async () => {
    try {
      let result = await axios.get("http://localhost:3000/v1/content");
      this.setState({ data: result.data });
    } catch (error) {
      this.setState({ data: null });
      console.log(error.message);
    }
  };
  componentDidMount() {
    this.contain();
  }
  render() {
    const { index } = this.state;

    return (
      <>
        <Header heading={"Content Managment"} />
        <div className="container-fluid">
          <div style={{ height: "100%", maxWidth: "70%", marginLeft: "30%" }}>
            <div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <AppBar position="static">
                  <Tabs
                    value={index}
                    onChange={this.handleChangeIndex}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="standard"
                    aria-label="full width tabs "
                  >
                    {this.state.data != null &&
                      this.state.data.results.map((value, key) => (
                        <Tab
                          label={value.title}
                          onClick={() =>
                            this.setState({
                              value: new DOMParser().parseFromString(
                                value.content,
                                "text/html"
                              ).body.innerHTML,
                            })
                          }
                          key={key}
                        />
                      ))}
                  </Tabs>
                </AppBar>
              </Box>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.state.value }} />
            <Button variant="info">Edit</Button>{" "}
          </div>
        </div>
      </>
    );
  }
}

ContentMang.propTypes = propTypes;
ContentMang.defaultProps = defaultProps;
