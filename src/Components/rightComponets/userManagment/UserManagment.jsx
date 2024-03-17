import React from "react";
import PropTypes from "prop-types";
import Header from "../header/Header";
import axios from "axios";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";
import { Box, Pagination, Stack } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
import Loading from "../../loading/Loading";
const propTypes = {};

const defaultProps = {};

export default class UserManagment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      error: "",
      orderBy: "id",
      orderType: "DESC",
      status: "",
      search: "",
      loading: false,
      page: 2,
      offset: null,
      imgError: null,
    };
  }
  token = localStorage.getItem("token");

  users = async () => {
    let params = {
      userIds: "",
      status: this.state.status,
      search: this.state.search,
      offset: this.state.offset,
    };
    try {
      let result = await axios.get("http://localhost:3000/v1/user-list", {
        headers: { Authorization: `Bearer ${this.token}` },
        params,
      });
      this.setState({ userData: result.data.results });
      let page = result.data.count / 10;
      page = Math.ceil(page);
      this.setState({ page: page });
    } catch (error) {
      this.setState({ userData: null });
      this.setState({ error: error.response.data.errorMessage });
      console.log(error, "_______error ");
    }
  };
  handlePage = async (event, value) => {
    this.setState({ loading: true });
    this.setState({ offset: 10 * (value - 1) });
    setTimeout(() => {
      this.users();
      this.setState({ loading: false });
    }, 2000);
  };
  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.users();
      this.setState({ loading: false });
    }, 3000);
  }
  statusChange = async ({ user }) => {
    let status;

    if (user.status === "active") {
      status = "inactive";
    } else {
      status = "active";
    }
    let params = { userId: user.publicId, status: status };
    try {
      let result = await axios.put(
        "http://localhost:3000/v1/update-profile",
        params,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );

      if (result) {
        this.users();
        toast("status updated successfully", {
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
      }
    } catch (error) {
      console.log(error.response.errorMessage);
    }
  };
  deleteUser = async ({ user }) => {
    let userId = user.publicId;
    try {
      let result = await axios.delete(
        `http://localhost:3000/v1/deleteUsers/${userId}`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      if (result) {
        toast("user deleted successfully", {
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
      }
    } catch (error) {
      console.log(error, "______ERROR");
    }
  };
  onError = async (event) => {
    event.target.src =
      "https://admin.crowd-hub.app/assets/images2/profileDefaultImage.png";
  };
  render() {
    return (
      <>
        <Header heading={"User Management"} />

        <div style={{ height: "100%", maxWidth: "70%", marginLeft: "30%" }}>
          <div
            className="container-fluid"
            style={{
              marginTop: 0,
              paddingTop: 0,
            }}
          >
            <section>
              <div style={{ alignItems: "center", display: "flex" }}>
                <h4>Registered Users</h4>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ width: "500px", margin: 10 }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" || e.target.value === "") {
                      this.setState({ loading: true });
                      this.setState({ search: e.target.value });
                      setTimeout(() => {
                        this.users();
                        this.setState({ loading: false });
                      }, 5000);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      this.setState({ loading: true });
                      this.setState({ search: e.target.value });
                      setTimeout(() => {
                        this.users();
                        this.setState({ loading: false });
                      }, 5000);
                    }
                  }}
                />
                <label htmlFor="sorting">
                  Sort By :
                  <select
                    id="option"
                    style={{
                      fontSize: 15,
                      border: "1px solid balck",
                      borderRadius: 10,
                      padding: 5,
                    }}
                    onChange={(e) => {
                      this.setState({ loading: true });
                      this.setState({ status: e.target.value });
                      setTimeout(() => {
                        this.users();
                        this.setState({ loading: false });
                      }, 5000);
                    }}
                  >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
              </div>
              <div>
                <div>{this.state.loading === true && <Loading />}</div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Users</th>
                      <th scope="col">Registration Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  {this.state.userData !== null &&
                    this.state.userData.map((users, key) => {
                      return (
                        <tbody>
                          <tr key={key}>
                            <td>
                              <img
                                src={
                                  users.profile == null
                                    ? "https://admin.crowd-hub.app/assets/images2/profileDefaultImage.png"
                                    : users.profile
                                }
                                alt="profile-img"
                                style={{
                                  border: "2px solid white",
                                  height: "45px",
                                  width: "45px",
                                  borderRadius: "50%",
                                }}
                                onError={this.onError}
                              />
                              {users.firstName} {users.lastName}
                            </td>
                            <td>
                              <Moment format="D MMM YYYY" withTitle>
                                {users.createdAt}
                              </Moment>
                            </td>
                            <td>
                              {
                                <Switch
                                  checked={
                                    users.status === "active" ? true : false
                                  }
                                  onChange={() =>
                                    this.statusChange({ user: users })
                                  }
                                />
                              }
                            </td>
                            <td>
                              <DeleteIcon
                                fontSize="large"
                                color="error"
                                onClick={() => this.deleteUser({ user: users })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
                {this.state.userData !== null && (
                  <div>
                    <Stack>
                      <Pagination
                        defaultPage={1}
                        count={this.state.page}
                        onChange={this.handlePage}
                        color="primary"
                      />
                    </Stack>
                  </div>
                )}
                <div>
                  {this.state.userData === null && (
                    <div
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "414px",
                        width: "584px",
                      }}
                    >
                      <div
                        style={{
                          top: "50%",
                          color: "#212529",
                          alignItems: "center",
                          textAlign: "center",
                          marginLeft: "31%",
                        }}
                      >
                        <img
                          src="https://admin.crowd-hub.app/assets/images2/no-data_found.png"
                          className="rounded float-left"
                          alt=""
                          style={{ marginBottom: "25px" }}
                        />
                        <div>
                          <p>{this.state.error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

UserManagment.propTypes = propTypes;
UserManagment.defaultProps = defaultProps;
