import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../Images/logo.png";
import logout from "../../../Images/sign-out-option.svg";

export default class adminmenu extends Component {
  constructor(props) {
    super(props);
    const admin = JSON.parse(localStorage.getItem("admin"));
    this.state = {
      admin: admin
    };
  }

  handelLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm sticky-top">
        <NavLink className="navbar-brand text-light" to="/admin">
          <img
            src={logo}
            alt="FreshMinds"
            style={{ width: "50px", height: "50px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink
                className="nav-link text-info m-xs font-weight-bold"
                to="/admin/userlist"
              >
                UserList
              </NavLink>
            </li>
            <li className="nav-item">
              <div onClick={this.handelLogout}>
                <img src={logout} alt="logout"></img>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
