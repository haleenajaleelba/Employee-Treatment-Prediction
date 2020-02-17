import React, { Component } from "react";
import authService from "../Services/authService";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        username: "",
        password: ""
      },

      error: {
        username: "",
        password: ""
      },
      flag: {
        invalidErrorFlag: false,
        technicalErrorFlag: false
      }
    };
  }

  handleSubmit = () => {
    let flag = true;
    const formFields = this.state.formFields;

    for (const key in formFields) {
      this.validate(key);
    }

    const error = this.state.error;
    for (const key in error) {
      if (error[key] !== "") {
        flag = false;
        break;
      }
    }

    if (flag === true) {
      console.log(this.state.formFields);
      const admin = this.state.formFields;
      authService
        .ValidateUser(admin)
        .then(res => {
          if (res.status === 200) {
            let data = res.data;            
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("refresh_token", data["refresh_token"]);
            this.props.history.push("/admin");
          } else if (res.status === 401) {
            this.setState({
              flag:{
                invalidErrorFlag: true,
                technicalErrorFlag: false
              }
            })
          } else {
            this.setState({
              flag:{
                invalidErrorFlag: false,
                technicalErrorFlag: true
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleChange = event => {
    const formFields = this.state.formFields;
    formFields[event.target.name] = event.target.value;
    this.setState({
      formFields
    });
    this.validate(event.target.name);
  };

  validate(control) {
    const error = this.state.error;
    if (this.state.formFields[control] === "") {
      error[control] = `Please Enter ${control}`;
    } else {
      error[control] = "";
    }
    this.setState({
      error
    });
  }

  render() {
    return (
      <div className="container">
        <div
          className="card-group"
          style={{ paddingTop: "40px", marginBottom: "70px", width: "80%" }}
        >
          <div className="card bg-info bg-light shadow-lg p-3 mb-5 border  border-info rounded">
            <div className="card-body">
              <h1 className="text-info card-title">Login</h1>
              <hr />

              <div className="form-group">
                {this.state.flag.invalidErrorFlag && (
                  <div
                    className="container text-danger"
                    style={{ fontSize: "24px" }}
                  >
                    Invalid username or password
                  </div>
                )}

                {this.state.flag.technicalErrorFlag && (
                  <div
                    className="container text-danger"
                    style={{ fontSize: "24px" }}
                  >
                    Opps!!! Technical error, Try after some time.
                  </div>
                )}
                <label htmlFor="username" className="text-success">
                  User Id
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  onChange={this.handleChange}
                  placeholder="Enter the User Id"
                />
                <span className="text-danger">
                  {this.state.error["username"]}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-success">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Enter the Password"
                />
                <span className="text-danger">
                  {this.state.error["password"]}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
