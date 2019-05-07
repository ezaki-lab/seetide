import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      tides: {}
    }
  }

  componentWillMount() {
    var date = new Date();
    this.setState({
      date: date
    });
    this.getTides();
  }

  getTides() {
    this.setState({
      tides: {
        calculate: [
          12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
          12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        predict: [
          15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
          15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Chart date={this.state.date} tides={this.state.tides} />
      </div>
    );
  }
}

export default App;
