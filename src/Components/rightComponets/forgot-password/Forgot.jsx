import React from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

import CryptoJS from "crypto-js";
import loginScss from '../../login/login.module.scss'
import {NavLink} from 'react-router-dom'

const propTypes = {};

const defaultProps = {};

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClickOpen = () => {
    this.setState(true);
  };

  handleClose = () => {
    this.setState(false);
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
                  id={loginScss.loginImg} />
              </div>
              <div id="form">
                <form method="POST" onSubmit={this.onSubmit} action="#">
                  <div className="form-group">
                    <div className="heading">
                      <h1>Forgot Password</h1>
                      <h5
                        style={{
                          alignItems: "center",
                          marginTop: 15,
                          fontSize: 12,
                          color: "grey",
                        }}
                      >
                       No worries, we’ll send you reset instructions.
                      </h5>
                    </div>
                    <div  className="form-group"
                      style={{ alignItems: "center", marginTop: 35,marginTop: 5,  display: "flex", }}     >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        id="username"
                        name="email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }

                        required
                      />
                    </div>
                  </div>
    
                  <Button type="submit" variant="primary" >
                    Send
                  </Button>
                        <NavLink to='/'> back to login</NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
   
      </>
    );
  }
}

Forgot.propTypes = propTypes;
Forgot.defaultProps = defaultProps;
