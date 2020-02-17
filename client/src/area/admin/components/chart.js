import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class chart extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      chartData: {
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.label,
            data: this.props.data,
            backgroundColor: this.props.backgroundColor
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <div className="chart">
        <h1 className="text-info">{this.props.label}</h1>
          <Pie
            data={this.state.chartData}
            width={1000}
            height={250}
            options={{ maintainAspectRatio: true }}
          />
        </div>
      </div>
    );
  }
}
