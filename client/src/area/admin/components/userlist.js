import React, { Component } from "react";

import employeeService from "../../../Services/employeeService";
import emailService from '../../../Services/emailService';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class userlist extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
    this.state = {
      emp_email: "",
      email_body: {
        subject: "FreshMinds alert - Mental health report",
        message: "Hey there! As per the freshminds report, you might need attention for your mental health. So, take care. You can reach out to me, reply back in that case.",
        tomail: ""
      },
      replyto: "yugalsaluja2@gmail.com",
      modal: "false",
      fetched_data: [],
      error: {
        subject: "",
        message: "",
        tomail: ""
      }
    };

    try {
      if (
        localStorage.getItem("access_token") &&
        localStorage.getItem("access_token")
      ) {
        this.access_token = localStorage.getItem("access_token");
        this.refresh_token = localStorage.getItem("refresh_token");
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.props.history.push("/login");
      }
    } catch (e) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.props.history.push("/login");
    }
  }

  handleAccessTokenExpire() {
    // send refresh token
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.props.history.push("/login");
    alert("Sending email failed!! Session expired, plase login again!!");
  }

  componentDidMount() {
    employeeService
      .getEmployees(this.access_token)
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          console.log(res.data.employees);

          this.setState({
            fetched_data: res.data.employees
          });
        } else if (res.status === 401) {
          // console.log(res);
          // logout
          this.handleAccessTokenExpire();
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  toggle = (email = "") => {
    this.flag = !this.flag;
    this.setState(prevState => ({
      emp_email: email,
      email_body: {
        ...prevState.email_body,
        tomail: email
      }
    }));
  };

  handleChange = event => {
    const email_body = this.state.email_body;
    email_body[event.target.name] = event.target.value;
    this.setState({
      email_body
    });
    this.validate(event.target.name);
  };

  validate(control) {
    const error = this.state.error;
    if (control === "replyto") {
      let email_regex = /.+@.+\.[A-Za-z]+$/;
      if (this.state.email_body[control].trim() === "") {
        error[control] = "Please enter Email";
      } else if (!this.state.email_body[control].match(email_regex)) {
        error[control] = `Please enter valid email id`;
      } else {
        error[control] = "";
      }
    } else if (this.state.email_body[control].trim() === "") {
      error[control] = `Please enter ${control}`;
    } else {
      error[control] = "";
    }
    this.setState({
      error
    });
  }

  toggle_close = (email = "") => {
    this.flag = !this.flag;
    this.setState({
      emp_email: email,
      email_body: {
        subject: "FreshMinds alert - Mental health report",
        message: "Hey there! As per the freshminds report, you might need attention for your mental health. So, take care. You can reach out to me, reply back in that case.",
        tomail: ""
      },
      error: {
        subject: "",
        message: "",
        tomail: ""
      }
    });
  };

  handleSend = () => {
    let flag = true;
    const email_body = this.state.email_body;

    for (const key in email_body) {
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
    //   console.log(this.state.email_body);
      let email_body = {
          subject: this.state.email_body.subject,
          tomail: this.state.email_body.tomail,
          message: this.state.email_body.message + `
          
          Reply to: ${this.state.replyto}`
      };
    //   email_body['message,'] = email_body['message'] + "       Reply to: " + this.state.replyto ;
      console.log("userlist:", email_body);
    
    //   let email_body_new
        // emailService.sendEmail

      emailService.sendEmail(email_body, this.access_token).then(res=>{
          console.log("userlist:", res.data);
          if(res.status === 200){
              alert("Email sent successfully");
              this.toggle_close();
          } else if(res.status === 401){
            this.handleAccessTokenExpire();
          }
          else{
              console.log(res);
          }
      }).catch(err=>{
        console.log(err);
      });
      

      //   employeeService
      //     .addEmployee(this.state.formField)
      //     .then(res => {
      //       console.log(res);
      //       if (res.status === 201) {
      //         alert(
      //           res.data.message +
      //             "Need attention for your mental health?" +
      //             res.data.result
      //         );
      //       } else {
      //         console.log(res);
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.fetched_data.map((item, index) => {
            return (
              <div>
                {item.treatment === "Yes" && (
                  <div
                    className="card"
                    key={index}
                    style={{
                      width: "32rem",
                      margin: "20px",
                      backgroundColor: "#a3456f",
                      color: "white"
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Employee ID: {item.id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {item.treatment === "Yes" && (
                          <span style={{color:"white", fontWeight:"bold"}}>Needs Attention</span>
                        )}
                      </h6>
                      
                      <p className="card-text">
                        <table>
                          <tr>
                            <td>
                              Age: <b>{item.Age}</b>
                            </td>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </tr>
                          <tr>
                            <td>
                              Gender: <b>{item.Gender}</b>
                            </td>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </tr>
                          <tr>
                            <td>
                              Work interference due to stress and mental helath
                              disorders: <b>{item.work_interfere}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Knows about mental health benefits provided by
                              company: <b>{item.care_options}</b>
                            </td>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </tr>
                          <tr>
                            <td>
                              Employer discussed mental health wellness program:{" "}
                              <b>{item.wellness_program}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Employer provides resources about how to seek
                              help: <b>{item.seek_help}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Protection of one's anonmity by organization:{" "}
                              <b>{item.anonymity}</b>
                            </td>
                          </tr>
                          <tr>
                            <tr>
                              Ease of availing leave: <b>{item.leave}</b>
                            </tr>
                          </tr>
                          <tr>
                            <td>
                              Discussing mental health with employer will have
                              negative consequence:{" "}
                              <b>{item.mental_health_consequence}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Discussing physical health with employer will have
                              negative consequence:{" "}
                              <b>{item.phys_health_consequence}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Willing to discuss mental health with coworkers:{" "}
                              <b>{item.coworkers}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Willing to discuss mental health with direct
                              supervisor(s): <b>{item.supervisor}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Willing to bring up mental health issues in
                              interview: <b>{item.mental_health_interview}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Willing to bring up physical health issues in
                              interview: <b>{item.phys_health_interview}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Employer takes mental health as seriously as
                              physical health: <b>{item.mental_vs_physical}</b>
                            </td>
                          </tr>
                        </table>
                      </p>
                      <td>
                        <Button
                          color="success"
                          onClick={() => this.toggle(item.email)}
                        >
                          Email
                        </Button>
                      </td>
                    </div>
                  </div>
                )}

                {item.treatment === "No" && (
                  <div
                    className="card"
                    key={index}
                    style={{
                      width: "32rem",
                      margin: "20px",
                      backgroundColor: "#3f8a59",
                      color: "white"
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Employee ID: {item.id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {item.treatment === "No" && <span style={{color:"white", fontWeight:"bold"}}>Fit and Fine</span>}
                      </h6>
                      
                      <div>
                        <p className="card-text">
                          <table>
                            <tr>
                              <td>
                                Age: <b>{item.Age}</b>
                              </td>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </tr>
                            <tr>
                              <td>
                                Gender: <b>{item.Gender}</b>
                              </td>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </tr>
                            <tr>
                              <td>
                                Work interference due to stress and mental
                                helath disorders: <b>{item.work_interfere}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Knows about mental health benefits provided by
                                company: <b>{item.care_options}</b>
                              </td>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </tr>
                            <tr>
                              <td>
                                Employer discussed mental health wellness
                                program: <b>{item.wellness_program}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Employer provides resources about how to seek
                                help: <b>{item.seek_help}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Protection of one's anonmity by organization:{" "}
                                <b>{item.anonymity}</b>
                              </td>
                            </tr>
                            <tr>
                              <tr>
                                Ease of availing leave: <b>{item.leave}</b>
                              </tr>
                            </tr>
                            <tr>
                              <td>
                                Discussing mental health with employer will have
                                negative consequence:{" "}
                                <b>{item.mental_health_consequence}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Discussing physical health with employer will
                                have negative consequence:{" "}
                                <b>{item.phys_health_consequence}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Willing to discuss mental health with coworkers:{" "}
                                <b>{item.coworkers}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Willing to discuss mental health with direct
                                supervisor(s): <b>{item.supervisor}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Willing to bring up mental health issues in
                                interview: <b>{item.mental_health_interview}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Willing to bring up physical health issues in
                                interview: <b>{item.phys_health_interview}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Employer takes mental health as seriously as
                                physical health:{" "}
                                <b>{item.mental_vs_physical}</b>
                              </td>
                            </tr>
                          </table>
                        </p>
                        <td>
                          <Button
                            color="success"
                            onClick={() => this.toggle(item.email)}
                          >
                            Email
                          </Button>
                        </td>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <Modal isOpen={this.flag} toggle={this.toggle}>
            <ModalHeader toggle={() => this.toggle_close("")}>
              Modal title
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    defaultValue={this.state.email_body["subject"]}
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">
                    {this.state.error["subject"]}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    defaultValue={this.state.email_body["message"]}
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">
                    {this.state.error["message"]}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label for="replyto">Reply to</Label>
                  <Input
                    type="text"
                    name="replyto"
                    id="replyto"
                    defaultValue={this.state.replyto}
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">
                    {this.state.error["replyto"]}
                  </span>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSend}>
                Send
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
