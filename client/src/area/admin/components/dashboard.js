import React, { Component } from "react";
// import { Pie } from "react-chartjs-2";
// import data from "../../../json/user.json";
import Chart from "./chart";

import employeeService from "../../../Services/employeeService";

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

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
    this.state = {
      chartData: {
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Mental Status",
            data: [0, 0],
            backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"]
          }
        ]
      },
      treatment_data: {
        labels: ["Yes", "No"],
        label: "Mental Health Disorder Prediction",
        data: [],
        backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"]
      },
      work_interfere_data: {
        labels: ["Never", "Rarely", "Sometimes", "Often"],
        label: "Does mental health condition interferes with work?",
        data: [],
        backgroundColor: ["#5bcf57", "#d3e03d", "#e09a31", "#e8644d"]
      },
      care_options_data: {
        labels: ["Yes", "No", "Don't know"],
        label:
          "Do you know the options for mental health care your employer provides?",
        data: [],
        backgroundColor: ["#5bcf57", "#d3e03d", "#e09a31"]
      },
      anonymity_data: {
        labels: ["Yes", "No", "Don't know"],
        label:
          "Do you think that your anonymity will be protected if you take advantage of mental health or subtance abuse treatment resources?",
        data: [],
        backgroundColor: ["#5bcf57", "#d3e03d", "#e09a31"]
      },
      coworkers_data: {
        labels: ["Yes", "No", "Some of them"],
        label: "Willing to discuss mental health issue with coworkers?",
        data: [],
        backgroundColor: ["#5bcf57", "#d3e03d", "#e09a31"]
      },
      supervisor_data: {
        labels: ["Yes", "No", "Some of them"],
        label:
          "Willing to discuss mental health issue with direct supervisor(s)?",
        data: [],
        backgroundColor: ["#5bcf57", "#d3e03d", "#e09a31"]
      },
      emp_email: "",
      emp_message: {
        subject: "Mental treatment alert",
        message: "Please go for mental checkup",
        replyto: "yugalsaluja2@gmail.com",
        em_mail: ""
      },
      modal: "false",
      fetched_data: []
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
    alert("Session expired, plase login again!");
  }

  componentDidMount() {
    employeeService
      .getEmployees(this.access_token)
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          console.log(res.data.employees);
          let data = res.data.employees;
          let count_yes = 0;
          let count_no = 0;

          let count_never = 0;
          let count_rarely = 0;
          let count_sometimes = 0;
          let count_often = 0;

          let count_care_yes = 0;
          let count_care_no = 0;
          let count_care_dont_know = 0;

          let count_anonymity_yes = 0;
          let count_anonymity_no = 0;
          let count_anonymity_dont_know = 0;

          let count_coworkers_yes = 0;
          let count_coworkers_no = 0;
          let count_coworkers_some_of_them = 0;

          let count_supervisor_yes = 0;
          let count_supervisor_no = 0;
          let count_supervisor_some_of_them = 0;

          data.forEach(item => {
            if (item.treatment === "Yes") {
              count_yes += 1;
            } else {
              count_no += 1;
            }

            if (item.work_interfere === "Never") {
              count_never += 1;
            } else if (item.work_interfere === "Rarely") {
              count_rarely += 1;
            } else if (item.work_interfere === "Sometimes") {
              count_sometimes += 1;
            } else {
              count_often += 1;
            }

            if (item.care_options === "Yes") {
              count_care_yes += 1;
            } else if (item.care_options === "No") {
              count_care_no += 1;
            } else {
              count_care_dont_know += 1;
            }

            if (item.anonymity === "Yes") {
              count_anonymity_yes += 1;
            } else if (item.anonymity === "No") {
              count_anonymity_no += 1;
            } else {
              count_anonymity_dont_know += 1;
            }

            if (item.coworkers === "Yes") {
              count_coworkers_yes += 1;
            } else if (item.coworkers === "No") {
              count_coworkers_no += 1;
            } else {
              count_coworkers_some_of_them += 1;
            }

            if (item.supervisor === "Yes") {
              count_supervisor_yes += 1;
            } else if (item.coworkers === "No") {
              count_supervisor_no += 1;
            } else {
              count_supervisor_some_of_them += 1;
            }
          });

          console.log(count_yes, count_no);
          console.log(count_never, count_rarely, count_sometimes, count_often);
          console.log(count_care_yes, count_care_no, count_care_dont_know);
          // console.log("Counting values");

          let treatment_data = this.state.treatment_data;
          treatment_data.data.push(count_yes);
          treatment_data.data.push(count_no);

          let work_interfere_data = this.state.work_interfere_data;
          work_interfere_data.data.push(
            count_never,
            count_rarely,
            count_sometimes,
            count_often
          );

          let care_options_data = this.state.care_options_data;
          care_options_data.data.push(count_care_yes);
          care_options_data.data.push(count_care_no);
          care_options_data.data.push(count_care_dont_know);

          let anonymity_data = this.state.anonymity_data;
          anonymity_data.data.push(count_anonymity_yes);
          anonymity_data.data.push(count_anonymity_no);
          anonymity_data.data.push(count_anonymity_dont_know);

          let coworkers_data = this.state.coworkers_data;
          coworkers_data.data.push(count_coworkers_yes);
          coworkers_data.data.push(count_coworkers_no);
          coworkers_data.data.push(count_coworkers_some_of_them);

          let supervisor_data = this.state.supervisor_data;
          supervisor_data.data.push(count_supervisor_yes);
          supervisor_data.data.push(count_supervisor_no);
          supervisor_data.data.push(count_supervisor_some_of_them);

          this.setState({
            treatment_data,
            work_interfere_data,
            care_options_data,
            anonymity_data,
            coworkers_data,
            supervisor_data,
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

  toggle = (email = "") => {
    this.flag = !this.flag;
    this.setState(prevState => ({
      emp_email: email,
      emp_message: {
        ...prevState.emp_message,
        em_mail: email
      }
    }));
  };

  render() {
    return (
      <div>
        <div>
          {/* {console.log(this.state.chartData.labels)}
          {console.log(this.state.chartData.datasets[0].data)}
          {console.log(this.state.chartData.datasets[0].backgroundColor)} */}
          <Chart
            labels={this.state.treatment_data.labels}
            data={this.state.treatment_data.data}
            backgroundColor={this.state.treatment_data.backgroundColor}
            label={this.state.treatment_data.label}
          />

          <Chart
            labels={this.state.work_interfere_data.labels}
            data={this.state.work_interfere_data.data}
            backgroundColor={this.state.work_interfere_data.backgroundColor}
            label={this.state.work_interfere_data.label}
          />

          <Chart
            labels={this.state.care_options_data.labels}
            data={this.state.care_options_data.data}
            backgroundColor={this.state.care_options_data.backgroundColor}
            label={this.state.care_options_data.label}
          />
          <Chart
            labels={this.state.anonymity_data.labels}
            data={this.state.anonymity_data.data}
            backgroundColor={this.state.anonymity_data.backgroundColor}
            label={this.state.anonymity_data.label}
          />

          <Chart
            labels={this.state.coworkers_data.labels}
            data={this.state.coworkers_data.data}
            backgroundColor={this.state.coworkers_data.backgroundColor}
            label={this.state.coworkers_data.label}
          />

          <Chart
            labels={this.state.supervisor_data.labels}
            data={this.state.supervisor_data.data}
            backgroundColor={this.state.supervisor_data.backgroundColor}
            label={this.state.supervisor_data.label}
          />
          {/* <div className="chart">
            <h1 className="text-info">Current Status</h1>
            <Pie
              data={this.state.chartData}
              width={1000}
              height={250}
              options={{ maintainAspectRatio: true }}
            />
          </div> */}
        </div>

        {/* <div
          className="bg-light shadow-lg p-3 mb-5 border  border-info rounded"
          style={{ marginTop: 60 }}
        >
          <h1 className="text-info">User List</h1>
          <hr />
          <table className="table table-info shadow-sm p-3 mb-5 rounded">
            <thead>
              <tr className="text-success">
                <th>Emp Id</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Treatment Required</th>
                <th>Send Mail</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fetched_data.map((item, index) => {
                return (
                  <tr key={index} className="text-success">
                    <td>{item.id}</td>
                    <td>{item.Age}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Country}</td>
                    <td>{item.treatment}</td>
                    <td>
                      <Button
                        color="success"
                        onClick={() => this.toggle(item.email)}
                      >
                        Email
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        <div>
          <Modal isOpen={this.flag} toggle={this.toggle}>
            <ModalHeader toggle={() => this.toggle("")}>
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
                    defaultValue={this.state.emp_message["subject"]}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    defaultValue={this.state.emp_message["message"]}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="replyto">Reply to</Label>
                  <Input
                    type="text"
                    name="replyto"
                    id="replyto"
                    defaultValue={this.state.emp_message["replyto"]}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Send</Button>
              <Button color="secondary">Reset</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
