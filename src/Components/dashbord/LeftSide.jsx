import React from "react";
import PropTypes from "prop-types";
import leftScss from "./left.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import { NavLink } from "react-router-dom";
import { Box, Dialog, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Assignment,
  Lock,
  Logout,
  Person,
  QuestionMark,
} from "@mui/icons-material";
import axios from "axios";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Email from "@mui/icons-material/Email";

const propTypes = {};

const defaultProps = {};

export default class LeftSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      open: false,
      password: false,
      view: {
        url: "",
        heading: "",
        subHeading: "",
        ButtonName: "",
      },
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      error: "",
    };
  }
  token = localStorage.getItem("token");
  handleOpen = () => {
    this.setState({ open: true });
  };
  handClose = () => {
    this.setState({ open: false });
    this.setState({ error: "" });
    this.setState({
      view: {
        url: "",
        heading: "",
        subHeading: "",
      },
    });
  };
  openPassword = () => {
    this.setState({ password: true });
  };
  changePassword = async (e) => {
    e.preventDefault();
    try {
      if (this.state.newPassword !== this.state.confirmPassword) {
        this.setState({ error: "please confirm password did not matched" });
      } else {
        let result = await axios.post(
          "http://localhost:3000/v1/change-password",
          {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.confirmPassword,
          },
          { headers: { authorization: `Bearer ${this.token}` } }
        );
        if (result) {
          this.handClose();
          toast("password Changed successfully", {
            type: "success",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      this.setState({ error: error.response.data.errorMessage });
      console.log(error, "_____******_____ERRor message");
    }
  };

  logout = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/v1/logOut",
        {},
        { headers: { authorization: `Bearer ${this.token}` } }
      );
      localStorage.clear();

      toast("logout successfully", {
        type: "success",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error.message, "____________message");
    }
  };

  render() {
    return (
      <>
        <div className={`${leftScss.main} container-fluid`}>
          <div className="main side-bar row">
            <div
              className={`${leftScss.heading} dashbord col-md-12`}
              style={{ marginLeft: 25 }}
            >
              <img
                src="https://admin.crowd-hub.app/assets/images2/logo.svg"
                alt="left-side-logo"
                className={`${leftScss.headerLogo}img-fluid`}
              />
              <img
                src="https://admin.crowd-hub.app/assets/images2/crowdhubtxt.svg"
                alt="logo-2"
                className={`${leftScss.headerLogoText} img-fluid`}
              />
            </div>
            <div className={`${leftScss.proUser} proUser`}>
              <div>
                <img
                  src="https://admin.crowd-hub.app/assets/images2/profileDefaultImage.png"
                  alt=""
                  className={`${leftScss.subHeadingImg} img-fluid`}
                />
              </div>
              <div className="proText">
                <p className="mb-0"> Crowdhub Admin</p>
              </div>
            </div>
            <div className="row sidebar-menu-wrapper scrollbar-on-hover">
              <p
                className="menu-heading"
                style={{
                  color: "#FFFFFF",
                  margin: "0 0 0 16px",
                  padding: "0px 0px 0px 30px",
                  font: "18px Manrope ,sens-serif",
                  textTransform: "capitalize",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                General
              </p>
              <ul className="sidebar-menu-list" style={{ marginLeft: 30 }}>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex", marginBottom: 5 }}
                >
                  <NavLink
                    to="/dashbord"
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <DashboardIcon style={{ color: "white" }} />
                    </div>
                    <span
                      style={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 15px",
                        font: "18px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Dashbord
                    </span>
                  </NavLink>
                </li>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex", marginBottom: 5 }}
                >
                  <NavLink
                    to="/poll"
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <BarChartIcon style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 15px",
                        font: "18px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Pull Managment
                    </span>
                  </NavLink>
                </li>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex", marginBottom: 5 }}
                >
                  <NavLink
                    to="/question"
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      backgroundColor: "#ffffff00",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <QuestionMark style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 14px",
                        font: "17px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Question Management
                    </span>
                  </NavLink>
                </li>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex", marginBottom: 5 }}
                >
                  <NavLink
                    to="/users"
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      backgroundColor: "#ffffff00",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <Person style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 14px",
                        font: "17px Manrope ,sens-serif",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      User Managment
                    </span>
                  </NavLink>
                </li>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex" }}
                >
                  <NavLink
                    to="/content"
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <Assignment style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 15px",
                        font: "18px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Content Management
                    </span>
                  </NavLink>
                </li>
                <img
                  src="https://admin.crowd-hub.app/assets/images2/theme-border.svg"
                  alt=""
                />
              </ul>
            </div>
            <div>
              <ul className="bottom-menu">
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex", marginBottom: 5 }}
                >
                  <NavLink
                    onClick={() => {
                      this.handleOpen();
                      this.setState({
                        view: {
                          url: "https://admin.crowd-hub.app/assets/images2/change-pass.png",
                          heading: "Set New Password",
                          subHeading: "Must be at least 6 characters.",
                        },
                      });
                    }}
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <Lock style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 15px",
                        font: "18px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Change Password
                    </span>
                  </NavLink>
                </li>
                <li
                  className="sidebar-item mx-auto pointer active"
                  style={{ display: "flex" }}
                >
                  <NavLink
                    className="bg-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                      backgroundColor: "#ffffff00",
                    }}
                    onClick={() => {
                      this.handleOpen();
                      this.setState({
                        view: {
                          url: "https://admin.crowd-hub.app/assets/images2/logout.png",
                          heading: "Logout",
                          subHeading: "Are you sure you want to logout?",
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff00",
                        border: "1px solid white",
                        borderRadius: "50%",
                        padding: 10,
                      }}
                    >
                      <Logout style={{ color: "#ffffff" }} />
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#FFFFFF",
                        margin: "0 0 0 16px",
                        padding: "0px 0px 0px 15px",
                        font: "18px Manrope ,sens-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      Logout
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            PaperProps={{
              sx: { borderRadius: 5, height: "auto", width: "30%" },
            }}
            onClose={this.handClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="xs"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div style={{ textAlign: "center", overflow: "hidden" }}>
                  <img
                    src={this.state.view.url}
                    alt=""
                    style={{
                      height: "100px",
                      width: "100px",
                      alignItems: "center",
                    }}
                  />
                </div>
                <h3 style={{ textAlign: "center" }}>
                  {this.state.view.heading}
                </h3>
                <center>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "10px",
                      alignItems: "center",
                    }}
                  >
                    {this.state.view.subHeading}
                  </p>
                </center>
              </DialogContentText>
            </DialogContent>
            {this.state.view.heading === "Set New Password" ? (
              <DialogActions className="d-flex justify-content-between m-4">
                <form
                  onSubmit={this.changePassword}
                  style={{
                    width: "100%",
                  }}
                >
                  <div onClose={this.handClose}>

                      <div
                        className="input-group flex-nowrap"
                        style={{ marginBottom: "15px", width: "100%" }}
                      >
                        <span className="input-group-text" id="oldPassword">
                          <Lock />
                        </span>
                        <OutlinedInput
                          type="password"
                          name="oldPassword"
                          id="oldPassword"
                          placeholder="Old password"
                          onChange={(e) => {
                            this.setState({ oldPassword: e.target.value });
                          }}
                          sx={{ width: "100%" }}
                          required
                        />
                      </div>

                      <div
                        className="input-group flex-nowrap"
                        style={{ marginBottom: "15px", width: "100%" }}
                      >
                        <span className="input-group-text" id="newPassword">
                          <Lock />
                        </span>
                        <OutlinedInput
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          placeholder="new password"
                          required
                          onChange={(e) => {
                            this.setState({ newPassword: e.target.value });
                          }}
                          sx={{ width: "100%"}}
                        />
                      </div>
                      <div
                        className="input-group flex-nowrap"
                        style={{ marginBottom: "15px", width: "100%" }}
                      >
                        <span className="input-group-text" id="confirmPassword">
                          <Lock />
                        </span>
                        <OutlinedInput
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="confirm password"
                          required
                          onChange={(e) => {
                            this.setState({ confirmPassword: e.target.value });
                          }}
                          sx={{ width: "100%"}}
                        />
                      </div>
                      <div className="text-danger">
                        {this.state.error !== "" && (
                          <p style={{ color: "red" }}>{this.state.error} </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button
                        className="bg-danger text-light w-100 mb-0"
                        type="submit"
                        style={{ marginTop: 20 }}
                      >
                        Reset-Password
                      </Button>
                    </div>
            
                </form>
              </DialogActions>
            ) : (
              <DialogActions className="d-flex justify-content-between m-4">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                   
                  }}
                >
                  <Button
                    className=" text-dark border border-secondary-subtle  mb-0"
                    onClick={this.handClose}
                  >
                    No
                  </Button>
                  <NavLink to="/">
                    <Button
                      className="bg-danger text-light mb-0"
                      onClick={() => this.logout()}
                     
                    >
                      Logout
                    </Button>
                  </NavLink>
                </div>
              </DialogActions>
            )}
          </Dialog>
        </div>
      </>
    );
  }
}

LeftSide.propTypes = propTypes;
LeftSide.defaultProps = defaultProps;
