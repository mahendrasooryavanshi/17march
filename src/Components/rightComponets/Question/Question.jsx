import React from "react";
import PropTypes from "prop-types";
import Header from "../header/Header";
import axios from "axios";
import Loading from "../../loading/Loading";

import AddIcon from "@mui/icons-material/Add";
// import { Button } from "react-bootstrap";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import Moment from "react-moment";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Lock } from "@mui/icons-material";
const propTypes = {};

const defaultProps = {};

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      open: false,
      loading: false,
      search: "",
      id: null,
      questionOption: [],
      Question: "",
      data: null,
      key: [1, 2],
      page: 2,
      offset: null,
      view: {
        title: "",
        topHeading: "",
        bottomHeading: "",
        subHeading: "",
        button1: "",
        click: "",
        error: "",
      },
    };
  }

  token = localStorage.getItem("token");
  handleAdd = async () => {
    this.setState({ key: [...this.state.key, this.state.key.length + 1] });
  };
  handleInput = async (key, { title }) => {
    let opt = [...this.state.questionOption];
    opt[key] = { ...opt[key], title };
    this.setState({ questionOption: opt });
  };
  handleChange = async (key, value) => {
    let opt = [...this.state.questionOption];
    opt[key].title = value;
    this.setState({ ...this.state, title: opt });
  };
  handleX = (index) => {
    let inputFileds = [...this.state.key];
    inputFileds.splice(index, 1);
    inputFileds.forEach((value, key) => {
      if (value > index) {
        inputFileds[key] = value - 1;
      }
    });
    this.setState({ key: inputFileds });
  };
  handleY = (index) => {
    let inputFileds = [...this.state.questionOption];
    inputFileds.splice(index, 1);
    inputFileds.forEach((value, key) => {
      if (value > index) {
        inputFileds[key] = value - 1;
      }
    });
    this.setState({ ...this.state, questionOption: inputFileds });
  };

  handleAdd2 = () => {
    this.setState({
      questionOption: [...this.state.questionOption, { title: "" }],
    });
  };
  handleOpen = async ({ type, id, data }) => {
    let tempArr = [];
    if (type === "edit") {
      data.options.map((value) => tempArr.push({ title: value.option }));
    }
    type === "add"
      ? this.setState({
          view: {
            title: "Create New Question",
            topHeading: "Question",
            bottomHeading: "Options",
            subHeading: "option ",
            button1: "Add Option",
            click: "Create",
          },
        })
      : type === "edit"
      ? this.setState({
          view: {
            title: "Edit  Question",
            topHeading: "Question",
            bottomHeading: "Options",
            subHeading: "option ",
            button1: "Add Option",
            click: "Update",
          },
          id,
          questionOption: tempArr,
          Question: data.title,
        })
      : type === "delete"
      ? this.setState({
          view: {
            title: "Delete Question",
            topHeading: "Question",
            bottomHeading: "Options",
            subHeading: "Are you sure you want to delete this question? ",
            button1: "Cancel",
            click: "Delete",
            url: "https://admin.crowd-hub.app/assets/images2/delete-img.svg",
          },
          id,
        })
      : this.setState({ view: null });
    this.setState({ open: true });
  };
  handClose = async () => {
    this.setState({ open: false });
    this.setState({ key: [1, 2] });
  };

  deleteQuestion = async () => {
    try {
      
      let result = await axios.delete(
        `http://localhost:3000/v1/question/${this.state.id}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (result) {
        await this.questionList();
        this.handClose();
        toast("Question Deleted Successfully", {
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
      this.setState({ error: error.response.data.errorMessage });
      console.log(error);
    }
   
  };
  updateQestion = async () => {
    let body = {
      question: this.state.Question,
      questionOption: this.state.questionOption,
      id: this.state.id,
    };
    console.log("updateQuestion invoked", body);
    try {
      let result = await axios.put(
        `http://localhost:3000/v1/question/${this.state.id}`,
        body,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (result) {
        await this.questionList();
        this.handClose();
        toast("Question updated Successfully", {
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
      console.log(result, "update question api result");
    } catch (error) {
      console.log(error, "update question api error");
    }
  };
  questionList = async () => {
    let params = { search: this.state.search, offset: this.state.offset, };
    try {
      let result = await axios.get("http://localhost:3000/v1/question", {
        headers: { Authorization: `Bearer ${this.token}` },
        params,
      });
   
      let newData = result.data.results;
      if (newData.length > 0) {
        this.setState({ question: newData });
        let page=result.data.count/10
        console.log(result.data.count,"___________________>>>>>>>>>>>>>>>>>>>>>>")
        page=Math.ceil(page)
        this.setState({page:page})
      } else {
        this.setState({ question: null });
        this.setState({ error: "Record not found" });
      }
    } catch (error) {
      console.log(error, "________Error");
      this.setState({ error: error.response.data.errorMessage });
    }
  };

  addQuestion = async () => {
    let body = {
      question: this.state.Question,
      questionOption: this.state.questionOption,
    };
    try {
      let result = await axios.post("http://localhost:3000/v1/question", body, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (result) {
        this.questionList();
        this.handClose();
        toast("Question is created successfull", {
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
      console.log(error.response.data.errorMessage, "_________________error");
    }
  };

  handlePage = async (event, value) => {
    this.setState({page:event.eventPhase})
    this.setState({ loading: true })
    this.setState({ offset: 10 * (value - 1) });
    setTimeout(() => {
      this.questionList();
      this.setState({ loading: false });
    }, 2000);
  };
  componentDidMount() { 
    this.setState({ loading: true });
    setTimeout(() => {
      this.questionList();
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    return (
      <>
        <Header heading={"Question Managment"} />
        <div style={{ height: "100%", maxWidth: "70%", marginLeft: "30%" }}>
          <h1> Question managment</h1>
          <div
            className="container-fluid"
            style={{
              marginTop: 0,
              paddingTop: 0,
            }}
          >
            <section>
              <div style={{ alignItems: "center", display: "flex" }}>
                <h4>Question List</h4>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search by Question"
                  aria-label="Search"
                  style={{ width: "500px", margin: 10 }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" || e.target.value === "") {
                      this.setState({ loading: true });
                      this.setState({ search: e.target.value });
                      setTimeout(() => {
                        this.questionList();
                        this.setState({ loading: false });
                      }, 3000);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      this.setState({ loading: true });
                      this.setState({ search: e.target.value });
                      setTimeout(() => {
                        this.questionList();
                        this.setState({ loading: false });
                      }, 3000);
                    }
                  }}
                />

                <Button
                  variant="contained"
                  onClick={() => {
                    this.handleOpen({ type: "add" });
                  }}
                >
                  <AddIcon />
                  <Typography component={"span"} />
                  Create Question
                </Button>
              </div>

              <div>
                <div> {this.state.loading === true && <Loading />}</div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Question</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Answers</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.question !== null &&
                      this.state.question.map((value, key) => {
                        return (
                          <tr
                            key={key}
                            className="draggable"
                            draggable="true"
                           
                          >
                            <td>{value.id}</td>
                            <td>{value.title}</td>
                            <td>
                              <Moment format="D MMM YYYY" withTitle>
                                {value.createdAt}
                              </Moment>
                            </td>
                            <td>
                              <ol>
                                {value.options !== undefined &&
                                  value.options.map((value, key) => {
                                    return <li key={key}>{value.option}</li>;
                                  })}
                              </ol>
                            </td>
                            <td>
                              <div className="d-flex">
                                <EditIcon
                                  fontSize="large"
                                  color="primary"
                                  onClick={() => {
                                    this.handleOpen({
                                      type: "edit",
                                      data: value,
                                      id: value.id,
                                    });
                                  }}
                                />
                                <DeleteIcon
                                  fontSize="large"
                                  color="error"
                                  onClick={() => {
                                    this.handleOpen({
                                      type: "delete",
                                      id: value.id,
                                    });
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
               { this.state.question !==null &&  <div>
                <Stack spacing={2}>
                      <Pagination
                        defaultPage={1}
                        count={this.state.page}
                        onChange={this.handlePage}
                        color="primary"

                      />
                    </Stack>
                </div>  }
                <div>
                  {this.state.question === null && (
                    <div
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        height: "414px",
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
                          {this.state.error && (
                            <p className="errorText">{this.state.error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="form-group">
          <Dialog
            open={this.state.open}
            PaperProps={{
              sx: { borderRadius: 5, width: "40%", height: "auto" },
            }}
            onClose={this.handClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="xs"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10%",
                    marginTop: 15,
                  }}
                >
                  <h3 style={{ textAlign: "center", color: "black" }}>
                    {this.state.view.title}
                  </h3>
                </div>
                {this.state.view.click === "Delete" ? (
                  <div
                    style={{
                      marginBottom: "15px",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "18%" }}>
                      <img src={this.state.view.url} alt="" srcset="" />
                      <p>{this.state.view.subHeading}</p>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => this.handClose()}
                      >
                        {this.state.view.button1}
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => this.deleteQuestion()}
                      >
                        {this.state.view.click}
                      </Button>
                    </div>
                  </div>
                ) : this.state.view.click === "Create" ? (
                  <div>
                    <div
                      style={{
                        marginBottom: "15px",
                        color: "black",
                        width: "100%",
                      }}
                    >
                      <Typography style={{ marginBottom: "5px" }} />
                      {this.state.view.topHeading}
                    </div>

                    <OutlinedInput
                      placeholder="Write your Question"
                      style={{ marginBottom: "15px", width: "100%" }}
                      onChange={(e) => {
                        this.setState({ Question: e.target.value });
                      }}
                    />
                    <div style={{ marginBottom: "15px" }}>
                      <h3 style={{ marginBottom: "5px" }}>Options</h3>

                      {this.state.key.map((value, key) => (
                        <div key={key} className="input-group flex-nowrap">
                          <OutlinedInput
                            placeholder={`option ${key + 1}`}
                            style={{ marginBottom: "15px", width: "100%" }}
                            onChange={(e) => {
                              this.handleInput(key, { title: e.target.value });
                            }}
                            endAdornment={
                              key > 1 && (
                                <Button color="error">
                                  <CancelIcon
                                    onClick={() => this.handleX(key)}
                                  />
                                </Button>
                              )
                            }
                          />
                        </div>
                      ))}

                      <Button
                        variant="outlined"
                        style={{
                          marginBottom: "15px",
                          width: "100%",
                          height: "50px",
                          alignItems: "center",
                        }}
                        onClick={() => this.handleAdd()}
                      >
                        <AddIcon />
                        <Typography component={"span"} />
                        {this.state.view.button1}
                      </Button>
                      <div>
                        <Button
                          variant="contained"
                          style={{
                            marginBottom: "15px",
                            height: "50px",
                            alignItems: "center",
                            marginLeft: "75%",
                            background: "#20B0D4",
                          }}
                          onClick={() => this.addQuestion()}
                        >
                          {this.state.view.click}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        marginBottom: "15px",
                        color: "black",
                        width: "100%",
                      }}
                    >
                      <Typography style={{ marginBottom: "5px" }} />
                      {this.state.view.topHeading}
                    </div>
                    <OutlinedInput
                      placeholder="Write your Question"
                      style={{ marginBottom: "15px", width: "100%" }}
                      value={
                        this.state.Question !== null && this.state.Question
                      }
                      onChange={(e) => {
                        this.setState({ Question: e.target.value });
                      }}
                    />
                    <h3 style={{ marginBottom: "5px" }}>Options</h3>

                    {this.state.questionOption.map((value, key) => (
                      <div key={key} className="input-group flex-nowrap">
                        {console.log(key, "______Value")}
                        <OutlinedInput
                          value={value.title}
                          style={{ marginBottom: "15px", width: "100%" }}
                          onChange={(e) => {
                            this.handleChange(key, e.target.value);
                          }}
                          endAdornment={
                            key > 1 && (
                              <Button color="error">
                                <CancelIcon onClick={() => this.handleY(key)} />
                              </Button>
                            )
                          }
                        />
                      </div>
                    ))}

                    <Button
                      variant="outlined"
                      style={{
                        marginBottom: "15px",
                        width: "100%",
                        height: "50px",
                        alignItems: "center",
                      }}
                      onClick={this.handleAdd2}
                    >
                      <AddIcon />
                      <Typography component={"span"} />
                      {this.state.view.button1}
                    </Button>
                    <div>
                      <Button
                        variant="contained"
                        style={{
                          marginBottom: "15px",
                          height: "50px",
                          alignItems: "center",
                          marginLeft: "75%",
                          background: "#20B0D4",
                        }}
                        onClick={() => this.updateQestion()}
                      >
                        {this.state.view.click}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;
