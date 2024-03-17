import React from "react";
// import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Deshbord from "../dashbord/Deshbord";
// import CryptoJS from "crypto-js";
import loginScss from "./login.module.scss";
import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const propTypes = {};

const defaultProps = {};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false,
      error: "",
    };
  }
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3000/login", {
        email: this.state.email,
        password: this.state.password,
      });
      localStorage.setItem("token", result.data.accessToken);
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(result.data),
        "secret key 123"
      ).toString();
      localStorage.setItem("auth", ciphertext);
      this.props.navigate("/dashbord");
      toast("login success", {
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
      this.setState({ error: error.response.data.errorMessage });
      console.log(error.response.data.errorMessage, "________-massage");
    }
  };
  render() {
    return (
      <>
        <div className={`${loginScss.mainContainer} container-fluid`}>
          <div className={`${loginScss.left}`}>
            <div
              className="auth-img"
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: "100vh",
                justifyContent: "flex-end",
              }}
            >
              <img
                src="https://admin.crowd-hub.app/assets/images2/auth-img.png"
                alt="logo"
                id={loginScss.img}
              />
            </div>
          </div>
          <div className={`${loginScss.right}`}>
            <div className={`${loginScss.login}`}>
              <div>
                <img
                  src="https://admin.crowd-hub.app/assets/images2/crowdhub-logo.svg"
                  alt=""
                  id={loginScss.loginImg}
                />
              </div>
              <div id="form">
                <form method="POST" onSubmit={this.onSubmit} action="#">
                  <div className="form-group">
                    <div className="heading">
                      <h1>Login</h1>
                      <h5
                        style={{
                          alignItems: "center",
                          marginTop: 15,
                          fontSize: 12,
                          color: "grey",
                        }}
                      >
                        Welcome Back
                      </h5>
                    </div>
                    <div
                      className="form-group"
                      style={{ alignItems: "center", marginTop: 35 }}
                    >
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="username">
                          <EmailIcon />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          id="username"
                          name="email"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          aria-label="email"
                          aria-describedby="addon-wrapping"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="form-group"
                    style={{ alignItems: "center", marginTop: 20 }}
                  >
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text">
                        <LockIcon />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        aria-label="email"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                    {this.state.error !== "" && (
                      <p style={{ color: "red", fontSize: 10, margin: "10px" }}>
                        {this.state.error}{" "}
                      </p>
                    )}
                  </div>
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <label htmlFor="remember-me" className="text-info">
                      <span>
                        <input
                          id="remember-me"
                          name="remember"
                          type="checkbox"
                          onClick={(e) => {
                            this.setState({ remember: e.target.checked });
                          }}
                        />
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 15,
                          alignItems: "center",
                          fontWeight: 300,
                          marginLeft: 5,
                          textAlign: "center",
                        }}
                      >
                        Remember me
                      </span>
                       
                    </label>
                    <br />
                    <div className="form-group" style={{ marginLeft: 35 }}>
                      <NavLink
                        to="/forgot-password"
                        style={{ textDecoration: "none" }}
                      >
                        Forgot password
                      </NavLink>
                    </div>
                  </div>
                  <Button type="submit" variant="primary">
                    Login
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export function LoginFun() {
  const navigate = useNavigate();
  return <Login navigate={navigate}> </Login>;
}
