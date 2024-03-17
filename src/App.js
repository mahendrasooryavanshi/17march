import React from "react";
// import PropTypes from 'prop-types';
import Login from "./Components/login/Login";
import { LoginFun } from "./Components/login/Login";
import ContentMang from "./Components/rightComponets/contentManagment/ContentMang";
// import Home from './Components/rightComponets/home/Home';
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import Deshbord from "./Components/dashbord/Deshbord";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import LeftSide from "./Components/dashbord/LeftSide";
import UserManagment from "./Components/rightComponets/userManagment/UserManagment";
import Forgot from "./Components/rightComponets/forgot-password/Forgot";
import Question from "./Components/rightComponets/Question/Question";
import Pull from "./Components/rightComponets/pull-managment/Pull";
const propTypes = {};

const defaultProps = {};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let token = localStorage.getItem("token");

    return (
      <>
        <Routes>
          <Route index element={<LoginFun />} />

          <Route path="forgot-password" element={<Forgot />} />
          {/* <Route path="*" element={<NoPage />} /> */}

          <Route element={<Users />}>
            <Route path="dashbord" element={<Deshbord />} />
            <Route path="poll" element={<Pull />} />
            <Route path="users" element={<UserManagment />} />
            <Route path="question" element={<Question />} />
            <Route path="content" element={<ContentMang />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-center"
          transition={Flip}
          draggable={true}
          style={{
            width: "25%",
          }}
          toastStyle={{
            filter: "drop-shadow(5px 5px 8px rgb(104, 97, 119))",
          }}
          autoClose={3000}
        />
      </>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

function Users() {
  // const navigate = useNavigate();
  let token = localStorage.getItem("token");
  return token !== null ? (
    <>
      <LeftSide />
      <Outlet />
    </>
  ) : (
    <>
      <div
        style={{
          border: "2px solid grey",
          borderRadius: "10px",
          textAlign: "center",
          width: "50%",
          margin: "auto",
        }}
      >
        <h1>Please Login First</h1>
        <NavLink to="/">Login</NavLink>
      </div>
    </>
  );
}
