import React, { Component, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import employeeService from "../Services/employeeService";
import resYes from "../Images/resYes.png";
import resNo from "../Images/resNo.png";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class knowyourstatus extends Component {
  res = "";
  constructor() {
    super();
    this.state = {
      Country_list: [],
      state_list: [],
      city_list: [],
      one_state: "",
      one_Country: "",
      formField: {
        Age: "",
        email: "",
        Gender: "SELECT",
        Country: "India",
        self_employed: "SELECT",
        family_history: "SELECT",
        work_interfere: "SELECT",
        no_employees: "SELECT",
        remote_work: "SELECT",
        tech_company: "SELECT",
        benefits: "SELECT",
        care_options: "SELECT",
        wellness_program: "SELECT",
        seek_help: "SELECT",
        anonymity: "SELECT",
        leave: "SELECT",
        mental_health_consequence: "SELECT",
        phys_health_consequence: "SELECT",
        coworkers: "SELECT",
        supervisor: "SELECT",
        mental_health_interview: "SELECT",
        phys_health_interview: "SELECT",
        mental_vs_physical: "SELECT",
        obs_consequence: "SELECT",
        comments: ""
      },
      error: {
        Age: "",
        email: "",
        Gender: "",
        self_employed: "",
        family_history: "",
        work_interfere: "",
        no_employees: "",
        remote_work: "",
        tech_company: "",
        benefits: "",
        care_options: "",
        wellness_program: "",
        seek_help: "",
        anonymity: "",
        leave: "",
        mental_health_consequence: "",
        phys_health_consequence: "",
        coworkers: "",
        supervisor: "",
        mental_health_interview: "",
        phys_health_interview: "",
        mental_vs_physical: "",
        obs_consequence: "",
        comments: ""
      },
      modal: false
    };

    this.res = "No";
  }

  // componentWillMount() {
  //   console.log("component will mount");
  //   let Country_list = csc.getAllCountries();
  //   //console.log(Country_list);
  //   this.setState({
  //     Country_list
  //   });
  // }

  handleChange = event => {
    const formField = this.state.formField;
    formField[event.target.name] = event.target.value;
    this.setState({
      formField
    });
    // console.log(this.state.formField);
    this.validate(event.target.name);
  };

  validate(control) {
    const error = this.state.error;
    if (this.state.formField[control] === "SELECT") {
      error[control] = `Please select ${control}`;
    } else if (control === "Age") {
      if (this.state.formField[control].trim() === "") {
        error[control] = "Please enter Age";
      } else if (
        this.state.formField[control] < 18 ||
        this.state.formField[control] > 65
      ) {
        error[control] = `Value of Age must be between 18 and 65`;
      } else {
        error[control] = "";
      }
    } else if (control === "email") {
      let email_regex = /.+@.+\.[A-Za-z]+$/;
      if (this.state.formField[control].trim() === "") {
        error[control] = "Please enter email";
      } else if (!this.state.formField[control].match(email_regex)) {
        error[control] = `Please enter valid email id`;
      } else {
        error[control] = "";
      }
    } else if (this.state.formField[control] === "SELECT") {
      error[control] = `Please Enter valid ${control}`;
    } else {
      error[control] = "";
    }
    this.setState({
      error
    });
  }

  handleSave = () => {
    let flag = true;
    const formField = this.state.formField;

    for (const key in formField) {
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
      console.log(this.state.formField);
      employeeService
        .addEmployee(this.state.formField)
        .then(res => {
          console.log(res);
          if (res.status === 201) {
            this.res = res.data.result;
            this.toggle();
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  toggle = () => {
    let val = this.state.modal;
    // if(val == )
    this.setState({
      modal: !val
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div
              className="card bg-info bg-light shadow-lg p-3 mb-5 border  border-info rounded"
              style={{ marginTop: 20 }}
            >
              <div className="card-body">
                <div>
                  <h1 className="text-info card-title">Know Your Status</h1>
                  <hr />
                  <div>
                    <div className="form-group">
                      <label htmlFor="Age" className="text-success">
                        Age
                      </label>
                      <input
                        type="number"
                        name="Age"
                        className="form-control"
                        id="Age"
                        placeholder="Enter your Age"
                        onChange={this.handleChange}
                      />
                    </div>
                    <span className="text-danger">
                      {this.state.error["Age"]}
                    </span>
                    <div className="form-group">
                      <label htmlFor="email" className="text-success">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your Email"
                        onChange={this.handleChange}
                      />
                    </div>
                    <span className="text-danger">
                      {this.state.error["email"]}
                    </span>
                    <div className="form-group">
                      <label htmlFor="Gender" className="text-success">
                        Gender
                      </label>
                      <select
                        className="form-control"
                        id="Gender"
                        name="Gender"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <span className="text-danger">
                        {this.state.error["Gender"]}
                      </span>
                    </div>

                    {/* <div className="form-group">
                      <br />
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="text-success"
                      >
                        Select Country
                      </label>
                      <select
                        name="Country"
                        className="countries form-control"
                        id="Country"
                        onChange={this.handleChange}
                      >
                        <option value="SELECT">Select Country</option>
                        {this.state.Country_list.map(Country => {
                          return (
                            <option value={Country.name} key={Country.id}>
                              {Country.name}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="self_employed" className="text-success">
                        Self Employed
                      </label>
                      <select
                        name="self_employed"
                        className="form-control"
                        id="self_employed"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <small
                        id="self_employedhelp"
                        className="form-text text-muted"
                      >
                        Are you self employed.
                      </small>
                      <span className="text-danger">
                        {this.state.error["self_employed"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="family_history" className="text-success">
                        Family History
                      </label>
                      <select
                        name="family_history"
                        className="form-control"
                        id="family_history"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <small
                        id="family_historyhelp"
                        className="form-text text-muted"
                      >
                        Do you have a family history of mental illness
                      </small>
                      <span className="text-danger">
                        {this.state.error["family_history"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="work_interfere" className="text-success">
                        Work Interfere
                      </label>
                      <select
                        name="work_interfere"
                        className="form-control"
                        id="work_interfere"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Often">Often</option>
                        <option value="Rarely">Rarely</option>
                        <option value="Never">Never</option>
                        <option value="Sometimes">Sometimes</option>
                      </select>
                      <small
                        id="work_interferehelp"
                        className="form-text text-muted"
                      >
                        If you have a mental health condition,do you feel that
                        it interferes with your work
                      </small>
                      <span className="text-danger">
                        {this.state.error["work_interfere"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="no_employees" className="text-success">
                        Number of Employees
                      </label>
                      <select
                        name="no_employees"
                        className="form-control"
                        id="no_employees"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="1-5">1-5</option>
                        <option value="6-25">6-25</option>
                        <option value="26-100">26-100</option>
                        <option value="100-500">100-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="More than 1000">More than 1000</option>
                      </select>
                      <small
                        id="no_employeeshelp"
                        className="form-text text-muted"
                      >
                        How many employees does your company or organization
                        have?
                      </small>
                      <span className="text-danger">
                        {this.state.error["no_employees"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="remote_work" className="text-success">
                        Remote Work
                      </label>
                      <select
                        name="remote_work"
                        className="form-control"
                        id="remote_work"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <small
                        id="remote_workhelp"
                        className="form-text text-muted"
                      >
                        Do you work remotely (outside of an office) at least 50%
                        of the time?
                      </small>
                      <span className="text-danger">
                        {this.state.error["remote_work"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tech_company" className="text-success">
                        Tech Company
                      </label>
                      <select
                        name="tech_company"
                        className="form-control"
                        id="tech_company"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <small
                        id="tech_companyhelp"
                        className="form-text text-muted"
                      >
                        Is your employer primarily a tech company/organization
                      </small>
                      <span className="text-danger">
                        {this.state.error["tech_company"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="benefits" className="text-success">
                        Benefits
                      </label>
                      <select
                        name="benefits"
                        className="form-control"
                        id="benefits"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Don't know">Don't know</option>
                      </select>
                      <small id="benefitshelp" className="form-text text-muted">
                        Does your employer provide mental health benefits?
                      </small>
                      <span className="text-danger">
                        {this.state.error["benefits"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="care_options" className="text-success">
                        Care Options
                      </label>
                      <select
                        name="care_options"
                        className="form-control"
                        id="care_options"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                      <small
                        id="care_optionshelp"
                        className="form-text text-muted"
                      >
                        Do you know the options for mental health care your
                        employer provides?
                      </small>
                      <span className="text-danger">
                        {this.state.error["care_options"]}
                      </span>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="wellness_program"
                        className="text-success"
                      >
                        Wellness Program
                      </label>
                      <select
                        name="wellness_program"
                        className="form-control"
                        id="wellness_program"
                        onChange={this.handleChange}
                      >
                        <option>SELECT</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Don't know">Don't know</option>
                      </select>
                      <small
                        id="wellness_programhelp"
                        className="form-text text-muted"
                      >
                        Has your employer ever discussed mental health as part
                        of an employee wellness program?
                      </small>
                      <span className="text-danger">
                        {this.state.error["wellness_program"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card bg-info bg-light shadow-lg p-3 mb-5 border  border-info rounded"
              style={{ marginTop: 20 }}
            >
              <div className="card-body">
                <div>
                  <div className="form-group">
                    <label htmlFor="seek_help" className="text-success">
                      Seek help
                    </label>
                    <select
                      name="seek_help"
                      className="form-control"
                      id="seek_help"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Don't know">Don't know</option>
                    </select>
                    <small id="seek_help" className="form-text text-muted">
                      Does your employer provide resources to learn more about
                      mental health issues and how to seek help?
                    </small>
                    <span className="text-danger">
                      {this.state.error["seek_help"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="anonymity" className="text-success">
                      Anonymity
                    </label>
                    <select
                      name="anonymity"
                      className="form-control"
                      id="anonymity"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Don't know">Don't know</option>
                    </select>
                    <small id="anonymityhelp" className="form-text text-muted">
                      Is your anonymity protected if you choose to take
                      advantAge of mental health or substance abuse treatment
                      resources?
                    </small>
                    <span className="text-danger">
                      {this.state.error["anonymity"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="leave" className="text-success">
                      Leave
                    </label>
                    <select
                      name="leave"
                      className="form-control"
                      id="leave"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Somewhat easy">Somewhat easy</option>
                      <option value="Very easy">Very easy</option>
                      <option value="Don't know">Don't know</option>
                      <option value="Somewhat difficult">
                        Somewhat difficult
                      </option>
                      <option value="Very difficult">Very difficult</option>
                    </select>
                    <small id="leavehelp" className="form-text text-muted">
                      How easy is it for you to take medical leave for a mental
                      health condition?
                    </small>
                    <span className="text-danger">
                      {this.state.error["leave"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="mental_health_consequence"
                      className="text-success"
                    >
                      Mental Health Consequence
                    </label>
                    <select
                      name="mental_health_consequence"
                      className="form-control"
                      id="mental_health_consequence"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                    <small
                      id="mental_health_consequencehelp"
                      className="form-text text-muted"
                    >
                      Do you think that discussing a mental health issue with
                      your employer would have negative consequences?
                    </small>
                    <span className="text-danger">
                      {this.state.error["mental_health_consequence"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="phys_health_consequence"
                      className="text-success"
                    >
                      Physical Health Consequence
                    </label>
                    <select
                      name="phys_health_consequence"
                      className="form-control"
                      id="phys_health_consequence"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                    <small
                      id="phys_health_consequencehelp"
                      className="form-text text-muted"
                    >
                      Do you think that discussing a physical health issue with
                      your employer would have negative consequences?
                    </small>
                    <span className="text-danger">
                      {this.state.error["phys_health_consequence"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="coworkers" className="text-success">
                      Coworkers
                    </label>
                    <select
                      name="coworkers"
                      className="form-control"
                      id="coworkers"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Some of them">Some of them</option>
                    </select>
                    <small id="coworkershelp" className="form-text text-muted">
                      Would you will be willing to discuss a mental health issue
                      with your coworkers?
                    </small>
                    <span className="text-danger">
                      {this.state.error["coworkers"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supervisor" className="text-success">
                      Supervisor
                    </label>
                    <select
                      name="supervisor"
                      className="form-control"
                      id="supervisor"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Some of them">Some of them</option>
                    </select>
                    <small id="supervisorhelp" className="form-text text-muted">
                      Would you be willing to discuss a mental health issue with
                      your direct supervisor(s)?
                    </small>
                    <span className="text-danger">
                      {this.state.error["supervisor"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="mental_health_interview"
                      className="text-success"
                    >
                      Mental Health Interview
                    </label>
                    <select
                      name="mental_health_interview"
                      className="form-control"
                      id="mental_health_interview"
                      placeholder=""
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                    <small
                      id="mental_health_interviewhelp"
                      className="form-text text-muted"
                    >
                      Would you bring up a mental health issue with a potential
                      employer in an interview?
                    </small>
                    <span className="text-danger">
                      {this.state.error["mental_health_interview"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="phys_health_interview"
                      className="text-success"
                    >
                      Physical Health Interview
                    </label>
                    <select
                      name="phys_health_interview"
                      className="form-control"
                      id="phys_health_interview"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                    <small
                      id="phys_health_interviewhelp"
                      className="form-text text-muted"
                    >
                      Would you bring up a physical health issue with a
                      potential employer in an interview?
                    </small>
                    <span className="text-danger">
                      {this.state.error["phys_health_interview"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="mental_vs_physical"
                      className="text-success"
                    >
                      Mental Vs Physical
                    </label>
                    <select
                      name="mental_vs_physical"
                      className="form-control"
                      id="mental_vs_physical"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Don't know">Don't know</option>
                    </select>
                    <small
                      id="mental_vs_physicalhelp"
                      className="form-text text-muted"
                    >
                      Do you feel that your employer takes mental health as
                      seriously as physical health?
                    </small>
                    <span className="text-danger">
                      {this.state.error["mental_vs_physical"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="obs_consequence" className="text-success">
                      Observed Consequences
                    </label>
                    <select
                      name="obs_consequence"
                      className="form-control"
                      id="obs_consequence"
                      onChange={this.handleChange}
                    >
                      <option>SELECT</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span className="text-danger">
                      {this.state.error["obs_consequence"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="comments" className="text-success">
                      Comments
                    </label>
                    <textarea
                      name="comments"
                      className="form-control"
                      id="comments"
                      rows="6"
                      onChange={this.handleChange}
                    ></textarea>
                    <span className="text-danger">
                      {this.state.error["comments"]}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary mb-2"
                    onClick={this.handleSave}
                    style={{ marginTop: "3px" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Need attention for your mental health: {this.res}
            </ModalHeader>
            <ModalBody style={{ textAlign: "center" }}>
              {this.res === "No" && (
                <img
                  src={resYes}
                  alt="Yes"
                  style={{ height: "150px", width: "150px" }}
                />
              )}

              {this.res === "Yes" && (
                <img
                  src={resNo}
                  alt="Yes"
                  style={{ height: "150px", width: "150px" }}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
