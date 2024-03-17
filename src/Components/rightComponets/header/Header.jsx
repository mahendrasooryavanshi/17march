import React from "react";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
// import rightSccs from '../../dashbord/right.module.scss'
const propTypes = {};

const defaultProps = {};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="container-fluid" style={{height:'100%',maxWidth:'70%', marginLeft: '30%',}}>
          <div className="row" style={{ marginTop: 15 }}>
            <div
              className="col"
              style={{
                alignItems: "center",
                textAlign: "center",
                display: "flex",
                marginBottom: 15,
              }}
            >
              <h5 style={{ margin: 3, fontWeight: 600, fontSize: 20 }}>
                {this.props.heading}
              </h5>
              <button
                style={{ marginLeft: "auto", borderRadius: 30, padding: 10 }}
                className="btn btn-primary"
              >
                <AddIcon />
                <span> Create New Poll</span>
              </button>
            </div>
            <hr />
          </div>
        </div>
      </>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
